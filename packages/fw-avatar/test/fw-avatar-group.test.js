import "../src/fw-avatar-group.js";
import { FWAvatarGroup } from "../src/fw-avatar-group.js";
import { expect, fixture, html, oneEvent } from "@open-wc/testing";

//constants
const users = [
  { name: "Richard", company: "PiedPiper" },
  { name: "Dinesh", company: "PiedPiper" },
  { name: "Jared", company: "PiedPiper" },
  { name: "Gavin Belson", company: "Hooli" },
  { name: "Monica Hall", company: "Bream Hall" }
];
const usersWithOutSecondaryAttribute = [{ name: "Richard" }, { name: "Dinesh" }, { name: "Jared" }, { name: "Gavin Belson" }, { name: "Monica Hall" }];
const primaryAction = {
  title: "Primary action Button",
  icon: "add"
};
const secondaryAction = {
  title: "Secondary action button",
  closeDialog: true
};
const emptyStateAction = {
  title: "Empty State action button",
  closeDialog: true
};
const maxCount = 3;
const emptyStateMessage = "No Match Found";
const header = "Sillicon Valley";
const nameAttribute = "name";
const secondaryAttribute = "company";
const showSearchBar = true;

describe("Fw-Avatar-Group Tests", async () => {
  let element;
  beforeEach(async () => {
    element = await fixture(
      html` <fw-avatar-group
        .items=${users}
        nameAttribute=${nameAttribute}
        secondaryAttribute=${secondaryAttribute}
        .maxCount=${maxCount}
        header=${header}
        .showSearchBar=${showSearchBar}
        .primaryAction=${primaryAction}
        .secondaryAction=${secondaryAction}
        emptyStateMessage=${emptyStateMessage}
        .emptyStateAction=${emptyStateAction}
        .absolute=${true}
      ></fw-avatar-group>`
    );
  });

  it("FwAvatarGroup instance check", () => {
    expect(element).to.be.instanceOf(FWAvatarGroup, " The Element created from tag fw-avatar-group is not an instance of FWAvatarGroup class");
  });

  it("checks for items(with secondary attr) content", async () => {
    const itemsListHtml = element.shadowRoot.querySelectorAll("mwc-list-item.items-list-item > span");

    const tempArray = [];
    for (let i = 0; i < itemsListHtml.length; i = i + 2) {
      tempArray.push({
        name: String(itemsListHtml[i].textContent.trim()),
        company: String(itemsListHtml[i + 1].textContent.trim())
      });
    }
    expect(element.items).to.equal(users);
    expect(tempArray).to.be.eql(users);
  });

  it("checks for items(without secondary attr) content", async () => {
    element.items = usersWithOutSecondaryAttribute;
    element.removeAttribute("secondaryAttribute");
    await element.elementUpdated;

    const itemsListHtml = element.shadowRoot.querySelectorAll("mwc-list-item.items-list-item > span");

    const tempArray = [];
    for (let i = 0; i < itemsListHtml.length; i = i + 1) {
      tempArray.push({
        name: String(itemsListHtml[i].textContent.trim())
      });
    }
    expect(element.items).to.equal(usersWithOutSecondaryAttribute);
    expect(tempArray).to.be.eql(usersWithOutSecondaryAttribute);
  });

  it("checks Max Count property", async () => {
    const visibleAvatars = element.shadowRoot.querySelector("#group").querySelectorAll("fw-avatar[type='initials']");
    expect(element.maxCount).to.equal(maxCount);
    expect(visibleAvatars.length).to.equal(Math.min(users.length, maxCount), "The number of avatars rendered in the group do not match with MaxCount");
  });

  it("checks menu visiblility on tap/Click event", async () => {
    expect(element.shadowRoot.querySelector("#menu").getAttributeNames()).not.to.include("open", "Menu in open mode without Click event ");

    const avatarGroupButton = element.shadowRoot.querySelector(".group");

    setTimeout(() => {
      avatarGroupButton.click();
    });
    await oneEvent(avatarGroupButton, "click");

    expect(element.shadowRoot.querySelector("#menu").getAttributeNames()).to.include("open", "Click event didn't triggered the menu to  open ");
  });

  it("checks Header property", async () => {
    let headertext = element.shadowRoot.querySelector(".dialog-header-span").textContent.trim();

    expect(element.header).to.equal(header);
    expect(headertext).to.be.equal(header, "Header do not match with given prop");
    element.removeAttribute("header");
    await element.elementUpdated;
    headertext = element.shadowRoot.querySelector(".dialog-header-span").textContent.trim();

    expect(headertext).to.equal("Members", "Default Header Value do not match");
  });

  it("checks for searchBar visibility", async () => {
    const searchBarElement = element.shadowRoot.querySelector("#searchBar");

    if (!showSearchBar) expect(searchBarElement, "Search Bar visible , even when false passed to showSearchBar").to.be.null;
    else expect(searchBarElement, "Search Bar not visible when true passed to showSearchBar").not.to.be.null;
  });

  it("checks for primary action property", async () => {
    const primaryActionItem = element.shadowRoot.querySelector("#primary-action-item");

    expect(primaryActionItem.querySelector("span").textContent).to.equal(primaryAction["title"]);
    expect(primaryActionItem.querySelector("mwc-icon")).dom.to.equal(`<mwc-icon>${primaryAction["icon"]}</mwc-icon>`, { ignoreAttributes: ["slot"] });

    setTimeout(() => {
      primaryActionItem.click();
    });
    const event = await oneEvent(element, "primary-action-clicked");
    expect(event.type).to.equal("primary-action-clicked");
  });

  it("checks for secondary action property", async () => {
    const avatarGroupButton = element.shadowRoot.querySelector(".group");
    const menuElement = element.shadowRoot.querySelector("#menu");

    setTimeout(() => {
      avatarGroupButton.click();
    });
    await oneEvent(avatarGroupButton, "click");

    expect(menuElement.getAttributeNames()).to.include("open");

    const secondaryActionItem = element.shadowRoot.querySelector(".secondary-text-underlined");

    expect(secondaryActionItem.textContent).to.equal(secondaryAction.title);

    setTimeout(() => {
      secondaryActionItem.click();
    });
    const event = await oneEvent(element, "secondary-action-clicked");

    expect(event.type).to.equal("secondary-action-clicked");

    if (secondaryAction.closeDialog) {
      expect(menuElement.getAttributeNames()).not.to.include("open");
    } else {
      expect(menuElement.getAttributeNames()).to.include("open");
    }
  });

  it("checks the empty state msg and action properties", async () => {
    const avatarGroupButton = element.shadowRoot.querySelector(".group");
    const menuElement = element.shadowRoot.querySelector("#menu");

    setTimeout(() => {
      avatarGroupButton.click();
    });
    await oneEvent(avatarGroupButton, "click");
    expect(menuElement.getAttributeNames()).to.include("open");

    const searchBarElement = element.shadowRoot.querySelector("#searchBar");
    searchBarElement.value = "hashText";
    element.searchInputValueChanged(searchBarElement.value);
    await element.elementUpdated;

    const emptyActionDiv = element.shadowRoot.querySelector("div.list-item");
    expect(emptyActionDiv.querySelector("span").textContent).to.equal(emptyStateMessage);

    const emptyActionButton = emptyActionDiv.querySelector("paper-button");
    expect(emptyActionButton.textContent).to.equal(emptyStateAction.title);

    setTimeout(() => {
      emptyActionButton.click();
    });
    const event = await oneEvent(element, "empty-state-action-clicked");
    expect(event.type).to.equal("empty-state-action-clicked");

    if (emptyStateAction.closeDialog) {
      expect(menuElement.getAttributeNames()).not.to.include("open");
    } else {
      expect(menuElement.getAttributeNames()).to.include("open");
    }
  });
});
