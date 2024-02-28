# Release Operations

Project release operations.

## Usage

```shell
npm i -D release-ops

# beta
release-ops beta
# 1.0.0 => 1.0.1-beta.0

# patch
release-ops patch
# 1.0.0 => 1.0.1

# custom
release-ops 1.0.1-beta.0
# 1.0.0 => 1.0.1-beta.0

# custom prerelease-id
release-ops prerelease -p custom
# 1.0.0 => 1.0.1-custom.0
```

register scripts in package.json:

```json
{
  "scripts": {
    "publish:beta": "release-ops beta",
    "publish:patch": "release-ops"
  }
}
```