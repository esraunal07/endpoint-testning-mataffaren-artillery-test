// playwrightProcessor.cjs
module.exports = {
    runOrdinaryBuyerTest: async function () {
      const { chromium } = require('@playwright/test');
      const { expect } = await import('chai');
  
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();
  
      try {
        // Kategori sayfasını yükle
        await page.goto('http://localhost:4000/kategori/kott-chark-och-fagel');
        console.log('Page loaded: /kategori/kott-chark-och-fagel');
  
        await page.getByRole('link', { name: 'Kött, chark & fågel' }).locator('..').getByRole('button').click();
        await page.getByRole('link', { name: 'Fågel', exact: true }).click();
  
        // Ürünü seç ve doğrulama yap
        await page.getByLabel('Sortera:').selectOption('name-asc');
        await page.getByText('Ankbröst Barbarie Fryst Frankrike').click();
        console.log('Clicked on "Ankbröst Barbarie Fryst Frankrike"');
  
        // Ürün detaylarını doğrula
        const productDetails = page.locator('div.product-details');
        const heading = await productDetails.locator('h2').textContent();
        console.log('Heading found:', heading);
        expect(heading).to.equal('Ankbröst Barbarie Fryst Frankrike');
  
        const description = await productDetails.locator('p:has-text("Ingredienser")').textContent();
        console.log('Description found:', description);
        expect(description).to.include('Fryst Ankbröst (100%)');
  
        const imageSrc = await productDetails.locator('img').getAttribute('src');
        expect(imageSrc).to.equal('https://d2rfo6yapuixuu.cloudfront.net/h6d/h1f/8857373736990/02375801300009.jpg_master_axfood_400');
        console.log('Product verification completed successfully.');
  
        console.log('Shopping completed!');
      } catch (error) {
        console.error('Error in Playwright test:', error);
      } finally {
        await browser.close();
      }
    },
  };
  