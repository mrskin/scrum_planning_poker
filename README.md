# Simple Pointing Poker

Realtime Pointing Poker.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone
$ cd sk_pointing_poker
$ npm install
$ gem install foreman
$ foreman start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).


## Running tests

```sh
$ npm run test
```

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
