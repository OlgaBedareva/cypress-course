import BaseTrashPage from "../pageObject/BaseTrashPage";

class TrashDocumentsPage extends BaseTrashPage {

    elements = {
        deletedDocument: (filename) => cy.get('.GCSDBRWBGT .GCSDBRWBAKB[title="' + filename + '"]'),
        deletedDocumentsList: () => cy.get('.GCSDBRWBLT.GCSDBRWBDU'),
        deleteBtn: () => cy.get('[title="Удалить"] > .tbBtnText'),
        chooseAllBtn: () => cy.get('.icon-checkb'),
        confirmDeletingBtn: () => cy.get('#dialBtn_YES > .btnCtn > div')
    }

    deletedDocumentShouldBeVisible(filename) {
        this.elements.deletedDocument(filename).should('be.visible');
    }
}

export default TrashDocumentsPage;
