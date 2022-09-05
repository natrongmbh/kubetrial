package models

import "gorm.io/gorm"

type App struct {
	gorm.Model
	Name                          string                `json:"name"`
	Description                   string                `json:"description"`
	HelmChartRepositoryUrl        string                `json:"helm_chart_repository_url"`
	HelmChartName                 string                `json:"helm_chart_name"`
	HelmChartVersion              string                `json:"helm_chart_version"`
	HelmChartPatchValues          []HelmChartPatchValue `json:"helm_chart_patch_values"`
	DefaultHelmChartPatchValues   string                `json:"default_helm_chart_patch_values"`
	AdditionalKubernetesManifests string                `json:"additional_kubernetes_manifests"`
}

type HelmChartPatchValue struct {
	gorm.Model
	Name        string `json:"name"`
	ValueString string `json:"value_string"`
	AppID       uint
}
