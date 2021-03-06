package controllers

import (
	"io/ioutil"
	"net/http"

	"github.com/pasangsherpa/memenshare/Godeps/_workspace/src/github.com/gin-gonic/gin"
	"github.com/pasangsherpa/memenshare/Godeps/_workspace/src/gopkg.in/mgo.v2"
	"github.com/pasangsherpa/memenshare/Godeps/_workspace/src/gopkg.in/mgo.v2/bson"
	"github.com/pasangsherpa/memenshare/models"
	"github.com/pasangsherpa/memenshare/utils"
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

func (mc *MemeController) GetMemes(c *gin.Context) {
	// stub meme collection
	var memes []models.Meme

	// fetch meme collection
	if err := mc.collection.Find(nil).All(&memes); err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}

	c.Writer.Header().Set("Content-Type", "application/vnd.api+json")
	if err := utils.MarshalAndWrite(c.Writer, memes); err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}
}

func (mc *MemeController) GetMeme(c *gin.Context) {
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
	meme := &models.Meme{}

	// fetch meme
	if err := mc.collection.FindId(bson.ObjectIdHex(id)).One(&meme); err != nil {
		c.JSON(http.StatusNotFound, err)
		return
	}

	c.Writer.Header().Set("Content-Type", "application/vnd.api+json")
	if err := utils.MarshalAndWrite(c.Writer, meme); err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}
}

func (mc *MemeController) CreateMeme(c *gin.Context) {
	// stub meme
	meme := &models.Meme{}

	var bodyBytes []byte
	if c.Request.Body != nil {
		bodyBytes, _ = ioutil.ReadAll(c.Request.Body)
	}

	if err := utils.Unmarshal(bodyBytes, meme); err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}

	if err := mc.collection.Insert(meme); err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}

	c.Writer.Header().Set("Location", "http://localhost:3000/api/memes/"+meme.GetID())
	c.Writer.WriteHeader(http.StatusCreated)
	if err := utils.MarshalAndWrite(c.Writer, meme); err != nil {
		return
	}
}
