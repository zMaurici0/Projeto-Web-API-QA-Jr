import {test, expect} from '@playwright/test'
import { gerarUsuario } from '../../helper/gerar_usuario';

// API sempre retorna 200 e controla status por response code

test('DELETE -  Deve retornar erro ao utilizar request errada', async ({request}) => {

    const response = await request.delete('https://automationexercise.com/api/verifyLogin');
    const json = await response.json()

    expect(response.status()).toBe(200);
    expect(json.responseCode).toBe(405);
    expect(json.message).toContain('This request method is not supported.');
    
    console.log(json)
})

test('DELETE -  Deve apagar uma conta criada', async ({request}) => {

    const usuario = gerarUsuario()
    
    // criando usuário primeiro
    const response = await request.post('https://automationexercise.com/api/createAccount',{
        form: usuario
    });

    expect(response.status()).toBe(200);

    const response2 = await request.delete('https://automationexercise.com/api/deleteAccount',{
        form: {
            email: usuario.email,
            password: usuario.password
        }
    });
 
    const json = await response2.json()

    expect(response2.status()).toBe(200);
    expect(json.responseCode).toBe(200);
    expect(json.message).toContain('Account deleted!');

})