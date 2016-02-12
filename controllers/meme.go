package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pasangsherpa/memenshare/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type (
	MemeController struct {
		collection *mgo.Collection
	}
)

// NewMemeController provides a reference to a MemeController
// with provided mongo collection
func NewMemeController(c *mgo.Collection) *MemeController {
	return &MemeController{c}
}

func (mc MemeController) GetMeme(c *gin.Context) {

	// grab id from url param
	id := c.Params.ByName("id")

	// verify id is ObjectId, otherwise bail
	if !bson.IsObjectIdHex(id) {
		c.JSON(http.StatusNotFound, gin.H{
			"code":    "INVALID_ID",
			"message": "Invalid id",
		})
		return
	}

	// stub meme
	result := models.Meme{}

	// fetch meme
	if err := mc.collection.Find(bson.M{}).One(&result); err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}

	// marshal provided interface into JSON structure
	json, _ := json.Marshal(result)

	c.JSON(http.StatusOK, gin.H{
		"data": json,
	})
}
