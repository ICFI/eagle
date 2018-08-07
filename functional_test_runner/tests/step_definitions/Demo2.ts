import { Demo2Object } from '../pages/Demo2';
import { browser, element, by } from 'protractor';
import { defineSupportCode } from 'cucumber';
import {async} from "q";
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let assert = chai.assert;
let BASEURL = browser.baseUrl;
defineSupportCode(function ({Given, When, Then }) {
    let demo = new Demo2Object();
    Given(/^I am on the application page.$/, async () => {
        await browser.driver.get(BASEURL);
    });
    When(/^I have entered a Start Date$/, async () => {
        await demo.startDate.sendKeys('01/01/2018');
    });
    When(/^I have entered an End Date$/, async () => {
        await demo.startDate.sendKeys('01/02/2018');
    });
    When(/^I have clicked submit$/, async () => {
        await demo.button.click();
    });
    // Then(/^I expect to see a link to "(.*?)"$/, async (text) => {
    //     //await expect(element(by.getText(text))).eventually.be.true;
    //     browser.waitForAngular();
    //     let lookupText = 'Update My Account';
    //     /*
    //             console.log('~~~~ checking ~~~~~');
    //             console.log(element(by.linkText(lookupText)).getTagName());
    //             console.log('~~~~ checking ~~~~~');
    //     */
    //     await expect(element(by.linkText("'" + text + "'")).getTagName()).eventually.equal('a');
    // });
    // // Then(/^I expect to see a link to a Update my account$/, async () => {
    // //     await expect(MyHudX.waitForTheElementToBeVisible(MyHudX.updateMyAccountLink)).eventually.equal(true);
    // //
    // // });
    //
});