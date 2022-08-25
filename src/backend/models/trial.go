package models

import "gorm.io/gorm"

type Trial struct {
	gorm.Model
	Name             string            `json:"name"`
	Description      string            `json:"description"`
	App              App               `json:"app"`
	TrialPatchValues []TrialPatchValue `json:"trial_patch_values"`
}

type TrialPatchValue struct {
	gorm.Model
	Value                 string `json:"value"`
	HelmChartPatchValueID uint
}
