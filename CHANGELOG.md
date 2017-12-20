# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

## [0.3.2][] - 2017-12-20
### Fixed
-   Made plugins fail with non-zero status for backup errors
-   Bumped Python from `2.7.13` to `2.7.14`
-   Switched to modern multi-stage build process

## [0.3.1][] - 2017-07-17
### Fixed
-   Also skip Softlayer upload if missing username or api key

## [0.3.0][] - 2017-07-11
### Added
-   PostgreSQL support
-   `/backups` Docker volume

### Changed
-   Use `bash` instead of `ash`
-   Local backups go to `/backups`, not `/tmp`

### Fixed
-   Apply updates for `db` and `ncurses`

## [0.2.1][]
### Fixed
-   Name files `.gz` rather than `.gzip` to avoid `gunzip` issues

## [0.2.0][]
### Added
-   You can skip backing up Mongo, MySQL, or files by not specifying
    Mongo host, MySQL host, or file paths
-   Softlayer credentials are still required, and Sentry is still optional

## [0.1.7][]
### Fixed
-   Wait for backups to complete

## [0.1.6][]
### Fixed
-   OS package security updates

## 0.1.0
### Added
-   Mongo, MySQL, and file backup
-   Upload to Softlayer
-   Travis CI for continuous integration

[Unreleased]: https://github.ibm.com/bdu/gamora/compare/0.3.3...HEAD
[0.3.3]: https://github.ibm.com/bdu/gamora/compare/0.3.2...0.3.3
[0.3.2]: https://github.ibm.com/bdu/gamora/compare/0.3.1...0.3.2
[0.3.1]: https://github.ibm.com/bdu/gamora/compare/0.3.0...0.3.1
[0.3.0]: https://github.ibm.com/bdu/gamora/compare/0.2.1...0.3.0
[0.2.1]: https://github.ibm.com/bdu/gamora/compare/0.2.0...0.2.1
[0.2.0]: https://github.ibm.com/bdu/gamora/compare/0.1.7...0.2.0
[0.1.7]: https://github.ibm.com/bdu/gamora/compare/0.1.6...0.1.7
[0.1.6]: https://github.ibm.com/bdu/gamora/compare/0.1.0...0.1.6
