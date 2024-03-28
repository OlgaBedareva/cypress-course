import BasePage from "./BasePage";

class BaseTrashPage extends BasePage {

    clickChooseAllBtn() {
        this.elements.chooseAllBtn().click();
    }

    clickDeleteBtn() {
        this.elements.deleteBtn().click();
    }

    clickConfirmDeletingBtn() {
        this.elements.confirmDeletingBtn().click();
    }

    clearTrashSection() {
        cy.get('body').then($body => {
            if ($body.find('.GCSDBRWBLT.GCSDBRWBDU').length) {
                cy.get('.GCSDBRWBLT.GCSDBRWBDU').its('length').then(length => {
                    const intValue = parseInt(length);
                    if (intValue > 0) {
                        cy.log('There is something to delete');
                        this.clickChooseAllBtn();
                        this.clickDeleteBtn();
                        this.clickConfirmDeletingBtn();
                    }
                });
            } else {
                cy.log('There are no items to delete');
            }
        });
    }
}

export default BaseTrashPage;
