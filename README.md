#To support plot functionality, install:

## For linux

This I have tested.

`apt-get install imagemagick librsvg2-dev librsvg2-bin`

## For MacOS

Should work but untested.

`brew install imagemagick librsvg`

## For docker

Install Docker on Linux or Mac, run `docker-compose up` and enjoy

## With regard to input file

400 MB is too big to be hosted on Github. Shortened file is commited into repo in docker/app/events-raw-dev-short.json. Replace manually with larger file if desired, and run `docker-compose up`. Have patience while the database is populated.
