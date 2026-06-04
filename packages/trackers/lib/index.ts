import { IEvent, TrackerContext } from "./interfaces/index.js";
import { fetchEvents } from "./stores/index.js";

import { getNodeTree, matchPathPattern } from "./utils/index.js";

declare global {
  interface Window {
    fwTrackersRegistered?: boolean;
  }
}

export class Trackers {
  observer: MutationObserver;
  track: TrackerContext["track"];
  events: IEvent[];
  store: TrackerContext["store"];
  debug: boolean;
  onEventsFetched: TrackerContext["onEventsFetched"];

  constructor(context: TrackerContext) {
    if (!Boolean(context.track)) throw new Error("Missing required `track` method!");

    this.store = context.store;
    this.observer = new MutationObserver(() => this.registerTrackers());
    this.track = context.track;
    this.events = [];
    this.debug = Boolean(context.debug);
    if (context.onEventsFetched) this.onEventsFetched = context.onEventsFetched;
  }

  /**
   * Fetches events and starts registering observers to begin tracking
   * note: optionally can pass events, if not they'll be fetched from the store config
   * @param {IEvent[]} events (optional) - array of events to perform the tracking for
   **/
  async initialize(events?: IEvent[]) {
    if (window.fwTrackersRegistered) return;

    if (!events?.length && !this.store) {
      console.error("Malformed configuration. Please provide store config or list of events");
      throw new Error("Malformed configuration. Please provide store config or list of events");
    }

    try {
      if (events?.length) this.events = events;
      else this.events = (await fetchEvents(this.store)) || [];

      if (!this.events) return this.#debug("No events fetched from store: ", this.store);

      if (this.onEventsFetched) this.events = await this.onEventsFetched(this.events);
      this.#debug("Events fetch from store", { events: this.events, store: this.store });

      this.registerTrackers();
      this.observer.observe(document, { subtree: true, attributes: true, childList: true });

      window.fwTrackersRegistered = true;
    } catch (error) {
      console.warn("Error while registering event-trackers", error);
      throw error;
    }
  }

  getUntrackedTargets(elements: Element[]) {
    return elements.filter((element) => !Boolean(element.getAttribute("fw-events-registered")));
  }

  /**
   * identifies targets and attaches required listeners for tracking
   **/
  registerTrackers() {
    (this.events || []).forEach((eventConfig) => {
      if (!eventConfig.location) return;
      if (!matchPathPattern(location.pathname, eventConfig.location)) return;

      const tree = getNodeTree(eventConfig.jsPath, document);
      const elements = tree.destinations;
      this.#debug("Attempting registration of trackers @ ", { tree, config: eventConfig });

      if (!elements?.length)
        tree.parents.reverse().forEach((root) => {
          this.observeNode(root);
        });
      if (!tree.parents.length) this.#debug("No shadow-roots retrieved for observation", { eventConfig });

      if (!elements?.length || !eventConfig.title) return;

      const unTrackedElements = this.getUntrackedTargets(elements);
      this.#debug("Tracking status", { element: elements, trackerRegistered: unTrackedElements.length });

      if (!unTrackedElements.length) return;

      const eventsToTrack = (eventConfig.type || "").split(",").filter(Boolean) || [];
      if (!Boolean(eventsToTrack.length)) eventsToTrack.push("click");

      eventsToTrack.forEach((eventType: string) => {
        elements.forEach((element) => {
          element.addEventListener(eventType, (event) => {
            try {
              if (!Boolean(this.track)) return this.#debug("Missing `track` method!");

              this.#debug("Event triggered: ", eventConfig, event);
              this.track(eventConfig.title!, element, event, eventConfig);
            } catch (error) {
              this.#debug("Failed to register events.", error);
            }
          });

          element.setAttribute("fw-events-registered", "true");
          this.#debug("Tracker registered @ ", { element, eventConfig });
        });
      });
    });
  }

  /**
   * attaches mutation-observer to provided node
   * @param {ShadowRoot | null} node - ShadowRoot to attach the observer to
   */
  observeNode(node: Element | ShadowRoot | null) {
    if (!Boolean(node)) return;

    try {
      this.observer?.observe((node! as Element).shadowRoot || node!, { subtree: true, attributes: true, childList: true });
      this.#debug("Registering observer on target: ", (node as ShadowRoot)?.host || node);
    } catch (error) {
      this.#debug("Failed to register observer on target: ", { error, node: (node as ShadowRoot)!.host || node });
    }
  }

  /*
   * dumps logs to console when in debug mode
   */
  #debug(...params: unknown[]) {
    if (this.debug) console.log(...params);
  }
}
