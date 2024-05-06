beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

import { faker } from '@faker-js/faker'

const Email = 'abc@abc.ee'
const FirstName = 'ErgoTesting'
const LastName = 'KsTesting'
const Username = 'TestForm3'
const PhoneNumber = '1020301'
const Password = 'ABC908070'
const RandomEmail = faker.internet.email()
const RandomFirstName = faker.person.firstName()
const RandomLastName = faker.person.lastName()
const RandomUsername = faker.internet.userName()
const RandomPhoneNumber = faker.phone.number()

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */

describe('Visual tests for registration form 3', () => {
    it('Confirm that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 165)
    })

    // Radio buttons and its content
    it('Check radio buttons and its content', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        // Confirm labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')

        // Confirm default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Dropdown and dependencies between 2 dropdowns
    it('Check that the dropdown of Country is correc', () => {
        // Create screenshot from the code, select second element and create screenshot for this area or full page
        cy.get('#country').select(1).screenshot('country drop-down')
        cy.screenshot('Full page screenshot')

        //Verify that the Country dropdown has 4 options
        cy.get('#country').find('option').should('have.length', 4)

        //Verify all values in the dropdown
        cy.get('#country').find('option').eq(0).should('have.text', '')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')

    });

    // Confirm the list of cities changes depending on the choice of country
    it('Confirm list of cities changes depending on the choice of country', () => {

        // Check that cities of Spain are correct
        cy.get('#country').select(1)
        cy.get('#city').find('option').should('have.length', 5)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')

        // Check that cities of Estonia are correct
        cy.get('#country').select(2)
        cy.get('#city').find('option').should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

        // Check that cities of Austria are correct
        cy.get('#country').select(3)
        cy.get('#city').find('option').should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')

    });

    // Check that if city is already chosen and country is updated, then city choice should be removed
    it('If city is already chosen and country is updated, then city choice should be removed', () => {

        //Select country and city
        cy.get('#country').select(1)
        cy.get('#city').find('option').eq(1).click()

        //Update counrty
        cy.get('#country').select(2)
        cy.get('#city').should('not.be.checked')
    });

    // Checkboxes, their content and links  
    it('Confirm that checkboxes content and links are correct', () => {
        // Find checkboxes
        cy.get('input[type="checkbox"]').should('have.length', 2)

        //Verify default states of checkboxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')

        // Verify labels of the checkboxes
        cy.get('input[type="checkbox"]').parent().should('contain', 'Accept our privacy policy')
        cy.get('input[type="checkbox"]').parent().get('a[href]').should('contain', 'Accept our cookie policy')

        //Mark the first checkbox as checked and assert its state
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')

        //Mark the second checkbox as checked and assert the state of the first and second checkboxes (both will stay checked)
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

    });

    // Checking email format
    it('Check email format, should support correct pattern', () => {
        // Enter Invalid email address and confirm alert
        cy.get('input[name="email"]').type('abc_.@gmail.com')
        cy.get('body').click()
        cy.get('input[name="email"]').should('have.css', 'box-shadow')
        cy.get('#emailAlert').should('be.visible').should('contain', 'Invalid email address.')
        cy.get('input[type="submit"]').should('be.disabled')

        //Test with valid email
        cy.get('input[name="email"]').clear()
        cy.get('input[name="email"]').type('abc@abc.com')
        cy.get('body').click()
        cy.get('#emailAlert').should('not.be.visible')

    })

    /*
    BONUS TASK: add functional tests for registration form 3
    Task list:
    * Create second test suite for functional tests
    * Create tests to verify logic of the page:
        * all fields are filled in + corresponding assertions
        * only mandatory fields are filled in + corresponding assertions
        * mandatory fields are absent + corresponding assertions (try using function)
        * add file functionlity(google yourself for solution!)
     */


    describe('Functional tests for Form 3', () => {
        it('All fields filled in and corresponding assertions', () => {
            //Insert name
            cy.get('#name').type(FirstName + LastName)

            // Enter email and confirm
            cy.get('input[name="email"]').type(RandomEmail)
            cy.get('input[name="email"]').should('have.value', RandomEmail)

            // Select County and City and assert selection
            cy.get('#country').select(2)
            cy.screenshot('Country drop-down')
            cy.get('#city').select('Tartu')
            cy.screenshot('city drop-down')

            // Select registration date and assert
            cy.get('input[type="date"]').first().click().type('2024-05-02')
            cy.get('input[type="date"]').first().should('have.value', '2024-05-02')

            // Select radiobutton and assert selection
            cy.get('input[type="radio"]').eq(3).click()
            cy.get('input[type="radio"]').eq(3).should('be.checked')

            // Insert Birthday and confirm
            cy.get('#birthday').click().type('2018-05-02')
            cy.get('#birthday').should('have.value', '2018-05-02')

            // Mark chekboxes
            cy.get('input[type="checkbox"]').first().click()
            cy.get('input[type="checkbox"]').first().should('be.checked')
            cy.get('input[type="checkbox"]').eq(1).click()
            cy.get('input[type="checkbox"]').eq(1).should('be.checked')

            // Upload file and confirm upload
            cy.get('input[type="file"]').click().selectFile('Eglo 900152.jpg')
            cy.get('button[type="submit"]').should('be.enabled')
            cy.get('button[type="submit"]').click()

        });

        function fillMandatoryFields() {
            cy.get('input[name="email"]').type(RandomEmail)
            cy.get('#country').select(3)
            cy.get('#city').select('Vienna')
            cy.get('input[type="checkbox"]').first().click()
        }

        it('Only mandatory fields filled in and corresponding assertions', () => {
            //Fill all mandatory fields
            fillMandatoryFields()

            //Assert that fields are filled
            cy.get('input[name="email"]').should('have.value', RandomEmail)
            cy.screenshot('Country drop-down')
            cy.screenshot('city drop-down')
            cy.get('input[type="checkbox"]').first().should('be.checked')

            //Assert that submit button is enabled
            cy.get('input[type="submit"]').should('be.enabled')

        });

        function fillOtherFields() {
            cy.get('#name').type(RandomFirstName)
            cy.get('input[type="date"]').first().click().type('2020-12-02')
            cy.get('input[type="radio"]').eq(2).click()
            cy.get('#birthday').click().type('2000-05-02')
            cy.get('input[type="checkbox"]').eq(1).click()
            cy.get('input[type="file"]').click().selectFile('Eglo 900152.jpg')
        }

        it('Mandatory fields are absent and corresponding assertions', () => {
            fillOtherFields()

            //Assert that fields are filled
            cy.get('#name').should('have.value', RandomFirstName)
            cy.get('input[type="date"]').first().should('have.value', '2020-12-02')
            cy.get('input[type="radio"]').eq(2).should('be.checked')
            cy.get('#birthday').should('have.value', '2000-05-02')
            cy.get('input[type="checkbox"]').eq(1).should('be.checked')
            cy.get('h1').contains('Registration page').click()
            cy.get('input[type="submit"]').should('not.be.enabled')

        });

    });




})

