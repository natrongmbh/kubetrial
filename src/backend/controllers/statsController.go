package controllers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/natrongmbh/kubetrial/database"
	"github.com/natrongmbh/kubetrial/models"
)

type Stats struct {
	TotalAppCount        int `json:"total_app_count"`
	AppCountLast30Days   int `json:"app_count_last_30_days"`
	TotalTrialCount      int `json:"total_trial_count"`
	TrialCountLast30Days int `json:"trial_count_last_30_days"`
}

func GetStats(c *fiber.Ctx) error {

	//  Get all apps from the database created in the last 30 days
	apps := []models.App{}
	appsDeleted := []models.App{}
	timeLast30Days := time.Now().Add(-30 * 24 * time.Hour)
	database.DBConn.Where("created_at > ?", timeLast30Days).Find(&apps)
	database.DBConn.Where("deleted_at > ?", timeLast30Days).Find(&appsDeleted)

	totalApps := []models.App{}
	database.DBConn.Find(&totalApps)

	//  Get all trials from the database created in the last 30 days
	trials := []models.Trial{}
	trialsDeleted := []models.Trial{}
	database.DBConn.Where("created_at > ?", timeLast30Days).Find(&trials)
	database.DBConn.Where("deleted_at > ?", timeLast30Days).Find(&trialsDeleted)

	totalTrials := []models.Trial{}
	database.DBConn.Find(&totalTrials)

	stats := Stats{
		TotalAppCount:        len(totalApps),
		AppCountLast30Days:   len(apps) - len(appsDeleted),
		TotalTrialCount:      len(totalTrials),
		TrialCountLast30Days: len(trials) - len(trialsDeleted),
	}

	return c.JSON(stats)
}
