import Header from "../components/Header";
import ListOfItemsSection from "../components/ListOfItemsSection";

class TrashDocumentsPage {

    constructor() {
        this.header = new Header();
        this.listOfItemsSection = new ListOfItemsSection();
    }

    elements = {
        deletedDocument: (filename) => cy.get('.GCSDBRWBGT .GCSDBRWBAKB[title="' + filename + '"]'),
    }

    deletedDocumentShouldBeVisible(filename) {
        this.elements.deletedDocument(filename).should('be.visible');
    }
}

export default TrashDocumentsPage;
