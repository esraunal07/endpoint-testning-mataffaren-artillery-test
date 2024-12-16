const { chromium } = require('playwright');

module.exports = async function(context) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Kullanıcı ana sayfayı ziyaret eder
  await page.goto('http://127.0.0.1:4000');
  console.log("Visited homepage");

  // Kullanıcı bir kategoriye tıklar
  await page.click('text=Frukt och Grönt');
  await page.waitForTimeout(1000); // Bekleme süresi (kullanıcı okuyor gibi)

  // Kullanıcı başka bir kategoriye tıklar
  await page.click('text=Blommor och Trädgård');
  await page.waitForTimeout(1000);

  // Kullanıcı apotek sayfasına gider
  await page.click('text=Apotek');
  await page.waitForTimeout(1000);

  await browser.close();
};
