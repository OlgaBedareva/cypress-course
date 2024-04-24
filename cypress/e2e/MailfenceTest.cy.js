///<reference types = 'Cypress' />
import DocumentsPage from '../pageObject/pages/DocumentsPage';
import HomePage from '../pageObject/pages/HomePage'
import LoginPage from '../pageObject/pages/LoginPage'
import MailPage from '../pageObject/pages/MailPage';
import TrashDocumentsPage from '../pageObject/pages/TrashDocumentsPage';

describe('MailFence Test', () => {

  beforeEach(function () {
    cy.fixture('mailfenceTestData').then((data) => {
      this.data = data;
      cy.viewport(1280, 720)
      cy.clearEnvironment(Cypress.env('email'), Cypress.env('password'))
      cy.writeFile(this.data.filePath, this.data.fileText)
    });
  });


  it('Attach file -> send -> save file -> move to trash', function () {
    const homePage = new HomePage();
    const loginPage = new LoginPage();
    const mailPage = new MailPage();
    const documentsPage = new DocumentsPage();
    const trashDocumentsPage = new TrashDocumentsPage();
    const timestamp = new Date().getTime();
    const adjustedEmailSubject = this.data.subject + timestamp;
    const attachedFileName = timestamp + ".txt";

    cy.visit(Cypress.env('url'));

    cy.log(`Step 1.  Login to Mail.`);
    homePage.clickSignInBtn();
    loginPage.fillInLogInFormAndSubmit(Cypress.env('email'), Cypress.env('password'));

    cy.log(`Step 2.  Attach .txt file`);
    mailPage.header.clickDocumentBtn()
    cy.uploadFile(this.data.attachmentFileName, documentsPage.elements.ctreateDocumentBtn(), attachedFileName);

    cy.log(`Step 3. Send email with attached file to yourself`);
    documentsPage.sendEmailWithAttachedFile(timestamp + ".txt");
    mailPage.sendEmail(Cypress.env('email'), adjustedEmailSubject)

    cy.log(`Step 4. Check that email recieved`);
    cy.reloadPage()
    mailPage.waitUntilEmailReceived(adjustedEmailSubject)

    cy.log(`Step 5. Open recieved email`);
    mailPage.openEmailItem(adjustedEmailSubject)

    cy.log(`Step 6. Save the attached file to documents by 'Сохранить в документах' button`);
    mailPage.saveAttachedFileToDocuments();

    cy.log(`Step 7. Open documents area`);
    mailPage.header.clickDocumentBtn();

    cy.log(`Step 8. Move file from "Мои документы" folder to "Trash" folder by Drag'n'drop action`);
    cy.dragAndDrop(documentsPage.elements.createdDocument(attachedFileName), documentsPage.elements.trashSection());
    cy.interceptAndWait('POST', '/gwt', 'getDocuments', 20000, () => {
      documentsPage.clickDocumentsTrashBtn()
    })
    trashDocumentsPage.deletedDocumentShouldBeVisible(attachedFileName);
  });
})