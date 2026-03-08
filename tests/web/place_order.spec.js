import {test, expect} from '@playwright/test'
import { PlaceOrder } from '../../pages/place_order'
import { Register } from '../../pages/register';
import { Cart } from '../../pages/cart';
import { randomInt } from 'crypto';
import { adBlock } from '../../helper/safegoto.js';

test.beforeEach(async ({ page }) => {
  await adBlock(page);
});

async function criarUsuario(page, registro) {

    const randomNumber = randomInt(1000000); 
    await registro.registrarPrimeiraEtapa('fulano', `fulano${randomNumber}@gmail.com`);
    await expect(page).toHaveURL('https://automationexercise.com/signup');
    await expect(page.getByText('Enter Account Information')).toBeVisible();

     await registro.registrarSegundaEtapa({
        password: 'senha123',
        day: '10',
        month: 'October',
        year: '1980',
        first_name: 'Fulano',
        last_name: 'Ciclano',
        address: 'Rua 123',
        country: 'United States',
        state: 'California',
        city: 'Qualquer',
        zipcode: '123321',
        mobile_number: '12333'
    });
    
}

test.describe('Place order', () => {

    test('Deve registrar usuário durante checkout e concluir pedido com sucesso', async({page}) =>{

        const place = new PlaceOrder(page);
        await place.goto();
        await expect(page).toHaveURL('https://automationexercise.com/');

        await place.addToCart();
        await expect(page).toHaveURL('https://automationexercise.com/view_cart');

        const registro = new Register(page);
        await criarUsuario(page, registro);

        await expect(page.getByText('Account Created!')).toBeVisible();
        
        await registro.contaCriada();
        await expect(page.locator('li').nth(10)).toBeVisible();

        await place.checkout();
        await expect(page).toHaveURL('https://automationexercise.com/checkout');
        await expect(page.getByRole('heading', {name: 'Your delivery address'})).toBeVisible();
        await expect(page.getByRole('heading', {name: 'Your billing address'})).toBeVisible();

        await place.sendMessage('Tamanho M');

        await place.paymentDetails({
            name: 'Fulano',
            card_number: '123321',
            cvc: '3232123',
            expiration: '10 dias',
            expirationYear: '2027'
        });

        await expect(page).toHaveURL('https://automationexercise.com/payment_done/500');
        await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

        await registro.deletarConta();
        await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
    })

    test('Deve registrar usuário antes do checkout', async({page}) =>{

        const place = new PlaceOrder(page);
        await place.goto();
        await expect(page).toHaveURL('https://automationexercise.com/');

        const registro = new Register(page);
        await criarUsuario(page, registro);
    
        await expect(page.getByText('Account Created!')).toBeVisible();
        
        await registro.contaCriada();
        await expect(page.locator('li').nth(10)).toBeVisible();

        await page.goto('https://automationexercise.com/products');

        const produtos = new Cart(page);
        await produtos.adicionarProduto();

        await expect(page).toHaveURL('https://automationexercise.com/view_cart');

        await place.checkout();
        await expect(page).toHaveURL('https://automationexercise.com/checkout');
        await expect(page.getByRole('heading', {name: 'Your delivery address'})).toBeVisible();
        await expect(page.getByRole('heading', {name: 'Your billing address'})).toBeVisible();

        await place.sendMessage('Tamanho M');

        await place.paymentDetails({
            name: 'Fulano',
            card_number: '123321',
            cvc: '3232123',
            expiration: '10 dias',
            expirationYear: '2027'
        });

        await expect(page).toHaveURL('https://automationexercise.com/payment_done/900');
        await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

        await registro.deletarConta();
        await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();;

    })

})

