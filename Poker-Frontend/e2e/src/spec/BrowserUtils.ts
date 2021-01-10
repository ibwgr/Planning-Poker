import {browser, ElementFinder} from "protractor";

const TIMEOUT = 10000;

export class BrowserUtils {

  static waitForElement = async (elementFinder: ElementFinder) =>
    await browser.wait(
      () => {
        return elementFinder.isPresent();
      },
      TIMEOUT,
      `Timeout by waiting for element with selector ${elementFinder.locator()}`
    );
}
