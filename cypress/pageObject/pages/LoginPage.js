class LoginPage {

    elements = {
        loginInput: () => cy.get('#UserID'),
        passwordInput: () => cy.get('#Password'),
        submitBtn: () => cy.get('input[type="submit"]')
    };

    fillInLogInFormAndSubmit(login, password) {
        this.elements.loginInput().type(login, { log: false });
        this.elements.passwordInput().type(password, { log: false });
        cy.interceptAndWait('POST', '/gwt', 'getMeetingsRequestsToAnswer', 20000, () => {
            this.elements.submitBtn().click();
        });
    }
}

export default LoginPage;