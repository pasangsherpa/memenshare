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
	var memes []models.Meme

	// fetch meme collection
	if err := mc.collection.Find(nil).All(&memes); err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}

	memeInterface := make([]interface{}, len(memes))

	for i, meme := range memes {
		// set primary id value to use bson id
		meme.Id = meme.Bid.Hex()
		memeInterface[i] = meme
	}

	// fmt.Printf("Models %+v\n", memes)

	c.Writer.Header().Set("Content-Type", "application/vnd.api+json")
	// if err := jsonapi.MarshalManyPayload(c.Writer, memeInterface); err != nil {
	// 	c.JSON(http.StatusInternalServerError, err)
	// 	return
	// }

	c.JSON(http.StatusOK, memeInterface)
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
	meme := new(models.Meme)

	// fetch meme
	if err := mc.collection.FindId(bson.ObjectIdHex(id)).One(&meme); err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}

	// set primary id value to use bson id
	meme.Id = meme.Bid.Hex()

	c.Writer.Header().Set("Content-Type", "application/vnd.api+json")
	if err := jsonapi.MarshalOnePayload(c.Writer, meme); err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
}
