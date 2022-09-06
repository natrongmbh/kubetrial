package util

import (
	"errors"
	"math/rand"

	"golang.org/x/crypto/bcrypt"

	"github.com/natrongmbh/kubetrial/database"
	"github.com/natrongmbh/kubetrial/models"
)

var (
	letters        = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	JWT_SECRET_KEY string
)

func GetUserByID(id uint) (models.User, error) {
	user := models.User{}

	err := database.DBConn.Where("id = ?", id).First(&user).Error
	if err != nil {
		return models.User{}, err
	}
	return user, nil
}

func GetUserByUsername(username string) (models.User, error) {

	user := models.User{}

	err := database.DBConn.Where("username = ?", username).First(&user).Error
	if err != nil {
		return models.User{}, err
	}
	return user, nil
}

func CheckPasswordOfUser(password string, userId uint) error {

	user, err := GetUserByID(userId)
	if err != nil {
		return err
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return errors.New("Invalid credentials")
	}
	return nil
}

func CreateUser(user models.User) error {

	if _, err := GetUserByUsername(user.Username); err != nil {

		// if not, create user
		password, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		tempUser := models.User{
			Username: user.Username,
			Password: string(password),
			Name:     user.Name,
		}
		if err = database.DBConn.Create(&tempUser).Error; err != nil {
			return err
		}

		InfoLogger.Printf("Created user: %s", tempUser.Username)
		return nil
	} else {
		return errors.New("User already exists")
	}
}

func UpdateUser(user models.User) error {

	password, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	tempUser := models.User{
		Username: user.Username,
		Password: string(password),
		Name:     user.Name,
	}

	var currentUser models.User
	err = database.DBConn.Where("username = ?", user.Username).First(&currentUser).Error
	if err != nil {
		return err
	}
	tempUser.ID = currentUser.ID
	if err = database.DBConn.Save(&tempUser).Error; err != nil {
		return err
	}

	return nil
}

// RandomStringBytes returns a random string of length n
func RandomStringBytes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}
