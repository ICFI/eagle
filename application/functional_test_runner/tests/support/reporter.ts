import * as reporter from "cucumber-html-reporter";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
const functionalTestReports = path.join(process.cwd(), "../../../","testing_reports/functional");
const targetJson = functionalTestReports + "/cucumber_report.json";

const cucumberReporterOptions = {
    jsonFile: targetJson,
    theme: "hierarchy",
    output: functionalTestReports + "/index.html",
    reportSuiteAsScenarios: true,
    screenshotsDirectory: 'screenshots',
    storeScreenshots: true,
    brandTitle: "ICF Proposal E2E Tests",
    metadata: {
        "Project":  "USCIS - xxxxxxxxxxx"
    }
};

export class Reporter {

    public static createDirectory(dir: string) {
        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
    }

    public static createHTMLReport() {
        try {
            reporter.generate(cucumberReporterOptions); // invoke cucumber-html-reporter
        } catch (err) {
            if (err) {
                throw new Error("Failed to save cucumber test results to json file.");
            }
        }
    }
}
