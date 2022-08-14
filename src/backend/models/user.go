package models

type User struct {
	ID         int    `json:"id"`
	Username   string `json:"username"`
	Name       string `json:"name"`
	Password   string `json:"password"`
	Avatar_URL string `json:"avatar_url"`
}
