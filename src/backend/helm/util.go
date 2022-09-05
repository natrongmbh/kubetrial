package helm

import (
	"context"
	"strings"
	"time"

	"github.com/imdario/mergo"
	helmclient "github.com/mittwald/go-helm-client"
	"github.com/natrongmbh/kubetrial/models"
	"github.com/natrongmbh/kubetrial/util"
	"gopkg.in/yaml.v2"
	"helm.sh/helm/v3/pkg/release"
	"helm.sh/helm/v3/pkg/repo"
)

var (
	Prefix = "kubetrial"
)

func GetNamespaceName(trialName string) string {
	return Prefix + "-" + util.StringParser(trialName)
}

func CreateHelmClient(namespace string) (helmclient.Client, error) {
	opt := &helmclient.Options{
		Namespace: namespace,
		Debug:     true,
		Linting:   true,
		DebugLog:  func(format string, v ...interface{}) {},
	}

	helmClient, err := helmclient.New(opt)
	if err != nil {
		return nil, err
	}

	return helmClient, nil
}

func AddHelmRepositoryToClient(helmClient helmclient.Client, repositoryName string, repositoryURL string) error {
	chartRepo := repo.Entry{
		Name: strings.ToLower(repositoryName),
		URL:  repositoryURL,
	}

	if err := helmClient.AddOrUpdateChartRepo(chartRepo); err != nil {
		return err
	}

	return nil
}

func CreateOrUpdateHelmRelease(helmClient helmclient.Client, chartName string, releaseName string, namespace string, version string, valuesYaml string) (*release.Release, error) {

	chartSpec := helmclient.ChartSpec{
		ChartName:       strings.ToLower(chartName),
		ReleaseName:     strings.ToLower(releaseName),
		Namespace:       namespace,
		CreateNamespace: true,
		Timeout:         32 * time.Second,
		Version:         version,
		ValuesYaml:      valuesYaml,
	}

	if release, err := helmClient.InstallOrUpgradeChart(context.Background(), &chartSpec, nil); err != nil {
		return nil, err
	} else {
		return release, nil
	}
}

func GetHelmRelease(helmClient helmclient.Client, releaseName string) (*release.Release, error) {
	return helmClient.GetRelease(releaseName)
}

func ValuesYamlParser(trialPatchValues []models.TrialPatchValue, helmChartPatchValues []models.HelmChartPatchValue) string {
	valuesYaml := ""

	// get the helmChartPatchValues.value_string and split it by .
	// then get the length of the array and parse it to a map

	for _, v := range helmChartPatchValues {
		for _, t := range trialPatchValues {
			if t.HelmChartPatchValueID == v.ID {
				valueStringArray := strings.Split(v.ValueString, ".")
				valueStringArrayLength := len(valueStringArray)

				if valueStringArrayLength == 1 {
					valuesYaml += v.ValueString + ": " + t.Value + "\n"
				} else {
					var spaceChars string = ""
					for i := 0; i < valueStringArrayLength; i++ {
						if i == 0 {
							valuesYaml += valueStringArray[i] + ":\n"
						} else if i != valueStringArrayLength-1 {
							spaceChars += "  "
							valuesYaml += spaceChars + valueStringArray[i] + ":\n"
						}
					}
					valuesYaml += spaceChars + "  " + valueStringArray[valueStringArrayLength-1] + ": " + t.Value + "\n"
				}
			}
		}
	}
	return valuesYaml
}

func MergeDefaultYamlWithTrialYaml(defaultYaml string, trialYaml string) (string, error) {

	// add defaultYaml to trialYaml
	// if trialYaml has the same key as defaultYaml, then trialYaml will overwrite defaultYaml

	var defaultYamlMap map[string]interface{}
	var trialYamlMap map[string]interface{}

	if err := yaml.Unmarshal([]byte(defaultYaml), &defaultYamlMap); err != nil {
		return "", err
	}

	if err := yaml.Unmarshal([]byte(trialYaml), &trialYamlMap); err != nil {
		return "", err
	}

	if err := mergo.Merge(&defaultYamlMap, trialYamlMap); err != nil {
		return "", err
	}

	mergedYaml, err := yaml.Marshal(defaultYamlMap)
	if err != nil {
		return "", err
	}

	return string(mergedYaml), nil
}
