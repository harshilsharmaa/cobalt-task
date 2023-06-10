# Cobalt Intern Task

This repository contains a Node.js application that performs operations to convert json format.

## Prerequisites

- Node.js
- npm

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to install the dependencies:


## Usage

### Running the Application

To start the application, run the following command:

```
npm start
```

or

```
node app.js
```


### Running Unit Tests

To run the unit tests, use the following command:

```
npm run test
```

### Testing the API

Make a POST request to `http://localhost:3000/api/convert` to test the API. The request should include the following properties in the request body:

- `httpsTOhttp`: Specifies the HTTPS to HTTP conversion.
- `changeCorsDataType`: Changes the data type of the CORS value (e.g., "yes" becomes true, "no" becomes false).
- `removeEmptyFields`: Removes any empty fields.
- `expandShortForm`: Expands short forms (e.g., "Cors" becomes "Cross Origin Resource Sharing").
- `upperCaseAll`: Changes all the keys to uppercase.
- `lowerCaseAll`: Changes all the keys to lowercase.
- `batch`: Runs operations in batch processing.
- `custom`: Takes the original keys and their corresponding mappings. Example:

```json
{
  "custom": {
    "API": "abcd",
    "Description": "des",
    "Auth": "auuuuuth",
    "HTTPS": "TCP",
    "Cors": "CSRF",
    "Link": "li",
    "Category": "cat"
  }
}
```

Please note the following restrictions:

1. You cannot select custom with any other option.
2. You cannot select upperCaseAll and lowerCaseAll at the same time.


### 1. Example API req body:

```json
{
  "httpsTOhttp": true,
  "removeEmptyFields": true,
  "expandShortForm": true,
  "upperCaseAll": true
}
```

It will change json as follow:

Before:
```json
{
  "API": "AdoptAPet",
  "Description": "Resource to help get pets adopted",
  "Auth": "apiKey",
  "Cors": "yes",
  "Link": "https://www.adoptapet.com/public/apis/pet_list.html",
  "Category": "Animals",
  "HTTPS": true
}
```


After:
```json
{
  "Application Programming Interface": "AdoptAPet",
  "DESCRIPTION": "Resource to help get pets adopted",
  "Authentication": "apiKey",
  "Cross Origin Resource Sharing": "yes",
  "LINK": "https://www.adoptapet.com/public/apis/pet_list.html",
  "CATEGORY": "Animals",
  "Hyper Text Transfer Protocol": true
}
```


### 2. Example API req body for custom:

```json
{
  "custom":{
    "API": "abcd",
    "Description": "des",
    "Auth": "auuuuuth",
    "HTTPS": "TCP",
    "Cors": "CSRF",
    "Link": "li",
    "Category": "cat"
  }
}
```

It will change json as follow:

Before:
```json
{
  "API": "AdoptAPet",
  "Description": "Resource to help get pets adopted",
  "Auth": "apiKey",
  "Cors": "yes",
  "Link": "https://www.adoptapet.com/public/apis/pet_list.html",
  "Category": "Animals",
  "HTTPS": true
}
```


After:
```json
{
  "abcd": "AdoptAPet",
  "des": "Resource to help get pets adopted",
  "auuuuuth": "apiKey",
  "TCP": true,
  "CSRF": "yes",
  "li": "https://www.adoptapet.com/public/apis/pet_list.html",
  "cat": "Animals"
}
```


#### External API is used in this: https://api.publicapis.org/entries
