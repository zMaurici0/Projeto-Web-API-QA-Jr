import {test, expect} from '@playwright/test'
import { Register } from '../../pages/register'
import { Login } from '../../pages/login';
import { randomInt } from 'node:crypto';

const randomNumber = randomInt(1000000);

test.beforeEach('Deve criar novo usuário', async ({page}) => {

    const registro = new Register(page);
    await registro.goto();
    await expect(page).toHaveURL('https://automationexercise.com');

    await registro.registrarPrimeiraEtapa('ciclano', `Nome${randomNumber}@gmail.com`);
    await expect(page).toHaveURL('https://automationexercise.com/signup');
    await expect(page.getByText('Enter Account Information')).toBeVisible();

    await registro.registrarSegundaEtapa({
        password: 'senha123',
        day: '10',
        month: 'October',
        year: '1980',
        first_name: 'Ciclano',
        last_name: 'Fulano',
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

    await registro.logoutConta();
})

test('Deve fazer login com as informações corretas', async ({page}) => {

    await expect(page).toHaveURL('https://automationexercise.com/login')

    const login = new Login(page)
    await login.loginUser(`Nome${randomNumber}@gmail.com`, 'senha123')
    await expect(page.locator('li').nth(10)).toBeVisible();

    const registro = new Register(page);
    await registro.deletarConta();
    await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();;
}) 

test('Deve retornar erro "Your email or password is incorrect!"', async ({page}) => {

    await expect(page).toHaveURL('https://automationexercise.com/login')

    //fazendo login 
    const login = new Login(page)
    await login.loginUser(`Nome@gmail.com`, 'senha123')
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible()
})  