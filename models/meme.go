package models

type Meme struct {
	Id     string   `json:"id" bson:"_id" jsonapi:"primary,memes"`
	Title  string   `json:"title" bson:"title" jsonapi:"attr,title"`
	Author string   `json:"author" bson:"author" jsonapi:"attr,author"`
	Tags   []string `json:"tags" bson:"tags" jsonapi:"attr,tags"`
}
