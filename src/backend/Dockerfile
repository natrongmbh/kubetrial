# syntax=docker/dockerfile:1
FROM golang:1.18 as build
WORKDIR /go/src/github.com/natrongmbh/kubetrial
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o kubetrial .

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=build /go/src/github.com/natrongmbh/kubetrial/kubetrial ./
EXPOSE 8000
CMD ["./kubetrial", "cluster"]