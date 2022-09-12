package controllers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/natrongmbh/kubetrial/database"
	"github.com/natrongmbh/kubetrial/k8s"
	"github.com/natrongmbh/kubetrial/models"
	"github.com/natrongmbh/kubetrial/util"
)

type Stats struct {
	TotalAppCount               int    `json:"total_app_count"`
	AppCountLast30Days          int    `json:"app_count_last_30_days"`
	DeletedAppCountLast30Days   int    `json:"deleted_app_count_last_30_days"`
	TotalTrialCount             int    `json:"total_trial_count"`
	TrialCountLast30Days        int    `json:"trial_count_last_30_days"`
	DeletedTrialCountLast30Days int    `json:"deleted_trial_count_last_30_days"`
	TrialNamespaces             int    `json:"trial_namespaces"`
	TrialPods                   int    `json:"trial_pods"`
	ClusterVersion              string `json:"cluster_version"`
}

func GetStats(c *fiber.Ctx) error {

	//  Get all apps from the database created in the last 30 days
	apps := []models.App{}
	appsDeleted := []models.App{}
	timeLast30Days := time.Now().Add(-30 * 24 * time.Hour)
	// get every app created in the last 30 days even if it is deleted
	database.DBConn.Where("created_at > ?", timeLast30Days).Find(&apps)
	database.DBConn.Unscoped().Where("deleted_at > ?", timeLast30Days).Find(&appsDeleted)

	totalApps := []models.App{}
	database.DBConn.Find(&totalApps)

	//  Get all trials from the database created in the last 30 days
	trials := []models.Trial{}
	trialsDeleted := []models.Trial{}
	database.DBConn.Where("created_at > ?", timeLast30Days).Find(&trials)
	database.DBConn.Unscoped().Where("deleted_at > ?", timeLast30Days).Find(&trialsDeleted)

	util.InfoLogger.Println("trials", len(trials))
	util.InfoLogger.Println("trialsDeleted", len(trialsDeleted))

	totalTrials := []models.Trial{}
	database.DBConn.Find(&totalTrials)

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

	stats := Stats{
		TotalAppCount:               len(totalApps),
		AppCountLast30Days:          len(apps) + len(appsDeleted),
		DeletedAppCountLast30Days:   len(appsDeleted),
		TotalTrialCount:             len(totalTrials) + len(trialsDeleted),
		TrialCountLast30Days:        len(trials),
		DeletedTrialCountLast30Days: len(trialsDeleted),
		TrialNamespaces:             totalTrialNamespaces,
		TrialPods:                   totalTrialPods,
		ClusterVersion:              clusterVersion,
	}

	return c.JSON(stats)
}
