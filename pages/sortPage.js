const { expect } = require('@playwright/test');
class SortPage {
    constructor(page) {
      this.page = page;
      this.sortButton = '#a-autoid-0-announce';
      this.sortOptions = 'ul.a-nostyle.a-list-link li';
    }
  
    async sortByNewestArrivals() {
      await this.page.locator(this.sortButton).click();
      const targetText = 'Newest Arrivals';
      const targetElement = this.page.locator(`ul.a-nostyle.a-list-link li:has-text("${targetText}")`);
      await targetElement.click();
      const selectedText = await targetElement.innerText();
      expect(selectedText).toBe(targetText);
    }
  
    async getSortOptionsCount() {
      const sortOptions = await this.page.locator(this.sortOptions);
      const count = await sortOptions.count();
      return count;
      
    }
  }
  
  module.exports = SortPage;
  