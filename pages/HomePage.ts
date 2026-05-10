import { Page, Locator } from '@playwright/test'
import { bookingTestData } from '../utils/testData';


export class HomePage {
    private readonly searchBtnLocator: Locator;
    private readonly srcFieldLocator: Locator;
    private readonly dstFieldLocator: Locator;
    private readonly dateFieldLocator: Locator;
    private readonly currentMonthLocator: Locator;
    private readonly nextMonthBtnLocator: Locator;

    constructor(private readonly page: Page) {
        //Locators
        this.searchBtnLocator = this.page.getByRole('button', { name: 'Search buses' });
        this.srcFieldLocator = this.page.locator('#srcinput');
        this.dstFieldLocator = this.page.locator('#destinput');
        this.dateFieldLocator = this.page.getByRole('combobox', { name: 'Select Date of Journey' });
        this.currentMonthLocator = this.page.locator('div[class*="monthYear"]');
        this.nextMonthBtnLocator = this.page.getByRole('button', { name: 'Next month' });
    }

    getSearchBtn() {
        return this.searchBtnLocator;
    }

    getSrcField() {
        return this.srcFieldLocator;
    }

    getDstField() {
        return this.dstFieldLocator;
    }

    getDateField() {
        return this.dateFieldLocator;
    }

    async navigate() {
        return await this.page.goto('https://www.redbus.in/');
    }

    async clickSearchBtn() {
        return await this.getSearchBtn().click();
    }

    async fillSourceField(source: string) {
        await this.srcFieldLocator.fill(source);
    }

    async fillDestinationField(destination: string) {
        await this.dstFieldLocator.fill(destination);
    }

    async selectSourceFromDropdown(source: string) {
        await this.page.getByRole('heading', { name: source, exact: true }).first().click();
    }

    async selectDestinationFromDropdown(destination: string) {
        await this.page.getByRole('heading', { name: destination, exact: true }).first().click();
    }

    async clickDateField() {
        await this.dateFieldLocator.click();
    }

    async selectDate(date: number, month: string, year: number) {
        const targetDate = `${month} ${date}, ${year}`;

        let maxAttempts = 12 // Don't look further than a year
        while (maxAttempts > 0) {
            const currentMonth = await this.currentMonthLocator.innerText();
            if (currentMonth === `${month} ${year}`) {
                break;
            }
            await this.nextMonthBtnLocator.click();
            maxAttempts--;
        }
        if (maxAttempts === 0) {
            throw new Error(`Could not find ${month} ${year} in the calendar after 12 attempts`);
        }

        return await this.page.getByRole('button', { name: targetDate }).click();
    }

    async performFullSearch(srcShort: string, srcLong: string, dstShort: string, dstLong: string, date: any)  {
        await this.fillSourceField(srcShort);
        await this.selectSourceFromDropdown(srcLong);
        await this.fillDestinationField(dstShort);
        await this.selectDestinationFromDropdown(dstLong);
        await this.clickDateField();
        await this.selectDate(date.day, date.month, date.year);

        await this.clickSearchBtn();
    }
}