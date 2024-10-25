#!/bin/bash
set -e

cd ..

CERTIFICATE_FILE=${CERTIFICATE_FILE:-/default/path/to/certificate.pfx}
CERTIFICATE_PASSWORD=${CERTIFICATE_PASSWORD:-defaultpassword}

cd tools

if ! command -v certificate-tool &> /dev/null; then
    echo "certificate-tool not found"
    exit 1
fi

certificate-tool add --file "$CERTIFICATE_FILE" --password "$CERTIFICATE_PASSWORD"

cd ..

cd app

exec dotnet VideoRentalStoreApp.dll