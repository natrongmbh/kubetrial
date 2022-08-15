package controllers

import (
	"github.com/gofiber/fiber/v2"
)

func CreateApp(c *fiber.Ctx) error {

	user, err := CheckAuth(c)
	if user.ID == 0 || err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	// Get request body as JSON
	var body fiber.Map
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Hello World",
	})
}
