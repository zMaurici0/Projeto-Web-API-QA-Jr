import {test, expect} from '@playwright/test'
import { Subscription } from '../../pages/subscription'

test('Verificar inscrição na home page', async({page}) =>{

    const inscricao = new Subscription(page);
    await inscricao.goto();
    await expect(page).toHaveURL('https://automationexercise.com/')

    await inscricao.scrollToFooter();
    await expect(page.getByRole('heading', {name: 'Subscription'})).toBeVisible()

    await inscricao.Subscribe('fulano@gmail.com');
    await expect(page.locator('#success-subscribe')).toBeVisible()
})


test('Verificar inscrição na pagina do carrinho', async({page}) =>{

    const inscricao = new Subscription(page);
    await inscricao.goto();
    await expect(page).toHaveURL('https://automationexercise.com/')

    await page.getByRole('link', { name: ' Cart' }).click()
    await expect(page).toHaveURL('https://automationexercise.com/view_cart')

    await inscricao.scrollToFooter();
    await expect(page.getByRole('heading', {name: 'Subscription'})).toBeVisible()

    await inscricao.Subscribe('fulano@gmail.com');
    await expect(page.locator('#success-subscribe')).toBeVisible()
})