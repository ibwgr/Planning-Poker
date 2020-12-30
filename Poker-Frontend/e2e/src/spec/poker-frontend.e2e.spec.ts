import {browser, by, element, ElementFinder, protractor} from "protractor";
import {AppPage} from "../app.po";
import {timeout} from "rxjs/operators";


describe("Planning-Poker Frontend tests", ()=> {

  beforeAll(async (done) => {
    page = new AppPage();
    await page.navigateTo();
    await browser.waitForAngularEnabled(true);
    done();
  });


  afterAll(async (done) => {
    await browser.waitForAngularEnabled(false);
    done();
  });

  let page: AppPage;


  it('should check pageElements',  async () => {
    expect(await page.getTitleText()).toEqual("Planning Poker");
    expect(await page.submitUserButtonLabel()).toEqual('Submit Username');
    expect(await page.usernameLabel()).toEqual('Your Name');
    expect(await page.getNumberOfCards()).toBeGreaterThan(1);
    expect(await page.getAdminlabel()).toEqual('Make me Admin')
  });

  it('should enter and display username', async () => {
    element(by.css('input#mat-input-0')).sendKeys('Roberto');
    expect(element(by.css('input#mat-input-0')).getAttribute('value')).toBe('Roberto');
  });

  it('should submit and display username in current User Section',  async () => {
    await page.clickSubmitUserButton();
    browser.waitForAngular();
    expect(await page.getSubmittedUserLabel()).toEqual('Roberto')
  });

  it('should activate admin-user', async () => {
    await page.clickAdminToggle();
    browser.waitForAngular();
    expect(await page.getNewRoundButtonLabel()).toEqual('New Round')

  });

  it('should click on 1st card and vote-button', async () => {
    await page.clickFirstCard();
    browser.waitForAngular();
    await page.clickVoteButton();
    expect(element(by.css('.mat-button-base.mat-flat-button.mat-primary.ng-star-inserted.voteButton')).getCssValue('background-color')).toBe('rgba(255, 0, 0, 1)')
  });

  it('should enter and display Acceptance-Criterias', async () => {
    element(by.css('.ng-pristine.ng-star-inserted.ng-untouched.ng-valid.text-input')).sendKeys('Test-Story');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    expect(element(by.css('.ng-star-inserted.text-area')).getAttribute('value')).toContain('Test-Story');
  });

  it('should click results and show right estimations', async () => {
    await page.clickShowResultsButton();
    browser.waitForAngular();
    expect(element(by.css('.result')).getText()).toBe('Average Estimation: 1');
    expect(element(by.css('.highest')).getText()).toBe('Highest Estimation: 1');
    expect(element(by.css('.lowest')).getText()).toBe('Lowest Estimation: 1');
    expect(element(by.css('app-estimations > div > div:nth-of-type(2) > div:nth-of-type(1)')).getText()).toBe('Roberto:');
    expect(element(by.css('app-estimations > div > div:nth-of-type(2) > div:nth-of-type(2)')).getText()).toBe('1');
  });

  it('should start new Round and clear results and text-view',  async () => {
    await page.clickNewRoundButton();
    browser.waitForAngular();
    expect(element(by.css('.result')).getText()).toBe('');
    expect(element(by.css('.highest')).getText()).toBe('');
    expect(element(by.css('.lowest')).getText()).toBe('');
    expect(element(by.css('.ng-star-inserted.text-area')).isPresent()).toBeFalsy();
    expect(element(by.css('app-estimations > div > div:nth-of-type(2) > div:nth-of-type(1)')).isPresent()).toBeFalsy();
    expect(element(by.css('app-estimations > div > div:nth-of-type(2) > div:nth-of-type(2)')).isPresent()).toBeFalsy();
    expect(element(by.css('.mat-button-base.mat-flat-button.mat-primary.ng-star-inserted.voteButton')).isPresent()).toBeFalsy()
  });

  it('should delete username', async () => {
    await page.clickDeleteUserButton();
    browser.waitForAngular();
    expect(element(by.css('.loggedInUsers.ng-star-inserted')).isPresent()).toBeFalsy();
  });
});
