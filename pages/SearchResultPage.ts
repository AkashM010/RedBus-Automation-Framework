import { Page, Locator } from '@playwright/test';

export class SearchResultPage {

    private readonly busesFoundLocator: Locator;
    private readonly filterSectionLocator: Locator;
    private readonly busCardsLocator: Locator;

    constructor(private readonly page: Page) {
        //Locators
        this.busesFoundLocator = this.page.locator('div[class*="busesFoundText"]');
        this.filterSectionLocator = this.page.getByLabel('Filter buses');
        this.busCardsLocator = page.locator('li[class*="tupleWrapper"]'); 
    }

    getBusesFoundElement() {
        return this.busesFoundLocator;
    }

    getBusCards() {
        return this.busCardsLocator;
    }

    async applyFilter(filterName: string) {
        const filterRegEx = new RegExp(`^${filterName}\\s`, 'i');
        return await this.filterSectionLocator.getByRole('button').filter({ hasText: filterRegEx }).click();
    }

    async selectRandomBus() {
        const busCards = this.getBusCards();
        const randomBusCardIndex = Math.floor(Math.random() * (await busCards.count()));
        const busCardToClick = busCards.nth(randomBusCardIndex);
        await busCardToClick.getByRole('button', { name: /View Seats/i }).click();
    }
}