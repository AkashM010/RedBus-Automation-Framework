import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { bookingTestData } from '../utils/testData';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);

    await homePage.navigate();
})

test('UI Validation: Verify core elements are visible', async ({ page }) => {
    await test.step('Verify landing page header and search button', async () => {
        // Validation: Ensure the Search button is visible and enabled
        await expect(page).toHaveTitle(/redbus/i);
        await expect(homePage.getSearchBtn()).toBeVisible();
        await expect(homePage.getSearchBtn()).toBeEnabled();
    });

    await test.step('Verify input fields are present', async () => {
        await expect(homePage.getSrcField()).toBeVisible();
        await expect(homePage.getDstField()).toBeVisible();
    });
});

test('Functionality: Source and Destination selection logic', async ({  }) => {
    await test.step('Input and select source city', async () => {
        await homePage.fillSourceField(bookingTestData.source.short);
        await homePage.selectSourceFromDropdown(bookingTestData.source.long);

        // Assert: Verify the field value updated
        await expect(homePage.getSrcField()).toHaveValue(bookingTestData.source.long);
    });

    await test.step('Input and select destination city', async () => {
        await homePage.fillDestinationField(bookingTestData.destination.short);
        await homePage.selectDestinationFromDropdown(bookingTestData.destination.long);

        // Assert: Verify the field value updated
        await expect(homePage.getDstField()).toHaveValue(bookingTestData.destination.long);
    });
});

test('Calendar Validation: Date picker navigation', async ({ }) => {
    const relativeDate = bookingTestData.date.getRelativeDate();

    await test.step('Open calendar and select relative date', async () => {
        await homePage.clickDateField();
        await homePage.selectDate(relativeDate.day, relativeDate.month, relativeDate.year);
    });

    await test.step('Verify date selection', async () => {
        const expectedDateText = `${relativeDate.day} ${relativeDate.month}, ${relativeDate.year}`;
        await expect(homePage.getDateField()).toContainText(expectedDateText);
    });
});