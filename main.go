package main

import (
	"net/http"
	"os"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

	"github.com/gin-gonic/gin"
	"github.com/pasangsherpa/memenshare/models"
	"github.com/pasangsherpa/memenshare/utils"
)

var db *mgo.Database

/**
 * Handler to handle request to index route
 */
func index(c *gin.Context) {

	result := models.Meme{}
	err := db.C("memes").Find(bson.M{}).One(&result)
	if err != nil {
		panic(err)
	}

	c.String(http.StatusOK, "Welcome: "+result.Author)
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

	db = utils.DB("localhost:27017", "memenshare")

	// Creates a gin router with logger and
	// recovery (crash-free) middlewares
	app := gin.Default()

	app.GET("/", index)
	app.GET("/ping", pong)

	// Start listening in given port
	app.Run(":" + os.Getenv("PORT"))
}
