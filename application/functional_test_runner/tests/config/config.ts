import * as path from "path";
import { browser, Config } from "protractor";
import { Reporter } from "../support/reporter";
const functionalTestReports = path.join(process.cwd(), "../../../","testing_reports/functional");

export const config: Config = {

    seleniumAddress: "http://127.0.0.1:4444/wd/hub",

    SELENIUM_PROMISE_MANAGER: false,

    baseUrl: "https://stage.eagle.e3si.icfcloud.com/",

    capabilities: {
        browserName: "chrome",
    },

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "../../features/**/*.feature",
    ],

    onPrepare: () => {
        // browser.ignoreSynchronization = true;
        // browser.manage().window().maximize();
        console.log("[CEP] - Running tests from " + process.cwd());
        console.log("      - Attempting to create test results folder in " + functionalTestReports);

        Reporter.createDirectory(functionalTestReports);
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: "json:"+ functionalTestReports + "/cucumber_report.json",
        require: ["../../typeScript/step_definitions/*.js", "../../typeScript/support/*.js"],
        strict: true,
        //tags: "@validation",
    },

    onComplete: () => {
        Reporter.createHTMLReport();
    },
};
