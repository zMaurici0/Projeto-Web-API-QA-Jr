export class Contact{
    constructor(page){
        this.page = page
        this.input_name = page.locator('[data-qa = "name"]')
        this.input_email = page.locator('[data-qa = "email"]')
        this.input_subject = page.locator('[data-qa = "subject"]')
        this.input_file = page.locator('input[name = "upload_file"]')
        this.submit_button = page.locator('[data-qa = "submit-button"]')
    }

    async preencherFormulario(dados, file){
        await this.input_name.fill(dados.name)
        await this.input_email.fill(dados.email)
        await this.input_subject.fill(dados.subject)
        await this.input_file.setInputFiles(file);
        await this.submit_button.click()
    }

    async goto(){
        await this.page.goto('https://automationexercise.com')
    }
}