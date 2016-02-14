package models

import "github.com/pasangsherpa/memenshare/Godeps/_workspace/src/gopkg.in/mgo.v2/bson"

type Meme struct {
	Id     bson.ObjectId `json:"id" bson:"_id" jsonapi:"primary,memes"`
	Title  string        `json:"title" bson:"title" jsonapi:"attr,title"`
	Author string        `json:"author" bson:"author" jsonapi:"attr,author"`
	Tags   []string      `json:"tags" bson:"tags" jsonapi:"attr,tags"`
}
