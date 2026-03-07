import { randomInt } from 'node:crypto';

export function gerarUsuario() {

    const randomNumber = randomInt(1000000)

    return {
        name: 'Fulano',
        email: `fulano${randomNumber}@gmail.com`,
        password: '123456',
        title: 'Mr',
        birth_date: '10',
        birth_month: '10',
        birth_year: '1990',
        firstname: 'Fulano',
        lastname: 'Silva',
        company: 'Empresa',
        address1: 'Rua Teste',
        country: 'Brasil',
        zipcode: '12345',
        state: 'MS',
        city: 'Campo Grande',
        mobile_number: '1233213213'
    };
}