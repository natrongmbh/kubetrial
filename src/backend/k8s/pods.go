package k8s

import (
	"strconv"
	"strings"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func GetTotalPods() (string, error) {

	if Clientset != nil {
		pods, err := Clientset.CoreV1().Pods("").List(Ctx, metav1.ListOptions{})
		if err != nil {
			return "", err
		}
		var totalPods int
		totalPods = len(pods.Items)
		return strconv.Itoa(totalPods), nil
	}

	return "unknown", nil
}

func GetPodsByPrefixNamespace(prefix string) (int, error) {

	if Clientset != nil {
		pods, err := Clientset.CoreV1().Pods("").List(Ctx, metav1.ListOptions{})
		if err != nil {
			return 0, err
		}

		var totalPods int
		// check if prefix of namespace is prefix
		for _, pod := range pods.Items {
			// get namespace of pod
			namespace := pod.GetNamespace()
			// check if namespace contains prefix
			if strings.Contains(namespace, prefix) {
				totalPods++
			}
		}
		return totalPods, nil
	}

	return 0, nil
}
