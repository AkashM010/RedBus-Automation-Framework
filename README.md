# 🚌 RedBus UI Automation Project

[![Playwright Tests](https://github.com/AkashM010/RedBus-Automation-Framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/AkashM010/RedBus-Automation-Framework/actions/workflows/playwright.yml)

Hi there! 👋 Welcome to my test automation portfolio project. 

I built this framework from scratch using **Playwright** and **TypeScript** to showcase how I approach real-world End-to-End (E2E) testing. It automates the core booking flow on the RedBus website, handling tricky UI elements like dynamic calendars, auto-complete dropdowns, and canvas-based seat maps.

## ✨ What makes this project stand out?

- **Clean Architecture:** I used the **Page Object Model (POM)** pattern. This keeps the code organized, easy to read, and simple to maintain when the UI changes.
- **Smart Test Data:** Instead of hardcoding dates (which causes tests to break next week), I wrote helper functions that automatically calculate future dates and pick random filters. The tests are built to run forever without manual updates!
- **Modern Playwright Features:** I took advantage of Playwright's best features, like `test.step()` for easy-to-read reports, strict locators, auto-waiting, and Regex assertions to prevent flaky tests.
- **CI/CD Ready:** It's hooked up to **GitHub Actions**. Whenever code is pushed, the tests automatically run in the cloud.
- **Great Reporting:** If a test ever fails, it generates a detailed HTML report with traces, making it super easy to debug exactly what went wrong.

---

## 🛠️ Tech Stack

- **Framework:** Playwright
- **Language:** TypeScript
- **Environment:** Node.js
- **CI/CD:** GitHub Actions

---

## 📂 Project Structure

Here is a quick look at how I organized the code:

```text
RedBus_Automation/
├── .github/workflows/       # CI/CD pipeline setup for GitHub Actions
├── pages/                   # Page Object classes (the heavy lifting)
│   ├── BookingPage.ts       # Logic for picking seats and boarding points
│   ├── HomePage.ts          # Logic for searching and using the calendar
│   └── SearchResultPage.ts  # Logic for filtering and selecting buses
├── tests/                   # The actual test files
│   ├── booking.spec.ts      # The full E2E journey test
│   ├── home.spec.ts         # Homepage specific tests
│   └── Search.spec.ts       # Search result and filter tests
├── utils/
│   └── testData.ts          # Helpers to generate dynamic dates and filters
├── playwright.config.ts     # Playwright's brain/configuration
└── package.json             # Dependencies
```

---

## 🚀 Test Scenarios Covered

### 1. The Full Commuter's Journey (End-to-End)
- Inputs source ("Hyderabad") and destination ("Bangalore") using intelligent dropdown selection.
- Dynamically calculates and selects a future date from the calendar.
- Performs the search and applies randomized filters (e.g., "AC", "SLEEPER").
- Validates updated search results and selects a random bus.
- Interacts with the seat selection matrix to find and click an *available* seat.
- Selects random boarding and dropping points.
- Asserts successful navigation to the Passenger Information checkout tab.

### 2. Search & Filter Validation
- Validates that search results dynamically update when filters are applied.
- Asserts the presence of bus cards and non-zero search results.

### 3. Homepage & UI Validation
- Validates core UI element visibility and state (Search buttons, input fields).
- Verifies complex auto-complete dropdown behavior and exact string matching.

---

## ⚙️ Local Setup & Execution

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AkashM010/RedBus-Automation-Framework.git
   cd RedBus_Automation
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install --with-deps
   ```

### Running the Tests

- **Run all tests in headless mode (default):**
  ```bash
  npx playwright test
  ```
- **Run tests in UI mode (Interactive debugging):**
  ```bash
  npx playwright test --ui
  ```
- **Run a specific test file:**
  ```bash
  npx playwright test tests/booking.spec.ts
  ```

### Viewing Reports
After execution, generate and view the HTML report:
```bash
npx playwright show-report
```