#!/bin/bash
CODECOV_TOKEN=$1
curl -Os https://uploader.codecov.io/latest/linux/codecov
chmod +x codecov
./codecov
