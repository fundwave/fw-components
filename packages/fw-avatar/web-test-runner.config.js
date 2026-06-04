import { legacyPlugin } from "@web/dev-server-legacy";
import { playwrightLauncher } from "@web/test-runner-playwright";

const browsers = {
  chromium: playwrightLauncher({ product: "chromium" }),
  firefox: playwrightLauncher({ product: "firefox" }),
  webkit: playwrightLauncher({ product: "webkit" })
};

const configObj = {
  files: ["test/**/*.test.js"],
  preserveSymlinks: true,
  nodeResolve: true,
  browsers: Object.values(browsers),
  plugins: [legacyPlugin()]
};

export default configObj;
