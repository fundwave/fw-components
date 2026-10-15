import { fetchEventsFromNotion } from "./notion.js";

import { TrackerContext } from "../interfaces/index.js";

export type TStoreContext = {
  notion: {
    url: string;
    pageId: string;
    authToken?: string;
  };
};

export const supportedStores = ["notion"] as const;

export function fetchEvents(store: TrackerContext["store"]) {
  if (!store) return console.warn("Store configuration missing");

  switch (store.type) {
    case "notion":
      if (!Boolean(store.context.url)) throw new Error("Missing url to retrieve events from!");
      return fetchEventsFromNotion(store.context);
  }
}
