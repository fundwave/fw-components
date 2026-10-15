import { supportedStores, TStoreContext } from "../stores";

export interface IEvent {
  jsPath: string;
  location?: string;
  title?: string;
  type?: string;
}

export type TrackerContext = {
  store?: {
    type: (typeof supportedStores)[number];
    context: TStoreContext[(typeof supportedStores)[number]];
  };
  track: (title: string, target: Element, event: Event, config: IEvent) => void;
  onEventsFetched?: (events: IEvent[]) => Promise<IEvent[]>;
  debug?: boolean;
};
