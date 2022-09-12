# Postgresql HELM Deployment

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

```bash
kubectl apply -f ../namespace.yaml
kubectl apply -f ../kubetrial-secrets.yaml
```

```bash
helm install postgresql --namespace kubetrial bitnami/postgresql -f postgresql/values.yaml
```
