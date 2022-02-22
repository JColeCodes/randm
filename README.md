# RANDM - The Random Dating App

**RANDM** is a dating application that helps users find matches through randomization. While other dating apps on the market focus too much on matches based on initial judgement, with RANDM, people can start chatting with and getting to know potential dates without that initial judgement in an app free of profile pictures and “swiping”.

## Table of Contents

* [User Story](#user-story)
* [Screenshot](#screenshot)
* [Live Deployment](#live-deployment)
* [Created With](#created-with)
* [Installation and Usage](#installation-and-usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## User Story

```
AS A person who has trouble finding dating matches  
I WANT to use a dating app that randomly matches users  
SO THAT when I click on the RANDM button, a new page opens with a random potential date with whom I can start chatting.
```

```
WHEN I open the app  
THEN I am presented with the title of the app and the login form.  
WHEN I choose to register  
THEN I'm presented with inputting my first name, last name, email, password, gender identity, sexual preferences, pronouns, birthday, and bio.  
WHEN I click on login  
THEN I'm presented with entering my email and password.  
WHEN I click the randomize a new chat button  
THEN I'm presented with a new open chat with a random user. 
WHEN I click on logout  
THEN I'm presented with the homepage screen.
```

## Screenshot

[![random](https://raw.githubusercontent.com/JColeCodes/cc-portfolio/main/assets/images/portfolio/Randm.jpg)](https://ran-dm.herokuapp.com/)

## Live Deployment

This application is deployed using Heroku:

- [Ran-dm.Herokuapp.com](https://ran-dm.herokuapp.com/)

## Created With

* Node.js + Express.js
* MySQL / MySQL2
* Sequelize
* Handlebars
* Bcrypt
* Socket.io

![JavaScript Badge](https://img.shields.io/badge/-JavaScript-yellow?style=for-the-badge&logo=appveyor) 
![CSS Badge](https://img.shields.io/badge/-CSS-blueviolet?style=for-the-badge&logo=appveyor) 
![Handlebars](https://img.shields.io/badge/-Handlebars-orange?style=for-the-badge&logo=appveyor)

## Installation and Usage

To install and run this project, please follow these steps: 
1. Make sure you have [Node.js](https://nodejs.org) and [MySQL](https://dev.mysql.com/downloads/) installed.
2. Through the command line, go to the folder you wish this application's folder to be in.
3. Do `git clone` of the repository to get the application's files.
4. Run `npm run schema` to get the database.
5. To install all of the depenencies this application uses, run `npm install`.
6. Create a `.env` file containing: `DB_NAME=randm_db`, along wtih your `DB_USER`, `DB_PASSWORD`, and a secret code `SECRET_SECRET`.
7. To start the application, run `npm start`.
8. Open [localhost:3001](http://localhost:3001/) to see the local webpage.

## Contributing

RANDM is a work in progress! If you would like to contribute to this project, you can do so by:
1. Forking the project. ([Learn how to fork.](https://docs.github.com/en/get-started/quickstart/fork-a-repo))
2. Creating a new feature branch, committing the changes, and pushing the branch.
3. Opening a [Pull Request](https://github.com/JColeCodes/randm/pulls).

Read the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

## Tests

To easily test the application with a few users already registered, you can seed the database by running the following command:
```
npm run seed
```

## Questions
RANDM was created by Jennifer Cole, Lex Slovik, Charlie Hua, Chuong Vo, Marielle Champagne, Ahmad Anees, Gavin Jacobsen, Rex Oliver.

For inquiries regarding the project, please email Jennifer Cole at [capauldi@gmail.com](mailto:capauldi@gmail.com).
