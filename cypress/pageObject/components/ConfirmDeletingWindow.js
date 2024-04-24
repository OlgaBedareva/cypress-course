class ConfirmDeletingWindow {
    constructor() {
        this.confirmDeletingBtn = '#dialBtn_YES > .btnCtn > div';
    }

    clickConfirmDeletingBtn() {
        cy.get(this.confirmDeletingBtn).click();
    }
}

export default ConfirmDeletingWindow;
