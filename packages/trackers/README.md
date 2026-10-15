## @fundwave/trackers

A utility that traverses the DOM and registers listeners to elements (even those present within shadowDOMs) from a provided list of events that are to be tracked.

### 1. How it works

The consumer can either provide a store configuration and the events will be fetched and parsed from the store or an array of events to be tracked.

Schema of an event-config:

```json
{
  "jsPath": "document.querySelector...",
  "location": "/dashboard", // glob pattern of the url where the target-element is to be tracked
  "title": "Clicked at dashboard edit-button",
  "event": "click" // type of event | All js events are supported
}
```

### 2. Usage

```js
const tracker = new Trackers({
  store: {
    type: "notion",
    context: {
      url: "URL_TO_RETRIEVE_NOTION_DB",
      pageId: "<<PAGE_ID>>"
    }
  },
  track: yourTrackingMethod,
  debug: true
});

tracker.initialize();
```

### Note:

tracking multiple targets is also supported. Use `:nth-child(+)` identifier to highlight elements whose multiple instances are to be tracked

> Supported selector
>
> ```js
> document.querySelector("div > div.main-content > div.page > route-page > request-grid:nth-child(+)");
> ```
