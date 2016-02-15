package controllers

import (
	"net/http"

	"github.com/pasangsherpa/memenshare/Godeps/_workspace/src/github.com/gin-gonic/gin"
	"github.com/pasangsherpa/memenshare/Godeps/_workspace/src/github.com/shwoodard/jsonapi"
	"github.com/pasangsherpa/memenshare/Godeps/_workspace/src/gopkg.in/mgo.v2"
	"github.com/pasangsherpa/memenshare/Godeps/_workspace/src/gopkg.in/mgo.v2/bson"
	"github.com/pasangsherpa/memenshare/models"
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

	// fmt.Printf("Models %+v\n", models)

	c.Writer.Header().Set("Content-Type", "application/vnd.api+json")
	// if err := jsonapi.MarshalManyPayload(c.Writer, interfaceSlice); err != nil {
	// 	c.JSON(http.StatusInternalServerError, err)
	// 	return
	// }

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
	model := new(models.Meme)

	// fetch meme
	if err := mc.collection.FindId(bson.ObjectIdHex(id)).One(&model); err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}

	c.Writer.Header().Set("Content-Type", "application/vnd.api+json")
	if err := jsonapi.MarshalOnePayload(c.Writer, model); err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
}
