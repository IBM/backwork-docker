#!/bin/bash

version=0.1.0
image=bdu.mongo-backup:"$version"
rancher_repo=rancher-dev.apset.xyz:5000
remote_repo=apset-docker.artifactory.swg-devops.com
if [[ $(uname) == "Darwin" ]]; then
  habitus_ip=$(ipconfig getifaddr en0)
else
  habitus_ip=$(hostname -I | awk '{ print $1; }')
fi
export habitus_ip

function build {
    ./habitus --use-tls=false --host=unix:///var/run/docker.sock --binding="0.0.0.0" --build host="$habitus_ip" --env IMAGE_NAME="$image" --env HOME="$HOME"
}

function push {
    case "$1" in
        "rancher")
            repo=$rancher_repo
            ;;
        "remote")
            repo=$remote_repo
            docker login -u "$REGISTRY_USERNAME" -p "$REGISTRY_PASSWORD" $remote_repo
            ;;
        *)
            echo "Invalid repo option '$1'."
            exit 1
            ;;
    esac

    docker tag "$image" "$repo"/"$image"
    docker push "$repo"/"$image"
}

case "$1" in
    "build")
        build
        ;;
    "push")
        push "$2"
        ;;
    *)
        echo "Invalid option '$1'"
        exit 1
        ;;
esac
