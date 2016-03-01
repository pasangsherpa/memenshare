package utils

import (
	"encoding/json"

	"github.com/manyminds/api2go/jsonapi"
	"github.com/pasangsherpa/memenshare/models"
)

func Marshal(in interface{}) (models.Response, error) {
	result := models.Response{}
	data, err := jsonapi.Marshal(in)

	if err != nil {
		return result, err
	}

	if err := json.Unmarshal(data, &result.Res); err != nil {
		return result, err
	}

	return result, nil
}
