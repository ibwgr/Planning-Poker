import {browser, by, element} from 'protractor';
import {BrowserUtils} from "./spec/BrowserUtils";


const submittUserButtonLabel = by.css('.buttons [color=\'base\']:nth-of-type(1) .mat-button-wrapper');
const usernameLabel = by.xpath('//label[@id=\'mat-form-field-label-1\']/mat-label[.=\'Your Name\']');
const adminlabel = by.css('.mat-slide-toggle-content');
const userButton = by.css('.enterUsername.mat-base.mat-button-base.mat-raised-button');
const submittedUserLabel = by.css('.loggedInUsers.ng-star-inserted > .singleUser');
const adminToggle = by.css('.mat-slide-toggle-bar');
const newRoundButtonLabel = by.css('.mat-base.mat-button-base.mat-raised-button.newRound.ng-star-inserted > .mat-button-wrapper');
const newRoundButton = by.css('.mat-base.mat-button-base.mat-raised-button.newRound.ng-star-inserted');
const thirdCard = by.css('div:nth-of-type(3) > .card.mat-card.ng-star-inserted');
const submitVoteButton = by.css('.mat-button-base.mat-flat-button.mat-primary.ng-star-inserted.voteButton');
const showResultsButton = by.css('.averageButton.mat-base.mat-button-base.mat-raised-button.ng-star-inserted');
const deleteUserButton = by.css('.buttons [color=\'base\']:nth-of-type(2)');

export class AppPage {


  async navigateTo(): Promise<unknown> {
    return browser.get('https://planning-poker-frontend.herokuapp.com/') as Promise<unknown>;
  }

  async getTitleText(): Promise<string> {
    return element(by.css('.title')).getText() as Promise<string>;
  }

  async submitUserButtonLabel(): Promise<string> {
    const label = element(submittUserButtonLabel);
    await BrowserUtils.waitForElement(label);
    return label.getText()
  }

  async usernameLabel(): Promise<string> {
    const label = element(usernameLabel);
    await BrowserUtils.waitForElement(label);
    return label.getText()
  }

  async getNumberOfCards(): Promise<number> {
    return element.all(by.css('.cardsContainer .cards.ng-star-inserted')).count();
  }

  async getAdminlabel(): Promise<string> {
    const label = element(adminlabel);
    await BrowserUtils.waitForElement(label);
    return label.getText()
  }

  async clickSubmitUserButton(){
    const button = await element(userButton);
    return button.click()
  }

  async getSubmittedUserLabel(){
    const label = element(submittedUserLabel);
    await BrowserUtils.waitForElement(label);
    return label.getText()
  }

  async clickAdminToggle(){
    const toggle = element(adminToggle);
    await BrowserUtils.waitForElement(toggle);
    return toggle.click()
  }

  async getNewRoundButtonLabel(){
    const label = element(newRoundButtonLabel);
    await BrowserUtils.waitForElement(label);
    return label.getText()
  }

  async clickThirdCard(){
    const card = element(thirdCard);
    await BrowserUtils.waitForElement(card);
    return card.click()
  }

  async clickVoteButton(){
    const button = element(submitVoteButton);
    await BrowserUtils.waitForElement(button);
    return button.click()
  }

  async clickShowResultsButton(){
    const button = element(showResultsButton);
    await BrowserUtils.waitForElement(button);
    return button.click()
  }

  async clickNewRoundButton(){
    const button = element(newRoundButton);
    await BrowserUtils.waitForElement(button);
    return button.click()
  }

  async clickDeleteUserButton() {
    const button = element(deleteUserButton);
    await BrowserUtils.waitForElement(button);
    return button.click()
  }
}
