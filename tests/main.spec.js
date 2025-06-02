const { test, expect } = require('@playwright/test');
const JSONHandler = require('../utils/jsonHandler'); 
const NavigationPage = require('../pages/navigationPage');
const SearchResultsPage = require('../pages/searchResultsPage');
const SortPage = require('../pages/sortPage');
//import { test, expect } from '@playwright/test';
// import JSONHandler from '../utils/jsonHandler.js';


test.setTimeout(120000);

test('Amazon search and sort test', async ({ page }) => {
  const navigationPage = new NavigationPage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const sortPage = new SortPage(page);

  // Read configuration from JSON file
  const config = JSONHandler.readJSON('../data/config.json');

  await navigationPage.navigateToAmazon();
  await navigationPage.searchForItem(config.searchItem);
  await page.screenshot({ path: 'screenshots/search_results.png' });
  await searchResultsPage.validateSearchString(config.searchItem);
  await searchResultsPage.validateResults();
  await sortPage.sortByNewestArrivals();
  await page.screenshot({path:'screenshots/sorted_results.png'});

  // Get sort options count
  const sortOptionsCount = await sortPage.getSortOptionsCount();
  console.log(sortOptionsCount);

  // Collect output data
  const outputData = {
    searchItem: config.searchItem,
    searchStringValidated: true,
    resultsValidated: true,
    sortByNewestArrivals: true,
    sortOptionsCount: sortOptionsCount
  };

  // Write output data to JSON file
  JSONHandler.writeJSON('../data/output.json', outputData);

  await page.close();
});

// Add the negative test case here
test('Amazon search with invalid item', async ({ page }) => {
  const navigationPage = new NavigationPage(page);

  // Use an invalid search term
  const invalidSearchItem = 'invalidSearchTerm12345';

  await navigationPage.navigateToAmazon();
  await navigationPage.searchForItem(invalidSearchItem);
  await navigationPage.validateNoResults(invalidSearchItem);
  await page.screenshot({path:'screenshots/invalid_search_results.png'});

  await page.close();
  
});
