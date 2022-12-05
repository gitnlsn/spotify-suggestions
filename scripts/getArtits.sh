#!/bin/bash

spotify_artists() {
    TOKEN=$1
    QUERY=$2
    curl --request GET \
        --url "https://api.spotify.com/v1/search?type=artist&include_external=audio&q=${QUERY}" \
        --header "Authorization: Bearer ${TOKEN}" \
        --header 'Content-Type: application/json' | jq 
}

spotify_artists $1 $2
