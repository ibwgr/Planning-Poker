import {browser, ElementFinder, ExpectedConditions} from "protractor";

const TIMEOUT = 10000;

export class BrowserUtils {

  static async scrollIntoView(elementFinder: ElementFinder, alignToTop: boolean = false) {
    return browser.executeScript('arguments[0].scrollIntoView(arguments[1])', elementFinder.getWebElement(), alignToTop);
  }

  static waitForElement = async (elementFinder: ElementFinder) =>
    await browser.wait(
      () => {
        return elementFinder.isPresent();
      },
      TIMEOUT,
      `Timeout by waiting for element with selector ${elementFinder.locator()}`
    );

  static async waitUntilClickable(el: ElementFinder): Promise<void> {
    await browser.wait(ExpectedConditions.elementToBeClickable(el), TIMEOUT);
  }


}
