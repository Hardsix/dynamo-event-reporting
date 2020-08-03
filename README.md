To support plot functionality, install:

## For linux

This I have tested.

`apt-get install imagemagick librsvg2-dev librsvg2-bin`

Run dynamo, whether locally or remotely, just update env variables. 

## For MacOS

Should work but untested.

`brew install imagemagick librsvg`

Run dynamo, whether locally or remotely, just update env variables. 

`npm install`

`npm run start` or `npm run start-dev`

## For docker

Install Docker on Linux or Mac, run `docker-compose up` and enjoy. All should be available on `localhost:3000/statistics` by default.

## With regard to input file

400 MB is too big to be hosted on Github. Shortened file is commited into repo in docker/app/events-raw-dev-short.json. Replace manually with larger file if desired, and run `docker-compose up`. Have patience while the database is populated.
