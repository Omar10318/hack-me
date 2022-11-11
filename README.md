# Hack Me

## Delivery Notes

This is the forked version of the Semana test: https://github.com/semana-io/hack-me

It respects the specification described below

## How to run and test

This app has been initiated with create-react-app with typescript.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Exercise

Let's develop an application that allows the user to manage desks, employees and assignation.

The app will contain a main menu with 2 items:

- Desks
- Employees


The app will be developed in **TypeScript**. Other libs may be added.

The delivery **is not supposed to be all functional**, let's focus on architecture, wording, or anything that matter to you ...

You'll have to present and justify your decisions during the debrief.

### Desks

The desk page will allow the user to create, view and modify the desk (unique id and a name) list.


### Employees

The employee page will allow the user to create, view and modify the employee (name, email, preferred desk list) list.

An employee has a preferred **ordered** desk list, that:
- can have variable length
- can be empty


### Desk assignation (Algorithm)

An action will allow the user to trigger an algorithm that assign automatically desk to employee according to the preferred desk list.

The algorithm should, as possible:
- give one of his first preferred desk to an employee
- minimize complexity
- return employee that doesn't get desk

