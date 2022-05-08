### Logger

Set level
```sh
export LOG_LEVEL=all
export LOG_LEVEL=debug
export LOG_LEVEL=info
export LOG_LEVEL=warn
export LOG_LEVEL=error
export LOG_LEVEL=fatal
export LOG_LEVEL=off
```

### HTTPS

- Generate cert and key
```sh
ssl/generateCert.sh
```

- .env file
```sh
# Disable https
HTTPS_ENABLED='false'

# Enable https
HTTPS_ENABLED='true'
HTTPS_CERT_PATH='/some/path/to/the/cert' # Use absolute file path
HTTPS_KEY_PATH='/some/path/to/the/key' # Use absolute file path
```