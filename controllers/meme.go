package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pasangsherpa/memenshare/models"
	"github.com/shwoodard/jsonapi"
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

func (mc MemeController) GetMemes(c *gin.Context) {
	// stub meme collection
	var models []models.Meme

	// fetch meme collection
	if err := mc.collection.Find(nil).All(&models); err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}

	// data, _ := jsonapi.MarshalOne(models)

	c.JSON(http.StatusOK, models)
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
	model := models.Meme{}

	// fetch meme
	if err := mc.collection.FindId(bson.ObjectIdHex(id)).One(&model); err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}

	fmt.Printf("%+v\n", model)

	payload, err := jsonapi.MarshalOne(model)
	if err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}

	c.JSON(http.StatusOK, payload)
}
