package models

import "gopkg.in/mgo.v2/bson"

type (
	Meme struct {
		Id     bson.ObjectId `jsonapi:"primary,memes"`
		Title  string        `jsonapi:"attr,title"`
		Author string        `jsonapi:"attr,author"`
		Tags   []string      `jsonapi:"attr,tags"`
	}
)
