# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]
### Added
-   PostgreSQL support

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

## [0.1.0][]
### Added
-   Mongo, MySQL, and file backup
-   Upload to Softlayer
-   Travis CI for continuous integration
