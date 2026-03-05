export class Cart{
    constructor(page){
        this.page = page;
        this.produto1 = page.locator('.productinfo a[data-product-id="1"]');
        this.produto2 = page.locator('.productinfo a[data-product-id="2"]');
        this.continuebutton = page.getByRole('button', { name: 'Continue Shopping' });
        this.view_cart = page.locator('.text-center a[href="/view_cart"]');

        this.quantity = page.locator('#quantity')
        this.addbutton = page.getByRole('button', {name: 'Add to cart'})

    }

    async goto(){
        await this.page.goto('https://automationexercise.com');

    }
    async adicionarProduto(){
        await this.produto1.hover();
        await this.produto1.click();
        await this.continuebutton.click();
        await this.produto2.hover();
        await this.produto2.click();
        await this.view_cart.click();
    }

    async adicionarQuantidade(number){
        await this.quantity.fill(number);
        await this.addbutton.click();
        await this.view_cart.click(); 
    }
}