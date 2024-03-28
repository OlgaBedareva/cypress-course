import 'cypress-file-upload';
import MailPage from "../pageObject/MailPage";
import DocumentsPage from "../pageObject/DocumentsPage";
import TrashDocumentsPage from "../pageObject/TrashDocumentsPage";
import LoginPage from "../pageObject/LoginPage";
import HomePage from "../pageObject/HomePage";
import TrashMailPage from "../pageObject/TrashMailPage";

Cypress.Commands.add('dragAndDrop', (drag, drop) => {
  drag.then(subject => {
    drop.then(target => {
      cy.wrap(subject).should('be.visible', { timeout: 10000 });
      cy.wrap(target).should('be.visible', { timeout: 10000 });

      cy.wrap(target).first().then($target => {
        let coordsDrop = $target[0].getBoundingClientRect();
        cy.wrap(subject).then(subject => {
          const coordsDrag = subject[0].getBoundingClientRect();
          cy.wrap(subject)
            .trigger('mousedown', {
              button: 0,
              clientX: coordsDrag.x,
              clientY: coordsDrag.y,
              force: true
            })
            .trigger('mousemove', {
              button: 0,
              clientX: coordsDrag.x - 5,
              clientY: coordsDrag.y - 5,
              force: true
            }).wait(1000);

          cy.wrap(target)
            .trigger('mousemove', {
              button: 0,
              clientX: coordsDrop.x,
              clientY: coordsDrop.y,
              force: true
            })
            .trigger('mouseup', { force: true });
        });
      });
    });
  });
});

Cypress.Commands.add("uploadFile", (testFileName, el, attachedFileName) => {
  cy.fixture(testFileName).then(fileContent => {
    el.attachFile({
      fileContent: fileContent.toString(),
      fileName: attachedFileName,
    });
  })
});

Cypress.Commands.add('interceptAndWait', (method, urlIncludes, alias, timeout, callback) => {
  cy.intercept(method, urlIncludes, (request) => {
    if (request.body.includes(alias)) {
      request.alias = alias;
    }
  }).then(() => {
    callback();
    cy.wait(`@${alias}`, { timeout: timeout });
  });
});

Cypress.Commands.add("reloadPage", () => {
  cy.intercept(`POST`, `/gwt`, (request) => {
    if (request.body.includes(`getMeetingsRequestsToAnswer`)) {
      request.alias = 'login';
    }
  });
  cy.reload()
  cy.wait(`@login`, { timeout: 20000 });
});

Cypress.Commands.add("clearEnvironment", (login, password) => {

  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const mailPage = new MailPage();
  const documentsPage = new DocumentsPage();
  const trashDocumentsPage = new TrashDocumentsPage();
  const trashMailPage = new TrashMailPage();

  cy.visit(Cypress.env('url'));
  homePage.clickSignInBtn();
  loginPage.fillInLogInFormAndSubmit(login, password);
  mailPage.deleteAllItemsInSection()
  mailPage.clickTrashSection('getFolderMessages')
  trashMailPage.clearTrashSection()
  mailPage.clickDocumentBtn()
  documentsPage.deleteAllItemsInSection()
  documentsPage.clickTrashSection('getDocuments')
  trashDocumentsPage.clearTrashSection()
  trashDocumentsPage.clickMailsBtn()
  trashDocumentsPage.logOut();
});
