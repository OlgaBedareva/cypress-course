import BasePage from "./BasePage";

class BaseSectionPage extends BasePage {


    clickChooseAllBtn() {
        this.elements.chooseAllBtn().click()
    }
    clickDeleteBtn() {
        this.elements.deleteBtn().click()
    }
    clickTrashSection(alias) {
        cy.interceptAndWait('POST', '/gwt', alias, 20000, () => {
            this.elements.trashSection().click();
        });
    }

    deleteAllItemsInSection() {
        this.clickChooseAllBtn();
        this.clickDeleteBtn();
    }
}

export default BaseSectionPage;
