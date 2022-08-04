package k8s

import (
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func GetSecretsInNamespace(namespace string) (*v1.SecretList, error) {
	secrets, err := Clientset.CoreV1().Secrets(namespace).List(Ctx, metav1.ListOptions{})
	if err != nil {
		return &v1.SecretList{}, err
	}
	return secrets, nil
}
