import { fetchEventsFromNotion } from "../stores/notion.js";
import assert from "node:assert";
import { describe, it } from "node:test";

const FUNDWAVE_TRACKERS_URL = "https://content.fundwave.cloud/trackers/page/8535d3f62f0c441dac84cc1c56605f94";
const FUNDWAVE_TRACKERS_PAGE_ID = "8535d3f62f0c441dac84cc1c56605f94";

describe("Notion Store - Parse Events", () => {
  it("should fetch and parse events without error", async () => {
    const notionContext = {
      url: FUNDWAVE_TRACKERS_URL,
      pageId: FUNDWAVE_TRACKERS_PAGE_ID
    };

    const events = await fetchEventsFromNotion(notionContext);

    const eventsIsArrayOrUndefined = Array.isArray(events) || events === undefined;

    // print sample event for debugging
    console.log("Sample event:", events?.[0]);

    assert.ok(eventsIsArrayOrUndefined, "events should be an array or undefined");
  });

  it("should return events with jsPath property when events exist", async () => {
    const notionContext = {
      url: FUNDWAVE_TRACKERS_URL,
      pageId: FUNDWAVE_TRACKERS_PAGE_ID
    };

    const events = await fetchEventsFromNotion(notionContext);

    if (events && events.length > 0) {
      for (const event of events) {
        assert.ok("jsPath" in event, "event should have jsPath property");
      }
    }
  });

  it("should set location property on all events", async () => {
    const notionContext = {
      url: FUNDWAVE_TRACKERS_URL,
      pageId: FUNDWAVE_TRACKERS_PAGE_ID
    };

    const events = await fetchEventsFromNotion(notionContext);

    if (events && events.length > 0) {
      for (const event of events) {
        assert.ok("location" in event, "event should have location property");
        assert.ok(event.location, "location should not be empty");
      }
    }
  });

  it("should parse event properties as strings", async () => {
    const notionContext = {
      url: FUNDWAVE_TRACKERS_URL,
      pageId: FUNDWAVE_TRACKERS_PAGE_ID
    };

    const events = await fetchEventsFromNotion(notionContext);

    if (events && events.length > 0) {
      for (const event of events) {
        assert.strictEqual(typeof event.jsPath, "string", "jsPath should be a string");
        if (event.title) assert.strictEqual(typeof event.title, "string", "title should be a string");
        if (event.type) assert.strictEqual(typeof event.type, "string", "type should be a string");
        if (event.location) assert.strictEqual(typeof event.location, "string", "location should be a string");
      }
    }
  });
});
