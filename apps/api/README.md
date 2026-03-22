# api

Demo API using express.

## requirements

* Node.js v22.x or higher

## install

```sh
npm i
```

## configure

Copy `_sample.env` as `.env` and edit.

## run

```sh
npm run build
# JS code
npm run start
# TS code
npm run start:ts
```

## usage

We are using OpenSanctions API as an example.

Search for a person:

```sh
curl --request POST \
  --url http://localhost:3000/open-sanctions/match \
  --header 'content-type: application/json' \
  --header 'x-correlation-id: b18cea4f-3b68-4b96-a28c-cc60a495b23f' \
  --data '{
  "queries": {
    "entity1": {
      "schema": "Person",
      "properties": {
        "name": [
          "Donald John Trump"
        ],
        "birthDate": [
          "1946-06-14"
        ],
        "nationality": [
          "us"
        ]
      }
    }
  }
}'
```

Search for a company:

```sh
curl --request POST \
  --url http://localhost:3000/open-sanctions/match \
  --header 'content-type: application/json' \
  --header 'x-correlation-id: b18cea4f-3b68-4b96-a28c-cc60a495b23f' \
  --data '{
  "queries": {
    "entity2": {
      "schema": "Company",
      "properties": {
        "name": [
          "Alphabet Inc."
        ],
        "jurisdiction": [
          "us"
        ]
      }
    }
  }
}'
```
