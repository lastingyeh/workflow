# This Camunda workflow on Knative

部署此範例到Knative上，並且透過Redis管理登入session來支援橫向擴展。

## Prerequisite

* OS:osx
* CPU:darwin/arm64 m2, darwin/amd64 intel
* Docker version 24.0.6
* kubernetes version:kind v0.20.0 go1.21.1 darwin/arm64
* Knative quickstart:lastest
* kubectl:latestest


## Create local environment

1. Create Kind cluster
```
cat <<EOF | kind create cluster --name knative --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraMounts:
  - hostPath: /Users/YOURFOLDER
    containerPath: /home/kind
  extraPortMappings:
    ## expose port 31080 of the node to port 80 on the host
  - containerPort: 31080
    hostPort: 80
    ## expose port 31443 of the node to port 443 on the host
  - containerPort: 31443
    hostPort: 443
EOF
```

2. Check the k8s node
`kubectl get nodes`

3. Install Knative
```
kn quickstart kind --registry
```

## Deploy this project

1. Apply the postgresql
`kubectl apply -f postgres.yaml`

2. Apply the redis
`kubectl apply -f redis.yaml`

3. Apply the camunda
`kubectl apply -f camunda.yaml`

4. Apply the frontend
`kubectl apply -f frontend.yaml`

5. Show knative route list and check those are ready
`kn route list -n camunda`

## How to use this project on Kubernetes

1. Open http://frontend.camunda.127.0.0.1.sslip.io in web browser

2. Camunda admin UI: http://camunda.camunda.127.0.0.1.sslip.io