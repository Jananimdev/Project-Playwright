const { expect } = require('@playwright/test'); 

class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.resultsSelector = '.a-size-base.a-spacing-small.a-spacing-top-small.a-text-normal';
  }

  async validateSearchString(expectedString) {
    const searchString = await this.page.locator('[placeholder="Search Amazon.in"]').inputValue();
    expect(searchString).toBe(expectedString);
  }

  async validateResults() {
    const resultsText = await this.page.locator(this.resultsSelector).textContent();
    console.log('Results Text:', resultsText); 
    const pagesMatch = resultsText.match(/(\d+)-(\d+) of (over )?(\d+)/);
    let start, end, totalItems;
  
    if (pagesMatch) {
      start = pagesMatch[1];
      end = pagesMatch[2];
      totalItems = pagesMatch[4]; 
  
      console.log('Number of pages:', start, '-', end);
      console.log('Total items:', totalItems);
  
      // Validate the number of pages and items
      expect(parseInt(start)).toBeGreaterThan(0);
      expect(parseInt(end)).toBeGreaterThan(parseInt(start));
      expect(parseInt(totalItems)).toBeGreaterThan(0);
  
      console.log('Number of pages and items validated');
    } else {
      console.log('No match found for pages and items');
    }
  }
  
}

module.exports = SearchResultsPage;
