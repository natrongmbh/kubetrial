package helm

import (
	"context"
	"time"

	helmclient "github.com/mittwald/go-helm-client"
	"helm.sh/helm/v3/pkg/repo"
)

func CreateExampleChart() error {

	opt := &helmclient.Options{
		Namespace:        "default",
		RepositoryConfig: "/tmp/.helmrepo",
		RepositoryCache:  "/tmp/.helmcache",
		Debug:            true,
		Linting:          true,
		DebugLog:         func(format string, v ...interface{}) {},
	}

	helmClient, err := helmclient.New(opt)
	if err != nil {
		return err
	}

	chartRepo := repo.Entry{
		Name: "bitnami",
		URL:  "https://charts.bitnami.com/bitnami",
	}

	if err := helmClient.AddOrUpdateChartRepo(chartRepo); err != nil {
		return err
	}

	chartSpec := helmclient.ChartSpec{
		// ReleaseName: "nginx",
		ChartName: "https://charts.bitnami.com/bitnami/nginx-13.2.1.tgz",
		// Namespace:   "default",
		// ChartName:   "bitnami/nginx",
		ReleaseName: "nginx",
		Namespace:   "default",
		// Version:     "13.2.1",
		// UpgradeCRDs:     true,
		// Wait:            true,
		CreateNamespace: true,
		Timeout:         32 * time.Second,
	}

	if _, err := helmClient.InstallOrUpgradeChart(context.Background(), &chartSpec, nil); err != nil {
		return err
	}

	return nil
}
