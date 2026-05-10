import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultPage } from '../pages/SearchResultPage';
import { bookingTestData } from '../utils/testData';

let homePage: HomePage;
let searchResultPage: SearchResultPage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultPage = new SearchResultPage(page);

    await homePage.navigate();
});

test('Filter Validation: Apply Random Filter and Verify Results', async ({ page }) => {
    const sourceShort = bookingTestData.source.short;
    const sourceLong = bookingTestData.source.long; 
    const destinationShort = bookingTestData.destination.short;
    const destinationLong = bookingTestData.destination.long;
    const relativeDate = bookingTestData.date.getRelativeDate();

    await test.step('Perform search and validate search page loads', async () => {
        await homePage.performFullSearch(sourceShort, sourceLong, destinationShort, destinationLong, relativeDate);

        await expect(page).toHaveTitle(new RegExp(`${bookingTestData.source.long} to ${bookingTestData.destination.long} Bus`));
        await expect(searchResultPage.getBusesFoundElement()).toBeVisible();
    });

    await test.step('Apply a random filter', async () => {
        const filterToApply = bookingTestData.getRandomFilter();
        console.log(`Applying Filter: ${filterToApply}`);
        await searchResultPage.applyFilter(filterToApply);
    });

    await test.step('Verify results update after filtering', async () => {
        await expect(searchResultPage.getBusCards().first()).toBeVisible();

        const busCount = await searchResultPage.getBusCards().count();
        expect(busCount).toBeGreaterThan(0);
    });


});