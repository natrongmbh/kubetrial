package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `json:"username"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Group    string `json:"group"`
}

// enum Group
const (
	Admin    = "admin"
	Sales    = "sales"
	Customer = "customer"
)
