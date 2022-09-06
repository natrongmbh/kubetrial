package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/natrongmbh/kubetrial/database"
	"github.com/natrongmbh/kubetrial/models"
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

	//parse body["helm_chart_patch_values"] as JSON
	var helmChartPatchValues []models.HelmChartPatchValue

	for _, v := range body["helm_chart_patch_values"].([]interface{}) {
		helmChartPatchValues = append(helmChartPatchValues, models.HelmChartPatchValue{
			Name:        v.(map[string]interface{})["name"].(string),
			ValueString: v.(map[string]interface{})["value_string"].(string),
		})
	}

	// parse request body
	app := models.App{
		Name:                        body["name"].(string),
		Description:                 body["description"].(string),
		HelmChartRepositoryUrl:      body["helm_chart_repository_url"].(string),
		HelmChartName:               body["helm_chart_name"].(string),
		HelmChartVersion:            body["helm_chart_version"].(string),
		DefaultHelmChartPatchValues: body["default_helm_chart_patch_values"].(string),
		HelmChartPatchValues:        helmChartPatchValues,
	}

	if err := database.DBConn.Create(&app).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error creating app",
		})
	}

	return c.JSON(app)
}

func GetApps(c *fiber.Ctx) error {

	user, err := CheckAuth(c)
	if user.ID == 0 || err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	// get apps with relatet helm chart patch values by AppID
	var apps []models.App
	if err := database.DBConn.Preload("HelmChartPatchValues").Find(&apps).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error getting apps",
		})
	}

	return c.JSON(apps)
}

func GetApp(c *fiber.Ctx) error {

	user, err := CheckAuth(c)
	if user.ID == 0 || err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	// get app with relatet helm chart patch values by AppID
	var app models.App
	if err := database.DBConn.Preload("HelmChartPatchValues").First(&app, c.Params("id")).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error getting app",
		})
	}

	return c.JSON(app)
}

func UpdateApp(c *fiber.Ctx) error {
	//TODO fix creating new helm chart patch values when updating app

	user, err := CheckAuth(c)
	if user.ID == 0 || err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	// get app with relatet helm chart patch values by AppID
	var app models.App
	if err := database.DBConn.Preload("HelmChartPatchValues").First(&app, c.Params("id")).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error getting app",
		})
	}
	// get request body as JSON
	var body fiber.Map
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}
	// parse request body
	app.Name = body["name"].(string)
	app.Description = body["description"].(string)
	app.HelmChartRepositoryUrl = body["helm_chart_repository_url"].(string)
	app.HelmChartName = body["helm_chart_name"].(string)
	app.HelmChartVersion = body["helm_chart_version"].(string)
	app.DefaultHelmChartPatchValues = body["default_helm_chart_patch_values"].(string)
	// parse body["helm_chart_patch_values"] as JSON
	var helmChartPatchValues []models.HelmChartPatchValue

	for _, v := range body["helm_chart_patch_values"].([]interface{}) {
		helmChartPatchValues = append(helmChartPatchValues, models.HelmChartPatchValue{
			Name:        v.(map[string]interface{})["name"].(string),
			ValueString: v.(map[string]interface{})["value_string"].(string),
		})
	}

	// clean up old helm chart patch values
	if err := database.DBConn.Model(&app).Association("HelmChartPatchValues").Clear(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error cleaning up old helm chart patch values",
		})
	}

	// delete all unused helm chart patch values
	if err := database.DBConn.Where("app_id = ?", app.ID).Delete(&models.HelmChartPatchValue{}).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error deleting unused helm chart patch values",
		})
	}

	// add new helm chart patch values
	if err := database.DBConn.Model(&app).Association("HelmChartPatchValues").Append(helmChartPatchValues); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error adding new helm chart patch values",
		})
	}

	// update app
	if err := database.DBConn.Save(&app).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating app",
		})
	}

	return c.JSON(app)
}

func DeleteApp(c *fiber.Ctx) error {

	user, err := CheckAuth(c)
	if user.ID == 0 || err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	// get app with relatet helm chart patch values by AppID
	var app models.App
	if err := database.DBConn.Preload("HelmChartPatchValues").First(&app, c.Params("id")).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error getting app",
		})
	}
	if err := database.DBConn.Delete(&app).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error deleting app",
		})
	}

	// delete related helm chart patch values
	if err := database.DBConn.Delete(&app.HelmChartPatchValues).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error deleting helm chart patch values",
		})
	}

	return c.JSON(fiber.Map{
		"message": "App deleted",
	})
}
