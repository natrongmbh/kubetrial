package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/natrongmbh/kubetrial/controllers"
)

// Routes - Define all routes
func Setup(app *fiber.App) {

	api := app.Group("/api")
	v1 := api.Group("/v1")

	// Auth
	v1.Post("/auth", controllers.Login)
	v1.Get("/auth", controllers.CheckLogin)

	// Overview
	v1.Get("/stats", controllers.GetStats)
	v1.Get("/clusterinfo", controllers.GetClusterInfo)

	// App
	v1.Get("/apps", controllers.GetApps)
	v1.Get("/apps/:id", controllers.GetApp)
	v1.Post("/apps", controllers.CreateApp)
	v1.Put("/apps/:id", controllers.UpdateApp)
	v1.Delete("/apps/:id", controllers.DeleteApp)

	// Trial
	v1.Get("/trials", controllers.GetTrials)
	v1.Get("/trials/:id", controllers.GetTrial)
	v1.Post("/trials", controllers.CreateTrial)
	v1.Put("/trials/:id", controllers.UpdateTrial)
	v1.Delete("/trials/:id", controllers.DeleteTrial)

}
