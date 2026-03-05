import {test, expect} from '@playwright/test'

// resolvi não usar POM aq pois o teste é praticamente só de expects
test.beforeEach('Navegar para a página de produtos', async({page}) =>{

    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveURL('https://automationexercise.com/');
    
    await page.locator('a[href="/products"]').click();
    await expect(page).toHaveURL('https://automationexercise.com/products');
})

test('Deve verificar todos os produtos e detalhes do produto', async({page}) => {

    await expect(page.getByRole('heading', {name: 'All Products'})).toBeVisible();

    await page.locator('a[href="/product_details/1"]').click();
    await expect(page).toHaveURL('https://automationexercise.com/product_details/1');
    await expect(page.getByRole('heading', {name: 'Blue Top'})).toBeVisible();
    await expect(page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(page.getByText('Rs. 500')).toBeVisible();
    await expect(page.getByText('Availability:')).toBeVisible();
    await expect(page.getByText('Condition:')).toBeVisible();
    await expect(page.getByText('Brand:')).toBeVisible();
})

test('Deve buscar um produto e verificar se os produtos relacionados estão corretos', async({page}) =>{

    await expect(page.getByRole('heading', {name: 'All Products'})).toBeVisible();

    await page.locator('#search_product').fill('T-shirt');
    await page.locator('#submit_search').click();
    await expect(page.getByRole('heading', {name: 'Searched Products'})).toBeVisible();

    //verificando se os produtos estão relacionados a busca
    const produtos = page.locator('.productinfo p');
    const count = await produtos.count();

    for (let i = 0; i < count; i++) {
    const texto = await produtos.nth(i).textContent();
    expect(texto).toContain('T-Shirt');
  }
})