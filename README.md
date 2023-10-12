# Permission Manager

Permission Manager app for take-home interview.

## Instalation

To install all dependencies run `yarn install` inside .`/permission-mngr-client` and `./permission-mngr-server` folders respectively.

Add a .env file at the root of the `./permission-mngr-server` folder with the following line (alternately, check if it exists already as I removed .env from the .gitignore for easier replication).
`DATABASE_URL="postgresql://postgres:root@localhost:5432/template_manager?schema=public"`

In Postgres, we need a DB named `template_manager` as per the config above.

## Running

To run both client and server, from inside `./permission-mngr-server` you can run `yarn start` since scripts were set up in `package.json` to run those in parallel

## Ports

Client will run on `:3000` and server will run on `:4000`

## Hardcoded data

Run `yarn prisma db seed` to add the initial hardcoded data
