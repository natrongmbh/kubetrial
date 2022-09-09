package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/natrongmbh/kubetrial/k8s"
)

func GetClusterInfo(c *fiber.Ctx) error {

	user, err := CheckAuth(c)
	if user.ID == 0 || err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	totalTrialNamespaces, err := k8s.GetTotalNamespacesByPrefix("kubetrial-")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error getting namespaces",
		})
	}

	totalTrialPods, err := k8s.GetPodsByPrefixNamespace("kubetrial-")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error getting pods",
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
		"Kubernetes Cluster Version": clusterVersion,
		"Total Trial Namespaces":     totalTrialNamespaces,
		"Total Trial Pods":           totalTrialPods,
	})
}
