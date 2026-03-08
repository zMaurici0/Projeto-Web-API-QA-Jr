import {test, expect} from '@playwright/test'
import { adBlock } from '../../helper/safegoto.js';

test.beforeEach(async ({ page }) => {
  await adBlock(page);
});

test('Deve verificar a página de testes', async ({page}) =>{
    await page.goto('http://automationexercise.com')
    await expect(page).toHaveURL('https://automationexercise.com')

    await page.getByRole('link', { name: ' Test Cases' }).click()
    await expect(page).toHaveURL('https://automationexercise.com/test_cases')
})