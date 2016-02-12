package controllers

import (
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

func (mc MemeController) GetMemes() (*models.Meme, error) {
	result := models.Meme{}
	err := mc.collection.Find(bson.M{}).One(&result)

	if err != nil {
		return nil, err
	}

	return result, nil
}
