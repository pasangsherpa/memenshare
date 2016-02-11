package models

import "gopkg.in/mgo.v2/bson"

type (
	Meme struct {
		Id     bson.ObjectId `json:"id" bson:"_id"`
		Title  string        `json:"title" bson:"title"`
		Author string        `json:"author" bson:"author"`
	}
)
