package utils

type ServerInfo struct{}

const baseURL = "http://localhost:3000"
const prefix = ""

func (i ServerInfo) GetBaseURL() string {
	return baseURL
}

func (i ServerInfo) GetPrefix() string {
	return prefix
}
