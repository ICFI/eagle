import * as reporter from "cucumber-html-reporter";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
const jsonReports = path.join(process.cwd(), "/reports/json");
const htmlReports = path.join(process.cwd(), "/reports/html");
const targetJson = jsonReports + "/cucumber_report.json";

const cucumberReporterOptions = {
    jsonFile: targetJson,
    theme: "hierarchy",
    jsonFile: targetJson,
    output: htmlReports + "/index.html",
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
