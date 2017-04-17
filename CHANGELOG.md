# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

## [0.4.0][] - 2017-04-17
### Added
-   Add New Course version.
-   Download existing course version archive file.
-   Version major/minor uniqueness validation.
-   Upload version archive file to S3.
-   Uploading modal.

### Changed
-   Forward `FileStorage` errors as errors.
-   Use virtual attribute for version `archiveFilename`.
-   Refactor common route filters to `routes/api/filters.js`.
-   Move `loadVersion` middleware to `middleware/load_version.js`.

### Fixed
-   `GET /api/courses/:id/versions` and `GET /api/courses/:id/versions/:id` -
    Transform to JSON before sending to filter.

## [0.3.0][] - 2017-04-03
### Added
-   UI Frameworks/Libs (Bootstrap v4, jQuery, Tether and Font Awesome).
-   Assets processor (Mincer).
-   Precompiled assets in production.
-   Flash messages middleware.
-   Add New Course.
-   Courses list.
-   Show course details.
-   Edit Course.

### Changed
-   Multiple view layouts. `views/layout.pug` changed to `views/layouts/main.pug`.

## [0.2.1][] - 2017-03-29
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

[Unreleased]: https://github.ibm.com/bdu/chell/compare/0.4.0...HEAD
[0.4.0]: https://github.ibm.com/bdu/chell/compare/0.3.0...0.4.0
[0.3.0]: https://github.ibm.com/bdu/chell/compare/0.2.1...0.3.0
[0.2.1]: https://github.ibm.com/bdu/chell/compare/0.2.0...0.2.1
[0.2.0]: https://github.ibm.com/bdu/chell/compare/0.1.0...0.2.0
