const DATA = {
  correct: {
    name: 'cypress_user',
    password: '1q1q!Q!Q'
  },
  incorrect: {
    name: 'incorrect',
    password: 'incorrect'
  }
}

describe('Login Test', () => {
  it('Should be success auth with correct data', () => {
    cy.visit('https://test.novisign.com/studio/login.html')
      .get('form#loginForm')
      .as('loginForm')

    cy.get('@loginForm')
      .find('input[name="username"]')
      .type(DATA.correct.name)
      .wait(100)

    cy.get('@loginForm')
      .find('input[name="password"]')
      .type(DATA.correct.password)
      .wait(100)

    cy.get('@loginForm')
      .find('button#loginButton')
      .click()
      
    cy.location('href')
      .should('include', '#/creative')
  });

  it('Should be denied auth with incorrect data', () => {
  cy.visit('https://test.novisign.com/studio/login.html')
    .get('form#loginForm')
    .as('loginForm')

  cy.get('@loginForm')
    .find('input[name="username"]')
    .type(DATA.incorrect.name);

  cy.get('@loginForm')
    .find('input[name="password"]')
    .type(DATA.incorrect.password);

  cy.get('@loginForm')
    .find('button#loginButton')
    .click()
    .wait(100)

  cy.get('@loginForm')
    .find('span#loginError')
    .contains('Invalid username or password')
  })
});
