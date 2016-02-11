package utils

import "gopkg.in/mgo.v2"

func DB(url, db string) *mgo.Database {
	session, err := mgo.Dial(url)

	if err != nil {
		panic(err)
	}

	return session.DB(db)
}
