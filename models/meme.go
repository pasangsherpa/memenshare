package models

import "github.com/pasangsherpa/memenshare/Godeps/_workspace/src/gopkg.in/mgo.v2/bson"

// type Meme struct {
// 	Id        bson.ObjectId     `json:"id" bson:"_id" jsonapi:"primary,memes"`
// 	Links     map[string]string `jsonapi:"links,top"`
// 	CreatedAt time.Time         `json:"createdAt" bson:"createdAt" jsonapi:"attr,createdAt"`
// 	UpdatedAt time.Time         `json:"updatedAt" bson:"updatedAt" jsonapi:"attr,updatedAt"`
// 	Title     string            `json:"title" jsonapi:"attr,title"`
// 	Author    string            `json:"author" jsonapi:"attr,author"`
// 	Tags      []string          `json:"tags" jsonapi:"attr,tags"`
// }

type Meme struct {
	ID bson.ObjectId `json:"-" bson:"_id"`
	// CreatedAt time.Time `json:"createdAt"`
	// UpdatedAt time.Time `json:"updatedAt"`
	Title  string `json:"title"`
	Author string `json:"author"`
	// Tags      []string  `json:"tags"`
}

// GetID to satisfy jsonapi.MarshalIdentifier interface
func (m Meme) GetID() string {
	return m.ID.Hex()
}

// SetID to satisfy jsonapi.UnmarshalIdentifier interface
func (m *Meme) SetID(id bson.ObjectId) error {
	m.ID = id
	return nil
}
