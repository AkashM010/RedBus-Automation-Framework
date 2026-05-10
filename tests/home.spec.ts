import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultPage } from '../pages/SearchResultPage';
import {BookingPage} from '../pages/BookingPage';
import { bookingTestData } from '../utils/testData';

let homePage: HomePage;
let searchResultPage: SearchResultPage;
let bookingPage: BookingPage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultPage = new SearchResultPage(page);
    bookingPage = new BookingPage(page);

    await homePage.navigate();

})

test('Select source and destination', async ({ page }) => {
    await expect(homePage.getSearchBtn()).toBeVisible();

    await homePage.fillSourceField(bookingTestData.source.short);
    await homePage.selectSourceFromDropdown(bookingTestData.source.long);

    await homePage.fillDestinationField(bookingTestData.destination.short);
    await homePage.selectDestinationFromDropdown(bookingTestData.destination.long);

    const relativeDate = bookingTestData.date.getRelativeDate();
    await homePage.clickDateField();

    await homePage.selectDate(relativeDate.day, relativeDate.month, relativeDate.year);

    await homePage.clickSearchBtn();

    //SEARCH PAGE TESTS STARTS FROM HERE
    await expect(page).toHaveTitle(new RegExp(`${bookingTestData.source.long} to ${bookingTestData.destination.long} Bus`));

    const srcInUrl = bookingTestData.source.long.toLowerCase();
    const dstInUrl = bookingTestData.destination.long.toLowerCase();
    await expect(page).toHaveURL(new RegExp(`${srcInUrl}-to-${dstInUrl}`));

    const busesFoundElement = searchResultPage.getBusesFoundElement();
    await expect(busesFoundElement).toBeVisible();
    const busesFoundText = await busesFoundElement.innerText();
    console.log(`Buses found text: ${busesFoundText}`);

    await searchResultPage.applyFilter(bookingTestData.getRandomFilter());

    await expect(searchResultPage.getBusCards().first()).toBeVisible();
    await searchResultPage.selectRandomBus();

    await expect(bookingPage.getTabList()).toBeVisible();


    await bookingPage.selectSeat();

    await bookingPage.switchToBoardDropPointsTab();

    await bookingPage.selectRandomBoardingPoint();
    await bookingPage.selectRandomDroppingPoint();


    await expect(bookingPage.getSelectedTab()).toHaveAttribute('aria-label', /Passenger/i);
});