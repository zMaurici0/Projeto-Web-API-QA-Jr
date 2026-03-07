import {test, expect} from '@playwright/test'
import { gerarUsuario } from '../../helper/gerar_usuario';

// API sempre retorna 200 e controla status por response code

test('POST - Deve retornar erro ao tentar adicionar produto', async ({request}) => {

    const response = await request.post('https://automationexercise.com/api/productsList');
    const json = await response.json();

    expect(response.status()).toBe(200); 
    expect(json.responseCode).toBe(405);
    expect(json.message).toContain('method is not supported');

    console.log(json);
})

test('POST - buscar produto', async ({request}) => {

    const response = await request.post('https://automationexercise.com/api/searchProduct',{
        form: {
            search_product: 'top'
        }
    });
    const json = await response.json();

    expect(response.status()).toBe(200);
    expect(json.products.length).toBeGreaterThan(0);

});


test('POST - buscar produto sem parâmetro', async ({request}) => {

    const response = await request.post('https://automationexercise.com/api/searchProduct');

    const json = await response.json();

    expect(response.status()).toBe(200);
    expect(json.responseCode).toBe(400);
    expect(json.message).toContain('Bad request, search_product parameter is missing in POST request.');

});

test('POST - Deve criar usuário', async ({request}) => {

    const usuario = gerarUsuario()

    const response = await request.post('https://automationexercise.com/api/createAccount',{
        form: usuario
    });

    const json = await response.json();
    
    expect(response.status()).toBe(200);
    expect(json.responseCode).toBe(201);
    expect(json.message).toContain('User created!');

});

test('POST - Deve verificar login com dados válidos', async ({request}) => {

    const usuario = gerarUsuario()

    // criando usuário primeiro
    const response1 = await request.post('https://automationexercise.com/api/createAccount',{
        form: usuario
    });

    expect(response1.status()).toBe(200);

    // verificando login
    const response2 = await request.post('https://automationexercise.com/api/verifyLogin',{
        form: {
            email: usuario.email,
            password: usuario.password
        }
    });

    const json = await response2.json();
    
    expect(response2.status()).toBe(200);
    expect(json.responseCode).toBe(200);
    expect(json.message).toContain('User exists!');

});

test('POST - Deve retornar erro ao verificar login sem passar email de parâmetro', async ({request}) => {

    const usuario = gerarUsuario()

    const response = await request.post('https://automationexercise.com/api/verifyLogin',{
        form: {
            password: usuario.password
        }
    });

    const json = await response.json();

    expect(response.status()).toBe(200);
    expect(json.responseCode).toBe(400);
    expect(json.message).toContain('Bad request, email or password parameter is missing in POST request');

});

test('POST - Deve retornar erro ao verificar login com valores inválidos', async ({request}) => {

    const response = await request.post(
        'https://automationexercise.com/api/verifyLogin',{
            form: {
                email: 'teste@gmail.com',
                password: 'senha123321'
            }
        });

    const json = await response.json();

    expect(response.status()).toBe(200);
    expect(json.responseCode).toBe(404);
    expect(json.message).toContain('User not found!');

});

