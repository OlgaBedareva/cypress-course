export default class BasePage {

    getDocumentsIcon() {
        return cy.get('.icon24-Documents')
    }

    getMailsIcon() {
        return cy.get('.icon24-Message')
    }

    getUserDropDwn() {
        return cy.get('.GCSDBRWBAE.icon-Arrow-down')
    }

    getUserMenuItem() {
        return cy.get('.GCSDBRWBGR')
    }

    clickDropDwn() {
        this.getUserDropDwn().click()
    }

    logOut() {
        this.clickDropDwn()
        this.getUserMenuItem().contains('Выйти').click()
    }

    clickDocumentBtn() {
        this.getDocumentsIcon().should('be.visible', { timeout: 10000 })
        cy.interceptAndWait('POST', '/gwt', 'getDocuments', 10000, () => {
            this.getDocumentsIcon().click();
        });
    }

    clickMailsBtn() {
        this.getMailsIcon().should('be.visible', { timeout: 10000 })
        cy.interceptAndWait('POST', '/gwt', 'getRequestorAccount', 10000, () => {
            this.getMailsIcon().click();
        });
    }
}