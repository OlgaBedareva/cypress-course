class Header {

    constructor() {
        this.documentsIcon = '.icon24-Documents';
        this.mailsIcon = '.icon24-Message';
        this.userDropDwn = '.GCSDBRWBAE.icon-Arrow-down';
        this.userMenuItem = '.GCSDBRWBGR';
    }

    clickUserDropDwn() {
        cy.get(this.userDropDwn).click()
    }

    logOut() {
        this.clickUserDropDwn()
        cy.get(this.userMenuItem).contains('Выйти').click()
    }

    clickDocumentBtn() {
        cy.get(this.documentsIcon).should('be.visible', { timeout: 10000 })
        cy.interceptAndWait('POST', '/gwt', 'getDocuments', 10000, () => {
            cy.get(this.documentsIcon).click();
        });
    }

    clickMailsBtn() {
        cy.get(this.mailsIcon).should('be.visible', { timeout: 10000 })
        cy.interceptAndWait('POST', '/gwt', 'getRequestorAccount', 10000, () => {
            cy.get(this.mailsIcon).click();
        });
    }
}

export default Header;