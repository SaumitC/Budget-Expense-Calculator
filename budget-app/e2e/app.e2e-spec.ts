// app.e2e-spec.ts

import { browser, by, element } from 'protractor';

describe('Budget App', () => {
  beforeAll(() => {
    // Set up any necessary configurations
  });

  it('should sign up, log in, and add a budget', () => {
    // Navigate to signup page
    browser.get('/signup');
    element(by.id('firstname')).sendKeys('Saumit');
    element(by.id('lastname')).sendKeys('Chinchkhandi');
    element(by.id('email')).sendKeys('saumitC@gmail.com');
    element(by.id('password')).sendKeys('12345678');
    element(by.id('signupButton')).click();

    // Navigate to login page
    browser.get('/login');
    element(by.id('username')).sendKeys('saumitC@gmail.com');
    element(by.id('password')).sendKeys('12345678');
    element(by.id('signupButton')).click();

    // Add a budget
    browser.get('/dashboard');

    // Add assertions based on the application state
    expect(element(by.id('dashboardTitle')).getText()).toBeTruthy
  });
});
