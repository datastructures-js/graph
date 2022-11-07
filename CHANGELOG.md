# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [v5.3.0] - 2022-11-07
### Added
- `getVertexValue(key)` returns vertex value.

## [v5.2.0] - 2022-11-07
### Added
- `getConnectedVertices(key)` to get connected nodes to a given node.
- `getConnecetedEdges(key)`to get connected edges from a given node.
- `traverseDfs(key, cb, abortCb)` added abortCb optional param to abort traversal.
- `traverseBfs(key, cb, abortCb)` added abortCb optional param to abort traversal.

## [v5.1.5] - 2022-08-15
### Fixed
- add types to package.json

## [v5.1.4] - 2022-06-05
### Fixed
- readme.

## [v5.1.3] - 2022-02-11
### Fixed
- cleanup temp files.

## [v5.1.2] - 2022-02-11
### Fixed
- getWeight type definition.

## [v5.1.1] - 2021-06-20
### Fixed
- index.d.ts

## [v5.1.0] - 2021-06-20
### Added
- typescript.

## [v5.0.1] - 2021-04-15
### Fixed
- README

## [v5.0.0] - 2021-04-15
### Changed
- `addVertex` & `addEdge` now can be chained.
- remove `Vertex` class overhead, simply use key-value.
- getters.

### Fixed
- `.getWeight` now returns `Infinity` for two vertices that are not connected.
- README

## [v4.0.1] - 2020-04-10
### Fixed
- README

## [v4.0.0] - 2020-04-08
### Added
`.removeEdges(key)` to remove all conncted edges in graph (directions in directed graph) from a vertex.

#### Changed
- `.removeEdge` & `.removeVertex` now return a boolean to indicated if something was removed.
- `.addVertex` now returns the addded vertex. 

### Removed
- vertex none standard function `.serialize`.

### Fixed
- README
- jsdoc

## [v3.0.2] - 2020-03-06
### Fixed
- typos in readme

## [v3.0.1] - 2020-01-02
### Fixed
- typos in readme

## [v3.0.0] - 2020-01-01
### Added
- new release of graph npm
