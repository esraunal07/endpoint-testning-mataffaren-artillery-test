module.exports = {
    runBasicTest: async function () {
      const { chromium } = require('@playwright/test');
      const { expect } = require('chai');
  
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();
  
      try {
        const globalTimeout = 60000; // 60 seconds
        page.setDefaultTimeout(globalTimeout);
  
        // Load the category page
        console.log('Loading category page...');
        await page.goto('http://localhost:4000/kategori/kott-chark-och-fagel');
  
        // Click on a product
        console.log('Clicking on "Ankbröst Barbarie Fryst Frankrike" product...');
        await page.getByText('Ankbröst Barbarie Fryst Frankrike').click();
  
        // Verify product details
        console.log('Verifying product details...');
        const productDetails = page.locator('div.product-details');
        const heading = await productDetails.locator('h2').textContent();
        expect(heading).to.equal('Ankbröst Barbarie Fryst Frankrike');
  
        const description = await productDetails.locator('p:has-text("Ingredienser")').textContent();
        expect(description).to.include('Fryst Ankbröst (100%)');
        
        const imageSrc = await productDetails.locator('img').getAttribute('src');
        expect(imageSrc).to.equal('https://d2rfo6yapuixuu.cloudfront.net/h6d/h1f/8857373736990/02375801300009.jpg_master_axfood_400');
        
        console.log('Product verification completed successfully.');
  
      } catch (error) {
        console.error('Error in Playwright test:', error);
      } finally {
        await browser.close();
      }
    },
  };
  