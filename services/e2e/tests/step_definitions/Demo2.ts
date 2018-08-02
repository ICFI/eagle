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


    Given(/^I am on the Search Page$/, async () => {
        await browser.driver.get(BASEURL);
    });


    // When(/^I perform a search$/, async () => {
    //     page.searchTextBox.sendKeys('HUD');
    //     await page.searchButton.click();
    // });


    When(/^I have entered a Start Date$/, async () => {
        await demo.startDate.sendKeys('01/01/2018');
    });

    When(/^I have entered an End Date$/, async () => {
        await demo.startDate.sendKeys('01/02/2018');
    });

    When(/^I have clicked submit$/, async () => {
        await demo.button.click();
    });


    // Given(/^(?:I am on the login page|An user accessed HudExchange Login page)$/, async () => {
    //     await browser.get(BASEURL+"/hudexchange-portal/?doaction=logout");
    // });
    // Given(/^I am on the Landing page of Hud exchange$/, async () => {
    //     await browser.get(BASEURL);
    //
    // });
    // When(/^I provide user "(.*?)" "(.*?)"$/, async(user, pass)=> {
    //     await loginPage.InputUsername(user);
    //     await loginPage.InputPassword(pass);
    //     await browser.sleep(2000)
    // });
    //
    // When(/^I login$/, async() => {
    //     await loginPage.ClickLogin();
    // });
    //
    // When(/^I login as "(.*?)" "(.*?)"$/, async function (user, pass) {
    //     await loginPage.InputUsername(user);
    //     await loginPage.InputPassword(pass);
    //     await loginPage.ClickLogin();
    // });
    //
    // When(/^I login as "(.*?)"$/, async function (user) {
    //     await loginPage.LoginAs(user);
    // });
    //
    //
    // When(/^I enter "(.*?)" in the username field$/, async (text) => {
    //
    //     await loginPage.InputUsername(text);
    // });
    //
    // When(/^I enter "(.*?)" in the password field$/, async (text) => {
    //     await loginPage.InputPassword(text);
    // });
    //
    // When(/^I click on the login button$/, async () => {
    //     await loginPage.ClickLogin();
    // });
    //
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
    //
    // When(/^The user clicks Create an account link$/, async () => {
    //     await loginPage.ClickCreateAnAccount();
    // });
    //
    //
    // When(/^(?:The user |)fills out the following user data$/,async(table)=>{
    //     let data : any = table;
    //     let udata = data.hashes();
    //     udata = udata[0];
    //     await loginPage.InputUserFirstName(udata['FirstName']);//|City           |State  |Zip      |Phone                    |Email                    |Username     |Password         |Organization   |
    //     await loginPage.InputUserLastName(udata['LastName']);
    //     await loginPage.InputUserCity(udata['City']);
    //     await loginPage.SelectUserState(udata['State']);
    //     await loginPage.InputUserZipcode(udata['Zip']);
    //     await loginPage.InputUserPhone(udata['Phone']);
    //     await loginPage.InputUserEmail(udata['Email']);
    //     await loginPage.InputUserConfirmEmail(udata['Email']);
    //     let alertPresent = await actions.isPresentAndDisplayed(loginPage.sameEmailAlert);
    //     if(alertPresent){
    //         await loginPage.AcceptSameEmailAlert();
    //     }
    //     await loginPage.InputCreateUsername(udata['Username']);
    //     await loginPage.InputCreatePassword(udata['Password']);
    //     await loginPage.InputConfirmPassword(udata['Password']);
    // });
    //
    // When(/^(?:The user |)creates the account$/,async()=>{
    //     await loginPage.ClickCreateAccount();
    // });
    //
    // When(/^(?:The user |)checks for any validations$/,async()=>{
    //     let  validations = await loginPage.GetAllValidations();
    //     await console.log(validations);
    //     if(validations.length != 0){
    //         await assert.equal(true,false,'There are validations while creating an account. Please correct the following validations:'+validations)
    //     }
    // });
    // When(/^(?:The user |)selects the TA Provider Organization Type with the following subdata$/,async(table)=>{
    //     let data : any = table;
    //     let udata = data.hashes();
    //     udata = udata[0];
    //     await loginPage.SelectOrgType('TA Provider');
    //     await loginPage.SelectTAProviderOrganization(udata['TA Provider Organization']);
    // });
    // Then(/^(?:The user |)sees "(.*?)" stating the user is logged in$/,async(text)=>{
    //     await assert.equal(loginPage.popoverLoginName.getText(),'Hi '+text+'! ','The user is not looged in');
    // });
    // Then(/^(?:The user |)is taken to successful Registration complete page$/,async()=>{
    //     let headerPresent = await actions.isPresentAndDisplayed(loginPage.registrationCompletedHeader);
    //     await assert.equal(headerPresent,true,'The user is not registered');
    // });
});
