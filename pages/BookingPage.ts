import { Page, Locator } from '@playwright/test';

export class BookingPage {

    private readonly tabListLocator: Locator;
    private readonly seatContainerLocator: Locator;
    private readonly boardDropPointSectionLocator: Locator;
    private readonly boardingPointsLocator: Locator;
    private readonly droppingPointsLocator: Locator;
    private readonly selectedTabLocator: Locator;


    constructor(private readonly page: Page) {
        this.tabListLocator = this.page.getByLabel('Tabs');
        this.seatContainerLocator = this.page.locator('[aria-label*="Seat selection area"]');
        this.boardDropPointSectionLocator = this.page.getByLabel('Board/Drop point');
        // Use CSS locator to specifically target the visible div with role="radio" 
        // and avoid the hidden <input type="radio"> that Playwright might be matching instead.
        this.boardingPointsLocator = this.page.locator('div[role="radiogroup"][aria-label="Boarding points"] div[role="radio"]');
        this.droppingPointsLocator = this.page.locator('div[role="radiogroup"][aria-label="Dropping points"] div[role="radio"]');
        this.selectedTabLocator = this.tabListLocator.getByLabel(/selected/i);
    }

    getTabList() {
        return this.tabListLocator;
    }

    getBoardPointsList() {
        return this.boardingPointsLocator;
    }

    getDropPointsList() {
        return this.droppingPointsLocator;
    }

    getSelectedTab() {
        return this.selectedTabLocator;
    }

    async selectSeat(seatType?: 'lower deck' | 'upper deck') {
        const seatSelector = seatType ?
            `[role="button"][aria-label*="${seatType}"][aria-label*="seat status available"]` :
            `[role="button"][aria-label*="seat status available"]`
        const availableSeats = this.seatContainerLocator.locator(seatSelector);
        await availableSeats.first().waitFor({ 'state': 'visible' }); // Wait for seats to be visible

        const availableSeatsCount = await availableSeats.count();
        if (availableSeatsCount === 0) {
            throw new Error(`Test Failed. No available seats found ${seatType ? 'for ' + seatType : 'on this bus'}.`);
        }
        const randomSeatIndex = Math.floor(Math.random() * availableSeatsCount);
        const seatToBeSelected =  availableSeats.nth(randomSeatIndex);
        await seatToBeSelected.click();
        console.log(`Seat selected: ${await seatToBeSelected.getAttribute('aria-label')}`)
    }

    async switchToBoardDropPointsTab() {
        await this.boardDropPointSectionLocator.click();
    }

    async selectRandomBoardingPoint() {
        const boardingPoints = this.getBoardPointsList();
        await boardingPoints.first().waitFor({ 'state': 'visible' }); // Wait for boarding points to be visible
        const boardingPointCount = await boardingPoints.count();
        console.log(`Boarding points found: ${boardingPointCount}`);
        const randomBpIndex = Math.floor(Math.random() * boardingPointCount);
        await boardingPoints.nth(randomBpIndex).click();
    }

    async selectRandomDroppingPoint() {
        const droppingPoints = this.getDropPointsList();
        await droppingPoints.first().waitFor({ 'state': 'visible' }); // Wait for dropping points to be visible
        const droppingPointsCount = await droppingPoints.count();
        console.log(`Dropping points found: ${droppingPointsCount}`);
        const randomDpIndex = Math.floor(Math.random() * droppingPointsCount);
        await droppingPoints.nth(randomDpIndex).click();
    }

}