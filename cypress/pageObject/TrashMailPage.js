import BaseTrashPage from "../pageObject/BaseTrashPage";

class TrashMailPage extends BaseTrashPage {

    elements = {
        chooseAllBtn: () => cy.get('.icon-checkb'),
        deleteBtn: () => cy.get('.icon16-Trash'),
        confirmDeletingBtn: () => cy.get('#dialBtn_YES > .btnCtn > div')
    }
}

export default TrashMailPage;