/* eslint-disable no-undef */
const storyGroupOne = 'storyGroupOne';
const defaultStories = 'Default stories';

describe('stories', function() {
    afterEach(function() {
        cy.deleteProject('bf');
    });

    beforeEach(function() {
        cy.createProject('bf', 'My Project', 'fr').then(() => cy.login());
    });
    
    it('should be possible to delete a story group', function() {
        cy.visit('/project/bf/stories');
        cy.dataCy('add-item').click({ force: true });
        cy.dataCy('add-item-input')
            .find('input')
            .type(`${storyGroupOne}{enter}`);
        cy.contains(storyGroupOne).trigger('mouseover');
        cy.contains(storyGroupOne).find('[data-cy=ellipsis-menu]').click({ force: true });
        cy.contains(storyGroupOne).find('[data-cy=delete-menu]').click({ force: true });
        cy.get('.actions > .primary').click({ force: true });
        cy.dataCy('browser-item')
            .find('span')
            .contains(storyGroupOne)
            .should('not.exist');
    });

    it('it should not be possible to delete a story group with a story linking to another one', function() {
        cy.visit('/project/bf/stories');
        cy.dataCy('add-item').click({ force: true });
        cy.dataCy('add-item-input')
            .find('input')
            .type(`${storyGroupOne}{enter}`);
        cy.dataCy('stories-linker').click({ force: true });
        cy.dataCy('stories-linker')
            .find('div')
            .children()
            .first()
            .click({ force: true });
        cy.contains(storyGroupOne).trigger('mouseover', { force: true });
        cy.contains(storyGroupOne).find('[data-cy=ellipsis-menu]').click({ force: true });
        cy.contains(storyGroupOne).find('[data-cy=delete-menu]').trigger('mouseover', { force: true });
        cy.get('.popup').should('exist');
        cy.contains(storyGroupOne).find('[data-cy=delete-menu]').click({ force: true });
        cy.dataCy('browser-item')
            .find('span')
            .contains(storyGroupOne)
            .should('exist');
    });

    it('it should not be possible to delete a story group with a story destination story in it', function() {
        cy.visit('/project/bf/stories');
        cy.dataCy('add-item').click({ force: true });
        cy.dataCy('add-item-input')
            .find('input')
            .type(`${storyGroupOne}{enter}`);
        cy.dataCy('stories-linker').click({ force: true });
        cy.dataCy('stories-linker')
            .find('div')
            .children()
            .first()
            .click({ force: true });
        cy.contains(defaultStories).click({ force: true });
        cy.contains(defaultStories).find('[data-cy=ellipsis-menu]').click({ force: true });
        cy.contains(defaultStories).find('[data-cy=delete-menu]').trigger('mouseover', { force: true });
        cy.get('.popup').should('exist');
        cy.contains(defaultStories).find('[data-cy=delete-menu]').click({ force: true });
        cy.dataCy('browser-item')
            .find('span')
            .contains(defaultStories)
            .should('exist');
    });
});