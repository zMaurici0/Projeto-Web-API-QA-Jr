import {test, expect} from '@playwright/test'

// API sempre retorna 200 e controla status por response code

test('PUT - Deve retornar erro ao tentar atualizar produto', async ({request}) => {

    const response = await request.put('https://automationexercise.com/api/brandsList');
    const json = await response.json();

    expect(response.status()).toBe(200); // API sempre retorna 200

    expect(json.responseCode).toBe(405);
    expect(json.message).toContain('method is not supported');

    console.log(json);
})