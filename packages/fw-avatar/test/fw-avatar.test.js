import "../src/fw-avatar";
import { FWAvatar } from "../src/fw-avatar";
import { expect, fixture, html } from "@open-wc/testing";

describe("FWAvatar Tests", async () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<fw-avatar name="Richard Hendrickson" title="CEO" type="initials" color="blue"></fw-avatar>`);
  });

  it("FWAvatar instance check", () => {
    expect(element).to.be.instanceOf(FWAvatar);
  });

  it("checks the title property", async () => {
    expect(element.title).to.equal("CEO");
    expect(element.shadowRoot.querySelector(".avatar").getAttribute("title")).to.equal("CEO");
  });

  it("checks the type property", async () => {
    expect(element.type).to.equal("initials");
    expect(element.shadowRoot.querySelector(".avatar")).to.have.trimmed.text("RH");
    expect(element.shadowRoot.querySelector(".avatar")).not.to.have.trimmed.text("Richard Hendrickson");
  });

  it("checks the color property", async () => {
    expect(element.color).to.equal("blue");
    expect(element.shadowRoot.querySelector(".avatar").style.background).to.equal("blue");
  });

  it("checks the name property", async () => {
    element.removeAttribute("type");
    await element.elementUpdated;

    expect(element.shadowRoot.querySelector(".avatar")).to.have.trimmed.text("Richard Hendrickson");
    expect(element.shadowRoot.querySelector(".avatar")).not.to.have.trimmed.text("RH");
  });

  it("checks the Image Source property", async () => {
    const imgUrl = "https://img.favpng.com/17/0/0/thor-superhero-icon-png-favpng-LeMG9gL7C2w6Zn569zHSHzFrW.jpg";
    const imgElement = await fixture(html`<fw-avatar name="Richard Hendrickson" type="image" imgSrc=${imgUrl}></fw-avatar>`);

    expect(imgElement.shadowRoot.querySelector(".avatar").style.background).to.equal(`url("${imgUrl}")`);
  });

  it("checks the luminance property", async () => {
    const luminance = "30%";
    element.removeAttribute("color");
    element.setAttribute("luminance", `${luminance}`);
    await element.elementUpdated;

    expect(element.shadowRoot.querySelector(".avatar").style.background).to.equal(`var(--avatar-background,hsl(31, 50%, ${luminance}))`);
  });
});
