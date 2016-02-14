package utils

import "github.com/pasangsherpa/memenshare/Godeps/_workspace/src/gopkg.in/mgo.v2"

func DB(url, db string) (*mgo.Database, error) {
	session, err := mgo.Dial(url)

	if err != nil {
		return nil, err
	}

	return session.DB(db), nil
}
