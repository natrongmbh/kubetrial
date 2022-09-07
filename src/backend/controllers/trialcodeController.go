package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/natrongmbh/kubetrial/database"
	"github.com/natrongmbh/kubetrial/models"
	"github.com/natrongmbh/kubetrial/util"
)

func CreateTrialCode(c *fiber.Ctx) error {
	// only a user with admin group can create a new trial code
	user, err := CheckAuth(c)
	if err != nil {
		return err
	}
	if user.Group != models.Admin && user.Group != models.Sales {
		return fiber.NewError(fiber.StatusUnauthorized, "Unauthorized")
	}

	// Get app id from url params
	appID := c.Params("id")
	if appID == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid app id")
	}

	// Get app from database
	var app models.App
	if err := database.DBConn.First(&app, appID).Error; err != nil {
		return fiber.NewError(fiber.StatusNotFound, "App not found")
	}

	// Get request body as JSON
	var body fiber.Map
	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	// parse request body
	trialCode := models.TrialCode{
		AppID: app.ID,
		Code:  GenerateTrialCode(app),
		User:  user,
	}

	// create trial code
	if err := database.DBConn.Create(&trialCode).Error; err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Error creating trial code")
	}

	return c.JSON(trialCode)
}

func GenerateTrialCode(app models.App) string {
	return app.Name + "-" + util.RandomStringBytes(8)
}
