import CommandMenu from "./CommandMenu";
import ConfirmDeletingWindow from "./ConfirmDeletingWindow";

class ListOfItemsSection {

    constructor() {
        this.commandMenu = new CommandMenu();
        this.confirmDeletingWindow = new ConfirmDeletingWindow();
        this.deletedItemsList = '.GCSDBRWBLT.GCSDBRWBDU';
    }

    clearTrashSection() {
        cy.get('body').then($body => {
            if ($body.find(this.deletedItemsList).length) {
                cy.get(this.deletedItemsList).its('length').then(length => {
                    const intValue = parseInt(length);
                    if (intValue > 0) {
                        cy.log('There is something to delete');
                        this.commandMenu.deleteAllItemsInSection();
                        this.confirmDeletingWindow.clickConfirmDeletingBtn();
                    }
                });
            } else {
                cy.log('There are no items to delete');
            }
        });
    }
}

export default ListOfItemsSection;