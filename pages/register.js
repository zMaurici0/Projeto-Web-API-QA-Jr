export class Register{

    constructor(page){
        //Register primeira etapa
        this.page = page;
        this.loginlink = page.locator('li').nth(3);
        this.userbox = page.getByPlaceholder('Name');
        this.emailbox = page.locator('[data-qa="signup-email"]');
        this.signup = page.getByRole('button', {name: 'Signup'});

        //Segunda etapa
        this.titlecheckbox = page.locator('#id_gender1')
        this.passwordbox = page.locator('[data-qa="password"]');
        this.selectday = page.locator('#days')
        this.selectmonth = page.locator('#months');
        this.selectyear = page.locator('#years');
        this.newslettercheckbox = page.getByRole('checkbox', {name: 'newsletter'});
        this.offerscheckbox = page.locator('#optin')
        this.firstnamebox = page.locator('#first_name');
        this.lastnamebox = page.locator('#last_name');
        this.adreessbox = page.locator('#address1');
        this.selectcountry = page.locator('#country');
        this.statebox = page.locator('#state');
        this.citybox = page.locator('#city');
        this.zipcodebox = page.locator('#zipcode');
        this.mobilebox = page.locator('#mobile_number');
        this.createbutton = page.getByRole('button', {name: 'Create Account'});

        // conta criada
        this.continuebutton = page.locator('[data-qa="continue-button"]');

        //deletar conta
        this.deleteaccount = page.locator('a[href="/delete_account"]')

        //logout
        this.logoutaccount = page.locator('a[href="/logout"]')
    }

    async goto(){
        await this.page.goto('https://automationexercise.com')
    }

    async registrarPrimeiraEtapa(name, email){
        await this.loginlink.click();
        await this.userbox.fill(name);
        await this.emailbox.fill(email);
        await this.signup.click();
    }

    async registrarSegundaEtapa(dados){
        await this.titlecheckbox.click();
        await this.passwordbox.fill(dados.password);
        await this.selectday.selectOption(dados.day);
        await this.selectmonth.selectOption(dados.month);
        await this.selectyear.selectOption(dados.year);
        await this.newslettercheckbox.click();
        await this.offerscheckbox.click();
        await this.firstnamebox.fill(dados.first_name);
        await this.lastnamebox.fill(dados.last_name);
        await this.adreessbox.fill(dados.address);
        await this.selectcountry.selectOption(dados.country);
        await this.statebox.fill(dados.state);
        await this.citybox.fill(dados.city);
        await this.zipcodebox.fill(dados.zipcode);
        await this.mobilebox.fill(dados.mobile_number)
        await this.createbutton.click()
    }

    async contaCriada(){
        await this.continuebutton.click()
    }

    async logoutConta(){
        await this.logoutaccount.click()
    }

    async deletarConta(){
        await this.deleteaccount.click()
    }
}

