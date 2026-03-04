import {test, expect} from '@playwright/test'
import { Contact } from '../../pages/contact_us'
import path from 'path'


test('Deve preencher corretamente e enviar formulário', async ({page}) => {

    const contact = new Contact(page)
    await contact.goto();
    await expect(page).toHaveURL('https://automationexercise.com')

    await page.locator('a[href="/contact_us"]').click()
    await expect(page).toHaveURL('https://automationexercise.com/contact_us')
    await expect(page.getByText('Get In Touch')).toBeVisible();

     page.on('dialog', async (dialog) => {
        await dialog.accept()
    });

    const filePath = path.resolve('tests/fixtures/enviar.txt'); 
    await contact.preencherFormulario({
        name: 'Fulano',
        email: 'fulano123@gmail.com',
        subject: 'Título Genérico'
    }, filePath)

   await expect(page.locator('#contact-page')).toBeVisible();
   await page.locator('a.btn-success').click();
   await expect(page).toHaveURL('https://automationexercise.com')

})