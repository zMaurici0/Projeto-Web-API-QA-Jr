import {test, expect} from '@playwright/test'
import { Cart } from '../../pages/cart'

test('Deve adicionar produtos no carrinho', async({page}) => {

    const carrinho = new Cart(page);
    await carrinho.goto();
    await expect(page).toHaveURL('https://automationexercise.com');

    await page.locator('a[href="/products"]').click();
    await page.goto('https://automationexercise.com/products');
    await expect(page).toHaveURL(/products/);

    await carrinho.adicionarProduto();
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');

    const qntdprodutos = page.locator('tr[id^="product-"]');
    await expect(qntdprodutos).toHaveCount(2);
    await expect(qntdprodutos.nth(0).locator('.cart_price p')).toHaveText('Rs. 500');
    await expect(qntdprodutos.nth(1).locator('.cart_price p')).toHaveText('Rs. 400');
    await expect(qntdprodutos.nth(0).locator('.cart_quantity button')).toHaveText('1');
    await expect(qntdprodutos.nth(1).locator('.cart_quantity button')).toHaveText('1');
})

test('Deve verificar quantidade no carrinho', async ({page}) => {

    const carrinho = new Cart(page);
    await carrinho.goto();
    await expect(page).toHaveURL('https://automationexercise.com');

    await page.locator('a[href="/product_details/1"]').click();
    await expect(page).toHaveURL('https://automationexercise.com/product_details/1');

    await carrinho.adicionarQuantidade('4');
    await expect(page.locator('.cart_quantity button')).toHaveText('4')

   
})