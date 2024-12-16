import { test, expect } from '@playwright/test';

// Sayfa üzerindeki tüm resimleri kontrol eden fonksiyon
async function checkImagesOnPage(page, url) {
  await page.goto(url);
  const images = await page.$$('img');
  for (let img of images) {
    const isVisible = await img.isVisible();
    if (!isVisible) {
      console.log(`Bild på ${url} är inte synlig.`);
      throw new Error(`Bild på ${url} är inte synlig.`);
    }
  }
  console.log(`Alla bilder på ${url} är synliga.`);
}

// Kullanıcı türüne göre işlemleri gerçekleştiren fonksiyonlar
async function curiousUser(page) {
  await page.goto('http://localhost:4000/kategori/frukt-och-gront');
  await page.locator('div').filter({ hasText: /^Mejeri, ost & ägg\+$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^Ost\+$/ }).getByRole('button').click();
  await page.getByRole('link', { name: 'Dessertost' }).click();
  await page.getByRole('link', { name: 'Färskost' }).click();
  await page.getByRole('link', { name: 'Hårdost lagrad' }).click();
  await page.getByRole('link', { name: 'Hårdost mild/mellan' }).click();
  await page.getByLabel('Sortera:PopulärastA – ÖÖ –').selectOption('name-desc');
  await page.locator('div').filter({ hasText: /^Skafferi\+$/ }).getByRole('button').click();
  await page.getByRole('link', { name: 'Konserver & burkar' }).click();
  await page.getByRole('link', { name: 'Texmex' }).click();
  await page.getByRole('link', { name: 'Kryddmix' }).click();
  await page.getByLabel('Sortera:PopulärastA – ÖÖ –').selectOption('name-asc');
}

async function knowerUser(page) {
  await page.goto('http://localhost:4000/kategori');
  await page.locator('div').filter({ hasText: /^Tobak\+$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^Snus\+$/ }).getByRole('button').click();
  await page.getByRole('link', { name: 'Snus stock' }).click();
  await page.getByRole('heading', { name: 'General Lös Lössnus' }).click();
  await page.locator('html').click();
  await page.goto('http://localhost:4000/kategori/tobak/snus/snus-stock');
  await page.getByLabel('Sortera:PopulärastA – ÖÖ –').selectOption('price-asc');
  await page.getByRole('button', { name: '>' }).click();
  await page.getByRole('button', { name: '>' }).click();
 // await page.getByRole('heading', { name: 'Brukssnus Lös Lössnus' }).click();
}

async function comparerUser(page) {
  await page.goto('http://localhost:4000/kategori/frukt-och-gront');
  await page.getByRole('link', { name: 'Apotek' }).click();
  await page.getByRole('link', { name: 'Plåster & sårvård' }).click();
  await page.getByLabel('Sortera:PopulärastA – ÖÖ –').selectOption('price-asc');
  await page.getByRole('heading', { name: 'Idomin Salva Oparfymerad' }).click();
  await page.getByRole('link', { name: 'Plåster & sårvård' }).click();
  await page.getByRole('link', { name: 'Receptfria läkemedel' }).click();
  await page.getByRole('link', { name: 'Plåster & sårvård' }).click();
  await page.getByLabel('Sortera:PopulärastA – ÖÖ –').selectOption('compareprice-asc');
  await page.getByRole('heading', { name: 'Idomin Salva Oparfymerad' }).click();
}

async function greedyUser(page) {
  await page.goto('http://localhost:4000/kategori/frukt-och-gront');
  await page.getByLabel('Sortera:PopulärastA – ÖÖ –').selectOption('price-asc');
  await page.getByRole('link', { name: 'Kött, chark & fågel' }).click();
  await page.getByRole('link', { name: 'Fågel', exact: true }).click();
  await page.getByRole('link', { name: 'Färsk fågel' }).click();
  await page.getByRole('link', { name: 'Fryst fågel' }).click();
  await page.getByRole('link', { name: 'Kött', exact: true }).click();
  await page.getByRole('link', { name: 'Fläsk' }).click();
  await page.getByRole('link', { name: 'Färdiglagat & pannfärdigt' }).click();
  await page.getByRole('link', { name: 'Nöt & kalv' }).click();
  await page.getByRole('link', { name: 'Köttfärs' }).click();
  await page.getByRole('link', { name: 'Lamm & vilt' }).click();
  await page.getByRole('link', { name: 'Kassler' }).click();
  await page.getByRole('link', { name: 'Inälvsmat' }).click();
  await page.getByRole('link', { name: 'Korv' }).click();
  await page.getByRole('link', { name: 'Falukorv' }).click();
  await page.getByRole('link', { name: 'Färska korvar' }).click();
  await page.getByRole('link', { name: 'Grill, kok- & kryddkorv' }).click();
  await page.getByRole('link', { name: 'Varm-, Wienerkorv mm' }).click();
  await page.getByRole('link', { name: 'Kött- & fläskkorv mm' }).click();
  await page.getByRole('link', { name: 'Vegetarisk korv' }).click();
  await page.getByRole('link', { name: 'Ölkorv' }).click();
  await page.getByRole('link', { name: 'Fryst korv' }).click();
  await page.locator('div').filter({ hasText: /^Chark\+$/ }).getByRole('button').click();
  await page.getByRole('link', { name: 'Bacon & stekfläsk' }).click();
  await page.getByRole('link', { name: 'Köttbullar & färsprodukter' }).click();
  await page.getByRole('link', { name: 'Blodpudding' }).click();
  await page.getByRole('link', { name: 'Övrigt rökt & rimmat' }).click();
  await page.getByRole('link', { name: 'Pålägg' }).click();
  // Görünür hale gelene kadar öğeyi bekleyelim
await page.waitForSelector('a', { name: 'Skinka', state: 'visible', timeout: 60000 }); // 60 saniye bekler
await page.getByRole('link', { name: 'Skinka' }).click();

 // await page.getByRole('link', { name: 'Skinka' }).click();
  await page.getByRole('link', { name: 'Kokt Skinka' }).click();
  await page.getByRole('link', { name: 'Färskost' }).click();
  await page.getByRole('link', { name: 'Skinksmörgås' }).click();
  await page.getByRole('link', { name: 'Färskost - Kallskuret' }).click();
  await page.getByRole('link', { name: 'Kallskuret' }).click();
  await page.getByRole('link', { name: 'Högtider & Julafton' }).click();
  await page.getByRole('link', { name: 'Rökt lax' }).click();
  await page.getByRole('link', { name: 'Skinka' }).click();
}

test('Image visibility and user behavior tests', async ({ page }) => {
  // Resimlerin görünürlüğünü kontrol et
  await checkImagesOnPage(page, 'http://127.0.0.1:4000/kategori/frukt-och-gront');
  await checkImagesOnPage(page, 'http://127.0.0.1:4000/kategori/blommor-och-tradgard');
  await checkImagesOnPage(page, 'http://127.0.0.1:4000/kategori/apotek');

  // Kullanıcı senaryolarını çalıştır
  await curiousUser(page);
  await knowerUser(page);
  await comparerUser(page);
  await greedyUser(page);
});
