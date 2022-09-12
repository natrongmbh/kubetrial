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

KubeTrial is a simple web application to create and manage trial deployments of your application.  
It is mandatory to have a Helm chart for your applications to use KubeTrial.  
You can define which Helm chart values should be editable by the `sales` user.  
The `sales` user can create a trial deployment of your application and share the link with the customer.  
While creating an application you can upload a default `values.yaml` file which overwrites some default values of your Helm chart.  
Each trial deployment is created in a separate namespace with the prefix `kubetrial-`.  
The `sales` user can delete the trial deployment at any time.  

### Open Source

Trust me, I'm open source.  
You can find the source code on [Github](https://github.com/natrongmbh/kubetrial).  
The frontend is written in Next.js and the backend in GoLang.  
License: GPL 3

<h2></h2>
<p>&nbsp;</p>

## Setup

You can deploy kubetrial in your Kubernetes cluster, but you have to set all the env variables.

- [kubernetes-example](/kubernetes/)


### Environment Variables

#### Frontend

- `NEXT_API_URI` (required): The URI of the backend API.  
  Default: *none*


#### Backend

- `CORS` (optional): Set CORS headers for the API.  
  Default: `*`
- `JWT_SECRET_KEY` (optional): Set the JWT secret key.
- `ADMIN_PASSWORD` (optional): Set the admin password.  
  Default: `admin`
- `DB_USERNAME` (optional): Set the database username.  
  Default: `postgres`
- `DB_PASSWORD` (optional): Set the database password.  
  Default: `postgres`
- `DB_NAME` (optional): Set the database name.  
  Default: `postgres`
- `DB_HOST` (optional): Set the database host.  
  Default: `localhost`
- `DB_PORT` (optional): Set the database port.  
  Default: `5432`