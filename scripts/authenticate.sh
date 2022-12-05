#!/bin/bash

spotify_login() {
    TOKEN=$1
    curl --request POST -sS \
        --url 'https://accounts.spotify.com/api/token' \
        --header "Authorization: Basic ${TOKEN}" \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data 'grant_type=client_credentials' | jq ".access_token"
}

encode_credentials() {
    CLIENT_ID=$1
    CLIENT_SECRET=$2
    echo -ne "${CLIENT_ID}:${CLIENT_SECRET}" | base64 -w 0
}

spotify_login $(encode_credentials $1 $2)
