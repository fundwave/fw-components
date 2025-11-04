import { ExtendedRecordMap } from "notion-types";
import { getSelectorForShadowRootJsPath } from "../utils";
import { IEvent } from "../interfaces/index.js";
import { parsePageId } from "notion-utils";
import { TStoreContext } from "./index.js";

export async function fetchEventsFromNotion(context: TStoreContext["notion"]) {
  if (!context.pageId) {
    console.warn("Notion-Store | Missing page-id parameter");
    return;
  }

  const notionPage: ExtendedRecordMap = await fetch(context.url)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  if (!notionPage) return;
  const pageId = parsePageId(context.pageId);

  const core = notionPage.block[pageId];

  const collectionId = core?.value?.type === "collection_view_page" ? core.value?.collection_id : null;

  if (!collectionId) return;

  const databaseProperties = notionPage.collection?.[collectionId]?.value?.schema;
  if (!databaseProperties) return;

  const parsedEvents: IEvent[] = [];

  Object.values(notionPage.block).forEach(block => {
    if (block.role === "none") return;

    const pageProperties = block.value?.properties;

    if (block.value?.type !== "page" || !pageProperties) return;

    const result: IEvent = { jsPath: "" };

    Object.entries(pageProperties).forEach(([property, value]) => {
      if (!databaseProperties[property]) return;

      const key = databaseProperties[property].name as keyof IEvent;

      if (Array.isArray(value)) value = value.toString();
      if (key === "jsPath") value = getSelectorForShadowRootJsPath(value as string);

      result[key] = value as string;
    });

    if (!Boolean(result.location)) result.location = "/";

    parsedEvents.push(result);
  });

  return parsedEvents;
}
