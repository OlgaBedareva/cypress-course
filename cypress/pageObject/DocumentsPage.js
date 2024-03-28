import BaseSectionPage from "./BaseSectionPage"
class DocumentsPage extends BaseSectionPage {

    elements = {
        ctreateDocumentBtn: () => cy.get('#new_doc > input'),
        contextMenuItem: () => cy.get('.GCSDBRWBPQ'),
        сreatedDocument: (filename) => cy.get('.GCSDBRWBGT .GCSDBRWBAKB[title="' + filename + '"]'),
        trashSection: () => cy.get('#doc_tree_trash'),
        chooseAllBtn: () => cy.get('.icon-checkb'),
        deleteBtn: () => cy.get('.icon16-Trash'),
    }

    rightclickOfCreatedDocument(filename) {
        this.elements.сreatedDocument(filename).scrollIntoView().rightclick();
    }

    clickSendBtn() {
        this.elements.contextMenuItem().contains('Отправить').click();
    }

    sendEmailWithAttachedFile(filename) {
        this.rightclickOfCreatedDocument(filename);
        this.clickSendBtn();
    }
}

export default DocumentsPage;

