import { $, ElementFinder } from "protractor";

export class Demo2Object {
    public startDate: any;
    public endDate: any;
    public result: any;
    public button: any;
    public error: any;

    constructor() {
        this.startDate = ".//input[@id='startDate']";
        this.endDate = ".//input[@id='endDate']"
        this.result = ".//input[@id='result']"
        this.button = ".//input[@id='submit']"
        this.error = ".//input[@id='error']"

    }
}
