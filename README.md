boilerplate-api
===

- Clone this repo: `git clone git@github.com:yarn-co/boilerplate-api.git .`
- Create a new repo on github, `new-api`.
- Change origin to point to your new API: `git remote set-url origin git@github.com:yarn-co/new-api.git`
- Replace references to "boilerplate" (`grep -rIn --color boilerplate *`), add model, and get developing.  See [this commit](https://github.com/yarn-co/trixel-api/commit/0ae36d17d24b37021feab75d2c52d544e350bb57).

Using [dogwater](https://www.npmjs.org/package/dogwater) for ORM
 - Place each model as a separate file in lib/models
 - Place fixtures as perscribed by dogwater in lib/fixtures.js

Using [bedwetter](https://www.npmjs.org/package/bedwetter) for API building

Using [bassmaster](https://www.npmjs.org/package/bassmaster) for batch requests

Also included: lab for a test suite, poop for uncaught errors, hoek for utils and assertions, joi for payload validation, boom for standard HTTP errors, hapi-swagger for API documentation, my fork of sails-disk as a stand-in database.

Check-out bell and hapi-auth-cookie for authentication.