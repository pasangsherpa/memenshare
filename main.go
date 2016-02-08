package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

/**
 * Handler to handle request to index route
 */
func index(c *gin.Context) {
	c.String(http.StatusOK, "Welcome")
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

	// Creates a gin router with logger and
	// recovery (crash-free) middlewares
	app := gin.Default()

	app.GET("/", index)
	app.GET("/ping", pong)

	// Start listening in given port
	app.Run(":" + os.Getenv("PORT"))
}
