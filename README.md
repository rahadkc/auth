Auth
======

About
---
A ( Node + Express + MongoDB + Mongoose ) server authentication app which utilizes JSON Web Tokens (JWTs), Higher-Order React Components (HOCs), and Express routing middlewares to do authentication.


Installation And Setup
---
*server installation:  from /authkeeper/server run `npm install`

**database setup:**  setup a mongodb database and connect to it with `mongoose.connect()` in the server's index.js file

**authentication setup:**

Create a secret signing key consisting of a random character string like so:

	module.exports = {
		secret: '<secret key string goes here>'
	};

Save that as config.js in the /server directory.  This key will be used to generate JWTs in /server/controllers/authentication.js and to validate them in /server/services/passport_strategies.js.
