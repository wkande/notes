# Notes

<img src="docs/assets/frog.png" alt="drawing" style="width:200px;margin-top:-80px;"/>


Welcome to **Notes**, a demonstration project created by Warren Anderson to implement [Docsify](https://docsify.js.org) and [GitBook](https://www.gitbook.com) using the **docs-as-code** philosophy. Sometimes referred to as docs-like-code.

The Node.js backend, Docsify documentation, GitBook documentation and Insomnia API Definitions file were created by Warren Anderson.

## API Reference Guide

The **API Reference Guide** for Notes is a set of markdown files rendered by Docisfy and Vue. You can find the source in this repo in the **docs** folder.

Visit the [API Reference Guide](https://wkande.github.io/notes/) hosted by the GitHub Pages site attached to this GitHub Repo.

## Development

The development environment has been configured (package.json) to use Nodemon to restart the server when a file changes. It also enables debug messages and sets the JWT SECRET environment variable.

```json
"scripts": {
  "start": "DEBUG=notes:* JWT_SECRET=jus6incas8de nodemon  node ./bin/www"
}
```

To start the server in development call the **npm start** script.

```bash
% npm start
```

## Production

There is a running instance of **Notes** on Heroku. If you use the Insomnia API Definition file it will run against teh Heroku backend. Since it is on a free instance of Heroku it may be idle. Any call to an API will wake it up. You may get a timeout message on your first call.

#### Heroku Setup

If you wish to setup your own instance of the Notes backend on Heroku.

1. Create a new **App** on Heroku.

1. Add one startup env variable for ***JWT_SECRET***.

1. Set the **Heroku App** startup to pull from the Notes master branch on GitHub or fork your own repo.


#### Redeploy

1. Be sure the latest Insomnia.json and Insomnia.josn.zip files are in GitHub.

1. Push the latest code to the GitHub development branch and merge to the master branch.

1. From the Herkou site pull the master branch. The server will restart.
