package utils

import (
	"encoding/json"
	"io"

	"github.com/manyminds/api2go/jsonapi"
	"github.com/pasangsherpa/memenshare/models"
)

func Marshal(in interface{}) (*models.Response, error) {
	result := &models.Response{}
	data, err := jsonapi.MarshalWithURLs(in, &ServerInfo{})

	if err != nil {
		return result, err
	}

	if err := json.Unmarshal(data, &result.Res); err != nil {
		return result, err
	}

	return result, nil
}

func MarshalAndWrite(w io.Writer, in interface{}) error {
	result, err := Marshal(in)

	if err != nil {
		return err
	}

	if err := json.NewEncoder(w).Encode(&result.Res); err != nil {
		return err
	}

	return nil
}
