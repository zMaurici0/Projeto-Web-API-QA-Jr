export class PlaceOrder{
    constructor(page){

        this.page = page
        this.produto1 = page.locator('.productinfo a[data-product-id="1"]').first();
        this.view_cart = page.locator('.text-center a[href="/view_cart"]');

        this.checkout_button = page.getByText('Proceed To Checkout');
        this.login_link = page.locator('a[href="/login"]')
        this.cart_link = page.getByRole('link', { name: ' Cart' })

        this.message = page.locator('textarea[name="message"]');
        this.payment_button = page.locator('a[href="/payment"]')

        this.name_on_card = page.locator('[data-qa="name-on-card"]');
        this.card_number = page.locator('[data-qa="card-number"]');
        this.cvc = page.locator('[data-qa="cvc"]');
        this.expiration = page.locator('[data-qa="expiry-month"]');
        this.year_expiration = page.locator('[data-qa="expiry-year"]');
        this.pay_button = page.locator('[data-qa="pay-button"]');
    }

    async goto(){
        await this.page.goto('https://automationexercise.com/');
    }

    async login(){
        await this.login_link.click()
    }

    async addToCart(){
        await this.produto1.hover();
        await this.produto1.click();
        await this.view_cart.click();
    }

    async checkout(){
        await this.cart_link.click();
        await this.checkout_button.click();
    }

    async sendMessage(mensagem){
        await this.message.fill(mensagem);
        await this.payment_button.click();
    }

    async paymentDetails(dados){
        await this.name_on_card.fill(dados.name);
        await this.card_number.fill(dados.card_number);
        await this.cvc.fill(dados.cvc);
        await this.expiration.fill(dados.expiration);
        await this.year_expiration.fill(dados.expirationYear);
        await this.pay_button.click();
    }
}