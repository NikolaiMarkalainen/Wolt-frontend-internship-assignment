Before running the application:

Use node version 23.x.x 

verify node version 

> node -v 


if you have for some reason different node version use nvm package manager.

> nvm use 23


Running application after cloning the repository:


> cd Wolt-frontend-internship-assignment

> npm install

> npm run dev

Application should be running.


Running tests created for the application


Unit tests VITEST located at /src/vitest

Run from project root where package.json is located with the following command: 

> npm run test



Cypress test cases E2E located at /cypress/e2e/

Run from project root where package.json is located with the following command:
> npm run cy:open

May require sudo command on linux partitions

Allow permissions if asked by cypress to successfully run the tests.
Move to E2E Testing and choose whichever browser but tested on Chrome and Firefox

Choose from sepcs cypres--tests.cy.ts, once chosen the tests will run.