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

	v1.Get("/clusterinfo", controllers.GetClusterInfo)

	// App
	v1.Get("/apps", controllers.GetApps)
	v1.Get("/apps/:id", controllers.GetApp)
	v1.Post("/apps", controllers.CreateApp)
	v1.Put("/apps/:id", controllers.UpdateApp)
	v1.Delete("/apps/:id", controllers.DeleteApp)
}
