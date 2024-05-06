beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

import { faker } from '@faker-js/faker'

const Email = 'ek@ek.ee'
const FirstName = 'ErgoTest'
const LastName = 'KsTest'
const Username = 'EkkS'
const PhoneNumber = '90807060'
const Password = 'ABC302010'
const RandomEmail = faker.internet.email()
const RandomFirstName = faker.person.firstName()
const RandomLastName = faker.person.lastName()
const RandomUsername = faker.internet.userName()
const RandomPhoneNumber = faker.phone.number()

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password     
        cy.get('#username').type(Username)
        cy.get('input[name="email"]').type(Email)
        cy.get('input[name="name"]').type(FirstName)
        cy.get('#lastName').type(LastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(PhoneNumber)
        cy.get("input[name='password']").type(Password)
        cy.get("input[name='confirm']").type('302010')

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

        //Assert that error message is visible
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#password_error_message.error_message').should('be.visible').should('contain', 'Passwords do not match!')

        //Change the test, so the passwords would match
        cy.get("input[name='confirm']").clear()
        cy.get("input[name='confirm']").type('ABC302010')
        cy.get('h2').contains('Password section').click()

        // Add assertion, that error message is not visible anymore
        cy.get('#password_error_message').should('not.be.visible')

        //Add assertion, that submit button is now enabled
        cy.get('.submit_button').should('be.enabled')
    })

    it('User can submit form with all fields added', () => {
        // Add test steps for filling in ALL fields
        cy.get('#username').type(RandomUsername)
        cy.get('input[name="email"]').type(RandomEmail)
        cy.get('input[name="name"]').type(RandomFirstName)
        cy.get('#lastName').type(RandomLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(RandomPhoneNumber)
        cy.get('input[type="radio"]').eq(1).check()
        cy.get('input[type="checkbox"]').eq(1).click()
        cy.get('#vehicle2').should('be.checked')
        cy.get('select#cars').select(2)
        cy.get('#cars').should('have.value', 'opel')
        cy.get('select#animal').select(5)
        cy.get('#animal').should('have.value', 'mouse')
        cy.get("input[name='password']").type(Password)
        cy.get("input[name='confirm']").type(Password)

        //Add assertion, that submit button is now enabled
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.enabled')

        // Click submitt button and verify that success message is visible
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')

    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        // Add test steps for filling in ONLY mandatory fields
        cy.get('#username').type(Username)
        cy.get('input[name="email"]').type(RandomEmail)
        cy.get('input[name="name"]').type(FirstName)
        cy.get('#lastName').type(RandomLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(RandomPhoneNumber)
        cy.get("input[name='password']").type(Password)
        cy.get("input[name='confirm']").type(Password)

        // Assert that submit button is enabled
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.enabled')

        // Assert that after submitting the form system shows successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')

    })

    // Add at least 1 test for checking some mandatory field's absence 
    it('User cannot submit registration form if mandatory fields are not filled', () => {
        //Fill only mandatory fields
        cy.get('#username').type(RandomUsername)
        cy.get('input[name="email"]').type(Email)
        cy.get('input[name="name"]').type(FirstName)
        cy.get('#lastName').type(LastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(PhoneNumber)
        cy.get("input[name='password']").type(Password)
        cy.get("input[name='confirm']").type(Password)

        // Scroll back to email input field and delete input
        cy.get('input[name="email"]').scrollIntoView()
        cy.get('input[name="email"]').clear()
        cy.get('h2').contains('Password').click()

        // submit button should be disabled
        cy.get('.submit_button').should('be.disabled')

        // refill emali filed
        cy.get('input[name="email"]').scrollIntoView()
        cy.get('input[name="email"]').type(RandomEmail)

        // delete last name
        cy.get('#lastName').scrollIntoView()
        cy.get('#lastName').clear()
        cy.get('h2').contains('Password').click()

        // submit button should be disabled
        cy.get('.submit_button').should('be.disabled')

        // refill last name filed
        cy.get('#lastName').scrollIntoView()
        cy.get('#lastName').type(LastName)

        // delete phone nr
        cy.get('[data-testid="phoneNumberTestId"]').scrollIntoView()
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        cy.get('h2').contains('Password').click()

        // submit button should be disabled
        cy.get('.submit_button').should('be.disabled')

    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    // Create similar test for checking the second picture

    it('My test for second picture', () => {
        cy.log('Will check logo nr2 source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 117)
            .and('be.greaterThan', 80)
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link 

    it('My test for checking nav part2', () => {
        // Get navigation element, find its second child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()

        cy.url().should('contain', '/registration_form_3.html')

        // Go back and verify that user is redirected to the correct url 
        cy.go('back').url().should('contain', '/registration_form_2.html')
        cy.log('Back again in regisrtatin form 2')

    });

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes

    it('Check that list of checkboxes is correct; by me', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

        //Verify default state of radio buttons
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // Verify labels of the checkboxes
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        //Mark the first checkbox as checked and assert its state
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')

        //Mark the second checkbox as checked and assert the state of the first and second checkboxes (both will stay checked)
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

    });

    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one

    it('Check that the dropdown of favorite animals is correct; by me', () => {
        // Create screenshot from the code, select second element and create screenshot for this area or full page
        cy.get('#animal').select(1).screenshot('animal drop-down')
        cy.screenshot('Full page screenshot')

        //Verify that the animal dropdown has 6 options
        cy.get('#animal').find('option').should('have.length', 6)

        //Verify all values in the dropdown
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')


    });

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}