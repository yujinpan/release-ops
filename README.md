# Release operators

Project release operators.

## Usage

```shell
npm i -D release-ops
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

### Release

Release next version.

> WorkFlow: update version => build => generate changelog => generate tag => publish npm => push git

```shell
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

### Tag

Make tag.

> WorkFlow: update version => build => generate changelog => generate tag

```shell
# beta
release-ops tag beta

# patch
release-ops tag patch
```

### Version

Update version.

```shell
# beta
release-ops version beta

# patch
release-ops version patch
```

### Changelog

Update changelog.

```shell
release-ops changelog
```

## API

- release
- makeTag
- updateVersion
- updateChangelog