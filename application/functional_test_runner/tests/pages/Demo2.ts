import { $, ElementFinder } from "protractor";

export class Demo2Object {
    public startDate: ElementFinder;
    public endDate: ElementFinder;
    public result: ElementFinder;
    public button: ElementFinder;
    public error: ElementFinder;

    constructor() {
        this.startDate = $("input[id='startDate']");
        this.endDate = $("input[id='endDate']");
        this.result = $("input[id='result']");
        this.button = $("input[id='submit']");
        this.error = $("input[id='error']");
    }
}
