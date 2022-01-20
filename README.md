<h1 align="center">MERN Stack featuring Apollo GraphQL Stripe JWT PWA</h1>
<h3 align="center">H | A | L | O</h3>
  
<p align="center">
    <img src ="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql">
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"  />
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"  />
    <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" />
</p>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Tests](#tests)
- [Email](#email)
- [GitHub](#GitHub)
- [Contributing](#contributing)
- [License](#license)

## Description

- Full-stack MERN application featuring Apollo Server GraphQL library to handle data requests while retrieving the user data from a MongoDB database.

- The application uses the Apollo Client library to consume GraphQL APIs on the front end.

- This is also Progressive Web Application that uses web manifest and service worker for offline functionality

## Installation

- At the root of the directory, run `npm install` to install the dependencies highlighted in `package.json` file.

- The application is using `concurrently ` npm package to be able to run both servers on the front end and on the back end with the `npm run develop` command. Please refer to the script in `package.json`.

- In the root of the server folder, create a `.env` file with the following three variables:

  `MONGO_URI` && `JWT_SECRET` && `JWT_EXPIRATION` && `STRIPE_KEY`

- Once completed, your .env file should resemble the following example

`JWT_SECRET= yourSecretStringGoesHere JWT_EXPIRATION= '2hr' STRIPE_KEY='<yourstripekey>' MONGODB_URI=mongodb+srv://benkaan:<yourMongoDBPassword>@nodejs.xqscs.mongodb.net/<theNameOfYourDataBase>?retryWrites=true&w=majority`

- If you would like to incorporate React-Mailchimp-Subscribe by uncommenting the code in the `NewsletterSignUp` component. You also need to create a `.env` file in the root of the application with the `MAILCHIMP_URL` value provided by [mailchimp](https://us20.admin.mailchimp.com/lists/dashboard/signup-forms/)

## Tests

You can access the deployed application [here](https://sleepy-ocean-28624.herokuapp.com).

![demo gif]()

## Contributing

Contributions are always appreciated!

## Email

For questions and feedback, please contact me via [my email](mailto:benkaan001@gmail.com) or [my GitHub](https://www.github.com/benkaan001)

## GitHub

:octocat: [Ben Kaan](https://www.github.com/benkaan001)

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
