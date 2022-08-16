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
	timeLast30Days := time.Now().Add(-30 * 24 * time.Hour)
	database.DBConn.Where("created_at > ?", timeLast30Days).Find(&apps)
	totalApps := []models.App{}
	database.DBConn.Find(&totalApps)

	stats := Stats{
		TotalAppCount:        len(totalApps),
		AppCountLast30Days:   len(apps),
		TotalTrialCount:      20,
		TrialCountLast30Days: 10,
	}

	return c.JSON(stats)
}
