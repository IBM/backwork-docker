# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]
### Added
-   UI Frameworks/Libs (Bootstrap v4, jQuery, Tether and Font Awesome).
-   Assets processor (Mincer).
-   Precompiled assets in production.
-   Flash messages middleware
-   Add New Course feature

### Changed
-   Multiple view layouts. `views/layout.pug` changed to `views/layouts/main.pug`.

## [0.2.1][]
### Changed
-   `COOKIE_SESSION` is now optional, and auto-generated when not specified.
-   `FileStorage` now takes S3 `region` as a parameter (`S3_REGION` environment
    variable).

### Fixed
-   Add missing `next` parameter to error handler.

### Removed
-   Logging with `winston`, in favour of Express' native `debug`.

## [0.2.0][] - 2017-03-28
### Added
-   Course model.
-   REST API for courses.
-   Server-side Session.
-   OAuth2 Authentication with Course Dev.

### Changed
-   CHANGELOG.md format.

## 0.1.0 - 2017-02-27
### Added
-   Project skeleton.

[Unreleased]: https://github.ibm.com/bdu/chell/compare/0.2.1...HEAD
[0.2.1]: https://github.ibm.com/bdu/chell/compare/0.2.0...0.2.1
[0.2.0]: https://github.ibm.com/bdu/chell/compare/0.1.0...0.2.0
