package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type Meme struct {
	Pid       string        `json:"-" jsonapi:"primary,memes"`
	Id        bson.ObjectId `json:"id" bson:"_id" jsonapi:"attr,id"`
	CreatedAt time.Time     `json:"createdAt" jsonapi:"attr,createdAt"`
	UpdatedAt time.Time     `json:"updatedAt" jsonapi:"attr,updatedAt"`
	Title     string        `json:"title" jsonapi:"attr,title"`
	Author    string        `json:"author" jsonapi:"attr,author"`
	Tags      []string      `json:"tags" jsonapi:"attr,tags"`
}
