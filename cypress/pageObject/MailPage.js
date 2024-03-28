import BaseSectionPage from "./BaseSectionPage"

class MailPage extends BaseSectionPage {

    elements = {
        mailToInput: () => cy.get('#mailTo > .GCSDBRWBPL'),
        passwordInput: () => cy.get('#Password'),
        subjectInput: () => cy.get('#mailSubject'),
        subjectsList: () => cy.get('.listSubject'),
        sendBtn: () => cy.get('#mailSend'),
        attachedFile: () => cy.get('.GCSDBRWBKRB'),
        contextMenuItensOfAttachedFile: () => cy.get('.GCSDBRWBGR'),
        saveDocumentBtn: () => cy.get('#dialBtn_OK'),
        treeItemLabel: () => cy.get('.treeItemLabel'),
        trashSection: () => cy.get('.GCSDBRWBDX > .treeItemLabel').contains('Trash'),
        chooseAllBtn: () => cy.get('.icon-checkb'),
        deleteBtn: () => cy.get('.icon16-Trash'),

    }

    typeRecipientsMail(recipientsMail) {
        this.elements.mailToInput().type(recipientsMail);
    }
    typeMailsSubject(subjectText) {
        this.elements.subjectInput().type(subjectText, { force: true });
    }
    clickSendBtn() {
        this.elements.sendBtn().click()
    }

    sendEmail(recipientsMail, subjectText) {
        this.typeRecipientsMail(recipientsMail);
        this.typeMailsSubject(subjectText);
        cy.interceptAndWait('POST', '/gwt', 'putMessage', 10000, () => {
            this.clickSendBtn();
        });
    }

    waitUntilEmailReceived(subject) {
        cy.get('body').then($body => {
            if ($body.find('.listSubject[title="' + subject + '"]').length) {
                const $el = $body.find('.listSubject[title="' + subject + '"]');
                if (Cypress.dom.isVisible($el)) {
                    this.elements.subjectsList().contains(subject).should('be.visible')
                    cy.log("email is recieved")
                }
            }
            else {
                cy.wait(3000)
                cy.reloadPage()
                cy.log("second attempt")
                this.elements.subjectsList().contains(subject).should('be.visible')
            }
        });
    }

    openEmailItem(subject) {
        cy.interceptAndWait('POST', '/gwt', 'getMessageDetails', 10000, () => {
            this.elements.subjectsList().contains(subject).click()
        });
    }

    saveAttachedFileToDocuments() {
        this.elements.attachedFile().rightclick()
        cy.interceptAndWait('POST', '/gwt', 'getDirectoriesTree', 10000, () => {
            this.elements.contextMenuItensOfAttachedFile().contains('Сохранить в документах').click()
        });
        this.elements.treeItemLabel().contains("Мои документы").click()
        this.elements.saveDocumentBtn().should('be.visible').and('not.have.attr', 'disabled');
        this.elements.saveDocumentBtn().should(`not.have.class`, `GCSDBRWBMB`);
        cy.interceptAndWait('POST', '/gwt', 'saveAttachmentInDocuments', 5000, () => {
            this.elements.saveDocumentBtn().click({ force: true });
        });
        this.elements.saveDocumentBtn().should('not.exist')
    }
}

export default MailPage;