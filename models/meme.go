package models

import (
	"time"

	"github.com/pasangsherpa/memenshare/Godeps/_workspace/src/gopkg.in/mgo.v2/bson"
)

type Meme struct {
	Id        bson.ObjectId `json:"id" bson:"_id" jsonapi:"primary,memes"`
	CreatedAt time.Time     `json:"createdAt" bson:"createdAt" jsonapi:"attr,createdAt"`
	UpdatedAt time.Time     `json:"updatedAt" bson:"updatedAt" jsonapi:"attr,updatedAt"`
	Title     string        `json:"title" jsonapi:"attr,title"`
	Author    string        `json:"author" jsonapi:"attr,author"`
	Tags      []string      `json:"tags" jsonapi:"attr,tags"`
}
