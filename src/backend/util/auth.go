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

func GetUserByID(id int) (models.User, error) {
	user := models.User{}

	err := database.DBConn.First(&user, id).Error
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

func CheckPasswordOfUser(password string, userId int) error {

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

	if validatedUser, err := GetUserByID(user.ID); err != nil {
		// if not, create user
		password, err := bcrypt.GenerateFromPassword([]byte(validatedUser.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		tempUser := models.User{
			Username:   validatedUser.Username,
			Password:   string(password),
			Name:       validatedUser.Name,
			Avatar_URL: validatedUser.Avatar_URL,
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
		ID:         user.ID,
		Username:   user.Username,
		Password:   string(password),
		Name:       user.Name,
		Avatar_URL: user.Avatar_URL,
	}

	if err := database.DBConn.Save(&tempUser).Error; err != nil {
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
