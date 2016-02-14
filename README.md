# memenshare
App to create and share meme

## Dependencies
* [Godep](https://github.com/tools/godep)
* [Gin](https://github.com/codegangsta/gin)

## Install
```sh
$ go get -u github.com/pasangsherpa/memenshare
```

## Run
```sh
$ gin -g run
```

## Install/update application dependencies
```sh
$ godep save -r ./...
```

## REST API

REST API is available on "/" using:

* GET method
* POST method with `Content-Type`:
    * *application/json*
    * *application/x-www-form-urlencoded*
