class CommandMenu {

    constructor() {
        this.chooseAllBtn = '.icon-checkb';
        this.deleteBtn = '.icon16-Trash';
    }

    clickChooseAllBtn() {
        cy.get(this.chooseAllBtn).click()
    }

    clickDeleteBtn() {
        cy.get(this.deleteBtn).click()
    }

    deleteAllItemsInSection() {
        this.clickChooseAllBtn();
        this.clickDeleteBtn();
    }
}

export default CommandMenu;
