# cookbook
[![Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&maxAge=2592000)](http://twitter.com/SJOrrillo)

This application uses React, Redux, React Router and a variety of other helpful libraries.
The purpose of this application is for training and learn how to use good practises and useful tools.

![Demo][DEMO]

[DEMO]:https://github.com/sjorrillo/cookbook/blob/master/cookbook.png

## Installation

After cloning the repository it should be enough to `npm install` all the dependencies and then proceed to the **Development** step.

```bash
npm install
```

## Development

Running `npm start -s` will start both the **server-side NodeJS Express application** as well as the **React Application** that will be watching the source files and when those change it will push incremental updates to the browser.

Note: changing any React component should work with hot-reloading. Changing server-side files like controllers (API handlers) could require a restart of the NodeJS server.

```bash
npm start -s
```

### Containers

Be sure you have installed the [docker tools](https://www.docker.com/products/docker-toolbox)

To start **cookbook_postgres**

```bash
docker-compose up
```

If you have **pgAdmin** installed, you can connect to the postgres docker container using the following credentials:

```json
connection: {
            user: 'postgres',
            database: 'cookbook',
            port: 1433,
            host: 'localhost',
            password: 'Houston'
        },
```

Or via **psql**

```bash
docker run -it --rm --net cookbook_default --link cookbook_postgres:postgres postgres:9.5.2 psql -h postgres -U postgres
```

and then execute the next steps:

```bash
#First create the cookbook database.
CREATE DATABASE Cookbook;

#Then execute the **data/init/init-schema.sql** file inside the cookbook database.

#To finish execute the **data/init/init-data.sql** file to add some initial data.
```