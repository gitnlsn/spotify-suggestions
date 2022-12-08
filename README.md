[![Discord Community](https://dcbadge.vercel.app/api/server/zmrheT9Kdu)](https://discord.gg/zmrheT9Kdu)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8a7bee68-2cd9-478e-beea-c61216fc25c7/deploy-status)](https://app.netlify.com/sites/regal-pavlova-66863a/deploys)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/gitnlsn/spotify-suggestions/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/gitnlsn/spotify-suggestions/tree/main)
[![codecov](https://codecov.io/gh/gitnlsn/spotify-suggestions/branch/main/graph/badge.svg?token=MgmICeGr3x)](https://codecov.io/gh/gitnlsn/spotify-suggestions)

# Description

This project is a front-end app that consumes [spotify api](https://developer.spotify.com/documentation). The idea is to create a new experience with Spotify, providing more features, automation and discovery.

# Running the app

To configure this project, install the dependencies:

```bash
$ npm install
```

Then add `.env` file following `.env.example.`

The `client_id` and `client_secret` must be generated in [spotify dashboard](https://developer.spotify.com/dashboard/login).

And `AUTH2_REDIRECT_URL` should be set to the home page of the app.

Once it's all done, run:

```bash
$ npm start
```

# Testing

Tests are run with `jest`.

```bash
$ npm run test
```

Currently unit tests and tests that make api calls are run together.

# Storybook

This project has a storybook.

```bash
$ npm run storybook
```

# Contributions

## New features

If you have good ideas you'd like to see implemented, you can open an [issue](https://github.com/gitnlsn/spotify-suggestions/issues) describing how the feature works and why the feature is needed.

If you want to submit code to the application, you can just open a [pull request](https://github.com/gitnlsn/spotify-suggestions/pulls). The code can be reviewed by anybody involved with the project. But consider adding a good code coverage with unit tests and adding stories to Storybook.

## Testing and Notifying bugs

If you've visited the web app and think things are not working as expected, you can notify and open an [issue](https://github.com/gitnlsn/spotify-suggestions/issues).
