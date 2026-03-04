export class Login{
    constructor(page){
        this.page = page
        this.login_email = page.locator('[data-qa = "login-email"]')
        this.login_password = page.locator('[data-qa = "login-password"]')
        this.login_button = page.locator('[data-qa = "login-button"]')
    }

    async loginUser(email, password){
        await this.login_email.fill(email)
        await this.login_password.fill(password)
        await this.login_button.click()
    }
}
