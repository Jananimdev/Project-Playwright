const { expect } = require('@playwright/test'); 

class NavigationPage {
    constructor(page) {
      this.page = page;
      this.searchBox = '[placeholder="Search Amazon.in"]';
      this.searchButton = '[id="nav-search-submit-button"]';
    }
  
    async navigateToAmazon() {
      await this.page.goto('https://www.amazon.in/', { timeout: 120000 });
    }
  
    async searchForItem(item) {
      await this.page.locator(this.searchBox).fill(item);
      await this.page.locator(this.searchButton).click();
    }
  
    async validateNoResults(expectedItem) {
      const results = await this.page.locator('div.s-main-slot div.s-result-item').allTextContents();
      const containsExpectedItem = results.some(result => result.includes(expectedItem));
      console.log('Results:', results); 
      expect(containsExpectedItem).toBe(false);
    }
  }
  
  module.exports = NavigationPage;
  