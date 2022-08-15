package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/natrongmbh/kubetrial/k8s"
	"github.com/natrongmbh/kubetrial/util"
)

func GetClusterInfo(c *fiber.Ctx) error {

	util.InfoLogger.Printf("%s %s %s", c.IP(), c.Method(), c.Path())

	user, err := CheckAuth(c)
	if user.ID == 0 || err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	clusterApi, err := k8s.GetClusterApi()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Error getting cluster name",
		})
	}

	clusterVersion, err := k8s.GetClusterVersion()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Error getting cluster version",
		})
	}

	return c.JSON(fiber.Map{
		"clusterApi":     clusterApi,
		"clusterVersion": clusterVersion,
	})
}
