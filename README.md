Boilerplate API
===
A hapi boilerplate that makes creating APIs easy

## Getting Started
- Clone this repo: `git clone git@github.com:devinivy/boilerplate-api.git .`
- Create a new repo on github, `new-api`.
- Change origin to point to your new API: `git remote set-url origin git@github.com:your-username/new-api.git`
- Replace references to "boilerplate" (`grep -rIni --color boilerplate *`), add model, and get developing.

## Tools
Here are a list of tools we include in the project

### Dogwater
A hapi plugin that integrates the Waterline ORM | [Learn More](https://github.com/devinivy/dogwater)

 - Place each model as a separate file in lib/models
 - Place fixtures as prescribed by dogwater in lib/fixtures.js

### Bedwetter
A hapi plugin that auto-generates RESTful CRUDdy route handlers | [Learn More](https://github.com/devinivy/bedwetter)

### bassmaster
A hapi plugin that handles batch requests | [Learn More](https://www.npmjs.org/package/bassmaster)

### Other tools
This project also contains:
 - lab for a test suite
 - poop for uncaught errors
 - hoek for utils and assertions   
 - joi for payload validation
 - boom for standard HTTP errors
 - hapi-swagger for API documentation
 - sails-disk as a stand-in persistent database.

Check-out bell and hapi-auth-jwt2 for authentication.
