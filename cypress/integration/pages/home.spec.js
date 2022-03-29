describe('Tab navigation', () => {
  beforeEach(() => {
    cy.visit('https://test.novisign.com/studio/login.html')
      .get('form#loginForm')
      .as('loginForm');

    cy.get('@loginForm')
      .find('input[name="username"]')
      .type('cypress_user');

    cy.get('@loginForm')
      .find('input[name="password"]')
      .type('1q1q!Q!Q');

    cy.get('@loginForm')
      .find('button#loginButton')
      .click()

    cy.url()
      .should('eq', 'https://test.novisign.com/studio/#/creative')
  });

  describe('Creative tab', () => {
    beforeEach(() => {
      cy.visit('https://test.novisign.com/studio/#/creative')
        .location('href')
        .should('include', '#/creative')
    })

    it('Should find DOM elements', () => {
      cy.get('div.app-nav-tabs')
        .find('div#mat-tab-label-0-0')
        .find('span')
        .contains('creatives')

      cy.get('div.btns-container')
        .as('btnContainer')

      cy.get('@btnContainer')
        .find('div.btn-group.app-main-btn.ng-star-inserted')
        .find('button')

      cy.get('@btnContainer')
        .find('div.text-button.ng-star-inserted')
        .should('have.length', 2)
    });
  });

  describe('Playlist tab', () => {
    beforeEach(() => {
      cy.visit('https://test.novisign.com/studio/#/playlist')
        .location('href')
        .should('include', '#/playlist')
    })

    it('Should find DOM elements and redirect after click on a button', () => {
      cy.get('div.app-nav-tabs')
        .find('div#mat-tab-label-0-1')
        .find('span')
        .contains('playlists')

      cy.get('div.btn-group.app-main-btn')
        .find('button.btn.btn-primary.action.ng-star-inserted')
        .click()

      cy.url()
        .should('eq', 'https://test.novisign.com/studio/#/playlist/edit/new') 
    });
  });

  describe('Screen tab', () => {
    beforeEach(() => {
      cy.visit('https://test.novisign.com/studio/#/screen')
        .location('href')
        .should('include', '#/screen')
    })

    it('Should find DOM elements and change view after click on button', () => {
      cy.get('div.app-nav-tabs')
        .find('div#mat-tab-label-0-2')
        .find('span')
        .contains('screens')

      cy.get('app-entity-list-toolbar')
        .last('nv-select-menu-button')
        .find('div[aria-haspopup=true]')
        .last()
        .click()

      cy.get('div.mat-menu-content')
        .click()
    });
  });
});
