import {test, expect} from '@playwright/test'

// API sempre retorna 200 e controla status por response code

test('GET - lista de produtos', async ({request}) => {

    const response = await request.get('https://automationexercise.com/api/productsList');
    const json = await response.json()

    expect(response.status()).toBe(200);
    expect(json.responseCode).toBe(200);
    
    console.log(json)
})

test('GET - lista de marcas', async ({request}) => {

    const response = await request.get('https://automationexercise.com/api/brandsList');
    const json = await response.json()

    expect(response.status()).toBe(200);
    expect(json.responseCode).toBe(200);
    
    console.log(json)
})