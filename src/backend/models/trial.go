package models

import "gorm.io/gorm"

type Trial struct {
	gorm.Model
	Name             string            `json:"name"`
	Description      string            `json:"description"`
	AppID            uint              `json:"app_id"`
	App              App               `json:"app"`
	TrialPatchValues []TrialPatchValue `json:"trial_patch_values"`
	BgColor          string            `json:"bg_color"`
}

type TrialPatchValue struct {
	gorm.Model
	Value                 string `json:"value"`
	HelmChartPatchValueID uint   `json:"helm_chart_patch_value_id"`
	TrialID               uint   `json:"trial_id"`
}
