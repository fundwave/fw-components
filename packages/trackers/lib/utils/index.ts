import { MULTIPLE_TARGETS_IDENTIFIER, SHADOW_ROOT_IDENTIFIER } from "./constants.js";

/**
 * retrieves multiple elements for a provided selector
 * @param {string} selector - css-selector
 * @param {Document | ShadowRoot | null} context - context from where to start tree-traversal
 * @returns {Element[] | null}
 */
export function getElementsFromSelector(selector: string = "", context: Document | DocumentFragment | Element | null = document): Element[] | null {
  if (!context?.querySelector) {
    console.warn("Provided context doesn't provide `querySelector` handler", { context, selector });
    return null;
  }

  if (!selector.includes(SHADOW_ROOT_IDENTIFIER) && !selector.includes(MULTIPLE_TARGETS_IDENTIFIER)) return Array.from(context!.querySelectorAll(selector));

  if (selector.includes(MULTIPLE_TARGETS_IDENTIFIER)) {
    const [branchParent, ...tail] = selector.split(MULTIPLE_TARGETS_IDENTIFIER);
    const pathToChildren = tail.join(MULTIPLE_TARGETS_IDENTIFIER).replace(/^[^\w]+/, "");
    const targets = getElementsFromSelector(branchParent, context);

    if (!pathToChildren) return targets;

    const descendants =
      targets?.reduce((store, parent) => {
        const descendant = getElementsFromSelector(pathToChildren, parent?.shadowRoot || parent);
        if (descendant) store.push(...descendant);
        return store;
      }, [] as Element[]) || null;

    return descendants;
  }

  const [current, ...nested] = selector.split(SHADOW_ROOT_IDENTIFIER);
  if (!nested) return Array.from(context!.querySelectorAll(current));

  const element = context!.querySelector(current);
  return getElementsFromSelector(nested.join(SHADOW_ROOT_IDENTIFIER), element?.shadowRoot);
}

/**
 * converts provided js-path string into traversable string
 * note: helps avoid performing eval over a bare js-path
 * @param {string} jsPath - js-path to be converted
 * @returns {string}
 */
export function getSelectorForShadowRootJsPath(jsPath: string = "") {
  if (!jsPath.includes("document") || !jsPath.includes("querySelector")) return null;

  return Array.from(jsPath.matchAll(/"([^"]*)"/g))
    .map(([_, selector]) => selector)
    .join(` ${SHADOW_ROOT_IDENTIFIER} `);
}

/**
 * matches provided path with given glob-pattern
 * note: only works for basic global-patterns in urls
 * @param {string} path - path to match the pattern with
 * @param {string} pattern - glob-pattern for urls
 * @returns {boolean}
 **/
export function matchPathPattern(path: string | string[], pattern: string | string[]): boolean {
  if (path.toString() === "/" && pattern.toString() === "/") return true;
  if (!Array.isArray(path)) path = path.split("/").filter(Boolean);
  if (!Array.isArray(pattern)) pattern = pattern.split("/").filter(Boolean);

  for (const [index, patternDir] of pattern.entries()) {
    if (patternDir === "**") return true;
    else if (patternDir === "*") {
      if (Boolean(pattern[index + 1])) continue;
      return !Boolean(path[index + 1]);
    } else if (patternDir === path[index]) {
      if (!pattern[index + 1] && !path[index + 1]) return true;
    } else return false;
  }

  return false;
}

/**
 * retrieves the DOM-element for the provided selector, along with all of it's parent shadowRoots
 * @param {string} selector - css-selector
 * @param {Document | ShadowRoot | null} context - context from where to start tree-traversal
 * @returns {{ destinations: Element[] | null, context: Document | ShadowRoot, shadowRoots: ShadowRoot[] }}
 */
export function getNodeTree(selector: string, context: Document | ShadowRoot | Element) {
  const result = [] as Array<{ path: string; needsMultiple: boolean }>;
  const selectorsWithinShadowRoots = selector.split(SHADOW_ROOT_IDENTIFIER);

  selectorsWithinShadowRoots.forEach((path) => {
    if (!path.includes(MULTIPLE_TARGETS_IDENTIFIER)) {
      result.push({ path, needsMultiple: false });
      return;
    }

    const selectorsWithinMultipleParents = path.split(MULTIPLE_TARGETS_IDENTIFIER);
    result.push(...selectorsWithinMultipleParents.map((path) => ({ path: path.replace(/^\s*/, "").replace(/^\s*>*\s*/, ""), needsMultiple: true })).filter((path) => path.path));
  });

  const nodeTreeContext = { destinations: null as Array<Element> | null, context: [context], parents: [] as Array<ShadowRoot | Element> };

  for (const [index, selector] of result.entries()) {
    const newContext = [] as Element[];

    nodeTreeContext.context.forEach((cxt) => {
      const contextNode = (cxt as Element).shadowRoot || cxt;
      const targets = selector.needsMultiple ? Array.from(contextNode.querySelectorAll(selector.path)) : contextNode.querySelector(selector.path);

      if (!targets && !(targets! as Element[])?.length) return;

      newContext.push(...[targets!].flat(1));
    });

    if (!newContext?.length) return nodeTreeContext;

    nodeTreeContext.context = newContext;
    nodeTreeContext.parents.push(...newContext);

    if (index === result.length - 1) nodeTreeContext.destinations = newContext;
  }

  return nodeTreeContext;
}
