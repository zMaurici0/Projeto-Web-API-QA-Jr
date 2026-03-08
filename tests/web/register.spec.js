import {test, expect} from '@playwright/test'
import { Register } from '../../pages/register'
import { randomInt } from 'node:crypto';
import { adBlock } from '../../helper/safegoto.js';

test.beforeEach(async ({ page }) => {
  await adBlock(page);
});

test('Deve registrar usuário com dados válidos', async ({page}) => {

    const registro = new Register(page);
    await registro.goto();
    await expect(page).toHaveURL('https://automationexercise.com');

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
    await expect(page.getByText('Account Created!')).toBeVisible();

    await registro.contaCriada();
    await expect(page.locator('li').nth(10)).toBeVisible();

    await registro.deletarConta();
    await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();;
})

test('Deve retornar erro de email já existente', async ({page}) => {

    const registro = new Register(page);
    await registro.goto();
    await expect(page).toHaveURL('https://automationexercise.com');

    await registro.registrarPrimeiraEtapa('fulano', 'fulano@gmail.com');
    await expect(page).toHaveURL('https://automationexercise.com/signup');
    await expect(page.getByText('Email Address already exist!')).toBeVisible()
})