import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultPage } from '../pages/SearchResultPage';
import { bookingTestData } from '../utils/testData';
import { BookingPage } from '../pages/BookingPage';

let homePage: HomePage;
let searchResultPage: SearchResultPage;
let bookingPage: BookingPage;


test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultPage = new SearchResultPage(page);
    bookingPage = new BookingPage(page);

    await homePage.navigate();
});


test('Full User Journey: Search to Seat Selection', async ({ page }) => {
    const sourceShort = bookingTestData.source.short;
    const sourceLong = bookingTestData.source.long;
    const destinationShort = bookingTestData.destination.short;
    const destinationLong = bookingTestData.destination.long;
    const relativeDate = bookingTestData.date.getRelativeDate();

    await test.step('Perform full bus search', async () => {
        await homePage.performFullSearch(sourceShort, sourceLong, destinationShort, destinationLong, relativeDate);
    });

    await test.step('Filter and select a random bus', async () => {
        await searchResultPage.applyFilter(bookingTestData.getRandomFilter());
        await searchResultPage.selectRandomBus();
    });

    await test.step('Select seat and boarding/dropping points', async () => {
        //Asserting booking page tabs are visible
        await expect(bookingPage.getTabList()).toBeVisible();

        // Executing the booking flow
        await bookingPage.selectSeat();
        await bookingPage.switchToBoardDropPointsTab();
        await bookingPage.selectRandomBoardingPoint();
        await bookingPage.selectRandomDroppingPoint();
    });

    await test.step('Validate passenger details tab is active', async () => {
        const finalTab = bookingPage.getSelectedTab()
        await expect(finalTab).toHaveAttribute('aria-label', /Passenger/i);
        console.log("End-to-End Booking Journey Successful!");
    });
})