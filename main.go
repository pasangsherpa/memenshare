package main

import (
	"net/http"
	"os"

	"github.com/pasangsherpa/memenshare/Godeps/_workspace/src/github.com/gin-gonic/gin"
	"github.com/pasangsherpa/memenshare/controllers"
	"github.com/pasangsherpa/memenshare/utils"
)

/**
 * Handler to handle request to index route
 */
func index(c *gin.Context) {
	c.String(http.StatusOK, "Welcome: ")
}

/**
 * Handler to handle service healthcheck
 */
func pong(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

/**
 * Main function
 */
func main() {

	db, err := utils.DB("localhost:27017", "memenshare")

	if err != nil {
		panic(err)
	}

	// Get a MemeController instance
	mc := controllers.NewMemeController(db.C("memes"))

	// Creates a gin router with logger and
	// recovery (crash-free) middlewares
	app := gin.Default()

	app.GET("/", index)
	app.GET("/ping", pong)
	app.GET("/memes/", mc.GetMemes)
	app.GET("/memes/:id", mc.GetMeme)

	// Start listening in given port
	app.Run(":" + os.Getenv("PORT"))
}
