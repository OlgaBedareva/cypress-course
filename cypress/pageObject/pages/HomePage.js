class HomePage {

    elements = {
        signInBtn: () => cy.get("#signin")
    };

    clickSignInBtn() {
        this.elements.signInBtn().click();
    }
}

export default HomePage;