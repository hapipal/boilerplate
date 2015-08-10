boilerplate-api
===

- Clone this repo: `git clone git@github.com:devinivy/boilerplate-api.git .`
- Create a new repo on github, `new-api`.
- Change origin to point to your new API: `git remote set-url origin git@github.com:your-username/new-api.git`
- Replace references to "boilerplate" (`grep -rIni --color boilerplate *`), add model, and get developing.

Using [dogwater](https://www.npmjs.org/package/dogwater) for ORM
 - Place each model as a separate file in lib/models
 - Place fixtures as prescribed by dogwater in lib/fixtures.js

Using [bedwetter](https://www.npmjs.org/package/bedwetter) for API building

Using [bassmaster](https://www.npmjs.org/package/bassmaster) for batch requests

Also included: lab for a test suite, poop for uncaught errors, hoek for utils and assertions, joi for payload validation, boom for standard HTTP errors, hapi-swagger for API documentation, my fork of sails-disk as a stand-in database.

Check-out bell and hapi-auth-cookie for authentication.
