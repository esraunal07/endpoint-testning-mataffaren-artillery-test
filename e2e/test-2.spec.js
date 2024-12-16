import { test, expect } from '@playwright/test';

test('dynamic user interactions', async ({ page }) => {
  // Sayfaya git
  await page.goto('http://127.0.0.1:4000/kategori/frukt-och-gront');
  
  // Kullanıcılar bazen rastgele bir kategori seçebilir, örneğin:
  const categories = ['Lotter', 'Tobak', 'Djur', 'Apotek', 'Dryck', 'Barn'];
 // "Djur" linkine tıklamadan önce öğenin gerçekten doğru olduğunu kontrol edin
const randomCategory = categories[Math.floor(Math.random() * categories.length)];
console.log(`Seçilen kategori: ${randomCategory}`);

// Duyarlılığı arttırmak için, tam eşleşme yerine sadece "Djur" öğesini hedefle
  await page.locator('a[href="/kategori/djur"]').click();

  await page.getByRole('link', { name: randomCategory }).click();

  // Kategoriye tıkladıktan sonra rastgele bir ürün seç
  const items = await page.locator('a').all();
  const randomItem = items[Math.floor(Math.random() * items.length)];
  console.log(`Seçilen ürün: ${await randomItem.innerText()}`);
  await randomItem.click();

  // Birkaç saniye bekle, kullanıcı ürünü inceleyebilir
  await page.waitForTimeout(2000); // 2 saniye bekle

  // Başka bir kategoriye geçiş yapabilir
  const nextCategories = ['Fryst', 'Snus', 'Kaffe', 'Ost', 'Skinka'];
  const randomNextCategory = nextCategories[Math.floor(Math.random() * nextCategories.length)];
  console.log(`Yeni kategori seçildi: ${randomNextCategory}`);
  await page.getByRole('link', { name: randomNextCategory }).click();

  // Ürünler arasında gezinme
  const randomNextItem = items[Math.floor(Math.random() * items.length)];
  console.log(`Yeni ürün seçildi: ${await randomNextItem.innerText()}`);
  await randomNextItem.click();

  // Kategoriye geri dönme
  await page.goBack(); // Gerçek kullanıcılar bazen geri dönmek isteyebilir
  await page.waitForTimeout(1000); // Bir saniye bekle
  
  // Başka bir kategoriye geçiş yap
  const randomFinalCategory = categories[Math.floor(Math.random() * categories.length)];
  console.log(`Son kategori seçildi: ${randomFinalCategory}`);
  await page.getByRole('link', { name: randomFinalCategory }).click();

  // Son olarak, birkaç ürüne daha göz at
  const finalItems = await page.locator('a').all();
  const randomFinalItem = finalItems[Math.floor(Math.random() * finalItems.length)];
  console.log(`Son ürün seçildi: ${await randomFinalItem.innerText()}`);
  await randomFinalItem.click();

  // Test sonunda birkaç saniye bekle
  await page.waitForTimeout(3000); // 3 saniye bekle
});
