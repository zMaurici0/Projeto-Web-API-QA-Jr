export class Subscription{
    constructor(page){
        this.page = page
        this.footer = page.locator('footer')
        this.emailbox = page.locator('#susbscribe_email')
        this.sendbutton = page.locator('#subscribe')
    }

    async goto(){
        await this.page.goto('https://automationexercise.com')
    }

    async scrollToFooter(){
        await this.footer.scrollIntoViewIfNeeded();
    }

    async Subscribe(email){
        await this.emailbox.fill(email)
        await this.sendbutton.click()
    }
}