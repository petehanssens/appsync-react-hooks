# Appsync React-Hooks

This repo aims to show you how to setup an end to end application deployment environment with the following features:

- CI/CD with CodeBuild and CodePipeline
- DynamoDB backend for state
- GraphQL API using Appsync
- Auth0 and API Key for authorization
- React/Nextjs frontend
- Apollo react-hooks for communicating with the Appsync API
- React Semantic UI for styling
- Zeit for hosting and building the frontend including storing environment variables

## Github

First of all fork this repo and take note of your username and the name of the repo.

## Auth0 setup

Sign up for Auth0:

- create a new tenant
- keep note of the Domain and Client ID

## Backend setup

The backend requires a few steps to be followed in order for it to work:

- cd into backend/infrastructure and deploy the SSM stack
- Also deploy the CI stack
- Go to the AWS Console or via the AWS CLI, update the SSM variables
- For the Issuer, use Domain and append "https://" in front of it
- For Client Id, use the Client ID from Auth0 that you took note of previously
- Now you should be ready to deploy the Appsync app
- cd out of the current directory and into the services directory
- Run sls deploy --aws-profile <your account id>
- Check the console or via the AWS CLI to see that the backend appsync service has been deployed.
- Also check using GraphiQL that you can use the Appsync endpoint with the api key outputted from the serverless deployment.

## Load in data

Go to the data/graphql_loader folder and run `node event_loader.js` in order to populate the database.

## Fronted setup

The following steps need to be followed to get the frontend up and running locally:

- Copy Appsync.example.js to Appsync.js and enter the variables
- Do the same for .env.example
- run yarn build and the run yarn dev check out the site at http://localhost:3000
- the yarn build step is needed to compile the css required for React Semantic UI


## Zeit setup

