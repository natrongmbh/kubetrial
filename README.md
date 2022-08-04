<p align="center">
    <a href="https://natron.io/">
        <img height="120px" src="assets/kubetrial_logo_color.png" />
    </a>
    <h1 align="center">
        KubeTrial
    </h1>
</p>

<p align="center">
  <strong>
    A <br />
    <a href="https://github.com/natrongmbh/kubetrial">Web Application</a>
    <br />
    where you can easily deploy test instaces of your workload application for sales purposes.
  </strong>
</p>

<p align="center">
  <a href="https://github.com/natrongmbh/kubetrial/issues"><img
    src="https://img.shields.io/github/issues/natrongmbh/kubetrial"
    alt="Build"
  /></a>
  <a href="https://github.com/sponsors/janlauber"><img
    src="https://img.shields.io/github/sponsors/janlauber" 
    alt="Sponsors"
  /></a>
  <a href="https://github.com/natrongmbh/kubetrial"><img 
    src="https://img.shields.io/github/license/natrongmbh/kubetrial" 
    alt="License"
  /></a>
  <a href="https://www.codefactor.io/repository/github/natrongmbh/kubetrial"><img 
    src="https://www.codefactor.io/repository/github/natrongmbh/kubetrial/badge" 
    alt="CodeFactor" 
  /></a>
</p>

<p align="center">
  kubetrial allowes you to create and manage trial deployments of your application.
</p>

<p align="center">
  <em>
    Check out the company behind kubetrial – 
    <a
      href="https://natron.io/"
    >https://natron.io</a>
  </em>
</p>

<h2></h2>
<p>&nbsp;</p>

## Everything you would expect

### It's a simple web app

*tbd.*

### It's free

Everything is free.  
If you want to support us, you can buy us a beer with a Github Sponsorship or contribute some code.

### Open Source

Trust me, I'm open source.  
You can find the source code on [Github](https://github.com/natrongmbh/kubetrial).  
The frontend is written in Next.js and the backend in GoLang.  
License: Apache 2.0

<h2></h2>
<p>&nbsp;</p>

## Setup

You can deploy kubetrial in your Kubernetes cluster, but you have to set all the env variables.

- [kubernetes-example](/kubernetes/)


### Environment Variables

#### Frontend

- `ENV_GITHUB_CLIENT_ID` (required): Set the GitHub client ID.
- `ENV_GITHUB_REDIRECT_URI` (required): Set the GitHub redirect URI. (e.g. `https://<url-from-frontend>`)
- `ENV_GITHUB_OAUTH_URI` (required): Set the GitHub OAuth URI. (e.g. `https://<url-from-backend>/api/auth/github`)

#### Backend

- `CORS` (optional): Set CORS headers for the API.  
  Default: `*`
- `JWT_SECRET_KEY` (optional): Set the JWT secret key.  
  Default: random string of 32 characters.
- `GITHUB_CALLBACK_URL` (optional): Set the callback URL for the GitHub OAuth.  
  Default: `http://localhost:8000/auth/github/callback`
- `GITHUB_CLIENT_ID` (required): Set the GitHub client ID.
- `GITHUB_CLIENT_SECRET` (required): Set the GitHub client secret.
- `GITHUB_ORGANIZATION` (required): Set the GitHub organization.