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
  
  }
  
  module.exports = NavigationPage;
  