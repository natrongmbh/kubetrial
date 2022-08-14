package database

import (
	"github.com/natrongmbh/kubetrial/models"
	"gorm.io/driver/postgres"
	_ "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DBConn      *gorm.DB
	DB_USERNAME string
	DB_PASSWORD string
	DB_HOST     string
	DB_PORT     string
	DB_NAME     string
)

func InitDB() error {
	var err error

	dbUri := "host=" + DB_HOST + " port=" + DB_PORT + " user=" + DB_USERNAME + " dbname=" + DB_NAME + " password=" + DB_PASSWORD + " sslmode=disable"
	DBConn, err = gorm.Open(postgres.Open(dbUri), &gorm.Config{})
	if err != nil {
		return err
	}

	// migrate the schema
	DBConn.AutoMigrate(&models.User{})
	return nil
}
