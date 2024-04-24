import Header from "../components/Header"
import CommandMenu from "../components/CommandMenu"

class DocumentsPage {
    constructor() {
        this.header = new Header();
        this.commandMenu = new CommandMenu();
    }

    elements = {
        ctreateDocumentBtn: () => cy.get('#new_doc > input'),
        contextMenuItem: () => cy.get('.GCSDBRWBPQ'),
        trashSection: () => cy.get('#doc_tree_trash'),
        createdDocument: (filename) => cy.get('.GCSDBRWBGT .GCSDBRWBAKB[title="' + filename + '"]'),
    }

    rightclickOfCreatedDocument(filename) {
        this.elements.createdDocument(filename).scrollIntoView().rightclick();
    }

    clickSendBtn() {
        this.elements.contextMenuItem().contains('Отправить').click();
    }

    sendEmailWithAttachedFile(filename) {
        this.rightclickOfCreatedDocument(filename);
        this.clickSendBtn();
    }
    clickDocumentsTrashBtn() {
        this.elements.trashSection().click();
    }
}

export default DocumentsPage;

