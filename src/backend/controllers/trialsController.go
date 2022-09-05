package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/natrongmbh/kubetrial/database"
	"github.com/natrongmbh/kubetrial/helm"
	"github.com/natrongmbh/kubetrial/k8s"
	"github.com/natrongmbh/kubetrial/models"
)

func CreateTrial(c *fiber.Ctx) error {

	// user, err := CheckAuth(c)
	// if user.ID == 0 || err != nil {
	// 	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
	// 		"message": "Unauthorized",
	// 	})
	// }

	// get request body as JSON
	var body fiber.Map
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	trialPatchValues := []models.TrialPatchValue{}

	for _, v := range body["trial_patch_values"].([]interface{}) {
		trialPatchValues = append(trialPatchValues, models.TrialPatchValue{
			Value:                 v.(map[string]interface{})["value"].(string),
			HelmChartPatchValueID: uint(v.(map[string]interface{})["helm_chart_patch_value_id"].(float64)),
		})
	}

	trial := models.Trial{
		Name:             body["name"].(string),
		Description:      body["description"].(string),
		AppID:            uint(body["app_id"].(float64)),
		BgColor:          body["bg_color"].(string),
		TrialPatchValues: trialPatchValues,
	}

	// get app from database
	app := models.App{}
	if err := database.DBConn.First(&app, trial.AppID).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error getting app",
		})
	}

	// for each trial patch value get helm patch value from database with helm_chart_patch_value_id
	helmChartPatchValues := []models.HelmChartPatchValue{}
	for _, v := range trial.TrialPatchValues {
		helmChartPatchValue := models.HelmChartPatchValue{}
		if err := database.DBConn.First(&helmChartPatchValue, v.HelmChartPatchValueID).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error getting helm chart patch value",
			})
		}
		helmChartPatchValues = append(helmChartPatchValues, helmChartPatchValue)
	}

	// create helm client
	helmClient, err := helm.CreateHelmClient(helm.GetNamespaceName(trial.Name))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error creating helm client",
		})
	}

	// create helm repository
	if err := helm.AddHelmRepositoryToClient(helmClient, app.Name, app.HelmChartRepositoryUrl); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error adding helm repository",
		})
	}

	trialValues := helm.ValuesYamlParser(trialPatchValues, helmChartPatchValues)

	mergedValues, err := helm.MergeDefaultYamlWithTrialYaml(app.DefaultHelmChartPatchValues, trialValues)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error merging default values with trial values",
		})
	}

	// create helm release
	release, err := helm.CreateOrUpdateHelmRelease(
		helmClient,
		app.Name+"/"+app.HelmChartName,
		app.HelmChartName,
		helm.GetNamespaceName(trial.Name),
		app.HelmChartVersion,
		mergedValues,
	)

	if err != nil && release == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error creating helm release",
			"error":   err.Error(),
		})
	}

	// check if trial already exists in database and update it
	if err := database.DBConn.Where("name = ?", trial.Name).First(&trial).Error; err == nil {
		// delete trial patch values
		if err := database.DBConn.Where("trial_id = ?", trial.ID).Delete(&models.TrialPatchValue{}).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error deleting trial patch values",
			})
		}

		// update trial
		if err := database.DBConn.Model(&trial).Updates(trial).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error updating trial",
			})
		}
	} else {
		// create trial
		if err := database.DBConn.Create(&trial).Error; err != nil {
			// delete helm release
			// if err := helm.DeleteHelmRelease(*helmClient, app.HelmChartName, helm.GetNamespaceName(trial.Name)); err != nil {
			// 	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			// 		"message": "Error deleting helm release",
			// 	})
			// }
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error creating trial",
				"error":   err.Error(),
			})
		}
	}

	return c.Status(fiber.StatusCreated).JSON(release)
}

func GetTrials(c *fiber.Ctx) error {

	// user, err := CheckAuth(c)
	// if user.ID == 0 || err != nil {
	// 	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
	// 		"message": "Unauthorized",
	// 	})
	// }

	// get trials from database with app and trial patch values
	trials := []models.Trial{}
	if err := database.DBConn.Preload("App").Preload("TrialPatchValues").Find(&trials).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error getting trials",
		})
	}

	// get the release status for each trial
	for i, trial := range trials {
		// create helm client
		helmClient, err := helm.CreateHelmClient(helm.GetNamespaceName(trial.Name))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error creating helm client",
			})
		}

		// get helm release
		release, err := helm.GetHelmRelease(helmClient, trial.App.HelmChartName)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error getting helm release",
			})
		}

		trials[i].Status = release.Info.Status.String()
	}

	// sort trials by app
	trialsByApp := map[string][]models.Trial{}
	for _, trial := range trials {
		trialsByApp[trial.App.Name] = append(trialsByApp[trial.App.Name], trial)
	}

	return c.Status(fiber.StatusOK).JSON(trials)
}

func GetTrial(c *fiber.Ctx) error {
	return c.Status(fiber.StatusNotImplemented).JSON(fiber.Map{
		"message": "Not implemented",
	})
}

func UpdateTrial(c *fiber.Ctx) error {
	return c.Status(fiber.StatusNotImplemented).JSON(fiber.Map{
		"message": "Not implemented",
	})
}

func DeleteTrial(c *fiber.Ctx) error {
	// user, err := CheckAuth(c)
	// if user.ID == 0 || err != nil {
	// 	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
	// 		"message": "Unauthorized",
	// 	})
	// }

	// delete trial and trial patch values from database
	trial := models.Trial{}
	// by id
	if err := database.DBConn.Where("id = ?", c.Params("id")).First(&trial).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error getting trial",
		})
	}

	if err := database.DBConn.Where("trial_id = ?", trial.ID).Delete(&models.TrialPatchValue{}).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error deleting trial patch values",
		})
	}

	if err := database.DBConn.Delete(&trial).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error deleting trial",
		})
	}

	// delete namespace
	if err := k8s.DeleteNamespace(helm.GetNamespaceName(trial.Name)); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error deleting namespace",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Trial deleted",
	})
}
