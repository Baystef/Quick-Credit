# Quick-Credit
#### [![Build Status](https://travis-ci.org/Baystef/Quick-Credit.svg?branch=develop)](https://travis-ci.org/Baystef/Quick-Credit) [![Coverage Status](https://coveralls.io/repos/github/Baystef/Quick-Credit/badge.svg?branch=develop)](https://coveralls.io/github/Baystef/Quick-Credit?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/6cd96e1c2b5852f46e48/maintainability)](https://codeclimate.com/github/Baystef/Quick-Credit/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/6cd96e1c2b5852f46e48/test_coverage)](https://codeclimate.com/github/Baystef/Quick-Credit/test_coverage)


Quick Credit is an online lending platform that provides short term soft loans to individuals. This application helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

# Introduction

Welcome to version 1 of the Quick Credit Online Lending Application. Below is a current list of available methods on different endpoints.

# Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

To work with this project, you need to have the following setup on your local machine

1. [NodeJS](https://nodejs.org)
2. [Git](https://git-scm.com/downloads)
3. Postman

## Install and run locally

```bash
$ git clone https://github.com/Baystef/Quick-Credit.git
$ cd quick-credit

$ npm i
 
$ npm run start:dev
```

# Pivotal Tracker ID

https://www.pivotaltracker.com/n/projects/2326863

# API Usage


```js
// login as admin
{
  email: "admin@quickcredit.com",
  password: "quickcreditsecret10"
}

// login as user
{
  email: "daramola@quick.com",
  password: "quickcredit10"
}
```

API BASE URL https://quick-credit-quick.herokuapp.com/. It is recommended to attach an `authorization` Header containing the generated `token` from `/api/v1/auth/signin` to access all routes. It should be added as `"Bearer token"`

## Authentication endpoints `/api/v1/auth`

| method | route        | description               | data                                          |
| ------ | ------------ | ------------------------- | ----------------------------------------------|
| POST   | /auth/signup  | Sign Up                 | `{firstName, lastName, email, password, homeAddress, workAddress}`                           |
| POST   | /auth/signin | Sign In                   | `{email, password}` |
## User Verification endpoint `/api/v1/users`

| method | route        | description               | data                                          |
| ------ | ------------ | ------------------------- | ----------------------------------------------|
| PATCH   | /users/:email/verify | User verification                 |   `{:email}`                         |


## Loan endpoints `/api/v1/loans`

| method | route          | description             | data                                 |
| ------ | -------------- | ----------------------- | ------------------------------------ |
| POST    | /loans      | Create a loan application  |   `{amount, tenor}`                                   |
| GET    | /loans  | Get all loans           |                                      |
| GET    | /loans?status=approved&repaid=false  | Get all current unrepaid loans           |                                      |
| GET    | /loans?status=approved&repaid=true  | Get all repaid loans           |                                      |
| GET   | /loans/:id      | Get a loan        ||
| PATCH    | /loans/:id  | Approve or reject a loan application    |   `{status}`                                   |


## Repayment endpoints `/api/v1/loans/:id/repayments`

| method | route            | description          | data                            |
| ------ | ---------------- | -------------------- | ------------------------------- |
| POST    | /loans/:id/repayments           | Create repayment record |  `{:id}`                               |
| GET   | /loans/:id/repayments           | Get repayment record | |             




## Admin only endpoints 

| method | route            | description               | 
| ------ | -----------------| ------------------------- |
| GET    | /api/v1/loans/:id   | Get a loan               |
| GET    | /api/v1/loans   | Get all loans               |
| GET    | /api/v1/loans?status=approved&repaid=false   | Get all unrepaid loans               |
| GET    | /api/v1/loans?status=approved&repaid=true   | Get all repaid loans               |
| POST    | /api/v1/loans/:id/repayments| Create Repayment record          |
| PATCH   | /api/v1/loans/:id    | Approve or reject a loan            |
| PATCH   | /api/v1/users/:email/verify     | User verification                    |



# API Docs

# UI Template
https://baystef.github.io/Quick-Credit/UI
# App URL
https://quick-credit-quick.herokuapp.com
# Author
Daramola Adebayo
# LICENSE
The code in this project is licensed under MIT license.

