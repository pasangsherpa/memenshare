package controllers

import "gopkg.in/mgo.v2"

type (
	MemeController struct {
		database *mgo.Database
	}
)

// NewMemeController provides a reference to a MemeController
// with provided mongo database
func NewMemeController(d *mgo.Database) *MemeController {
	return &MemeController{d}
}
