package main

import (
	"os"

	"github.com/pasangsherpa/memenshare/api"
	_ "github.com/pasangsherpa/memenshare/api/v1/status"
)

func main() {
	app := api.New()
	app.Router.Run(":" + os.Getenv("PORT"))
}
