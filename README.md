# Playwright
This project is an example on how to implement web application testing using [Playwright](https://playwright.dev/docs/intro).

## External Libraries
### dotenv
This library is used to set environment variables to run tests in local environment.

The credentials to sign into the app are stored in the environment variables.

To run the test on GitHub Actions the environment variables are set as repository variables.

### faker
This library is used to set test data dynamically to make sure each test run use different text input on different test scenarios.

