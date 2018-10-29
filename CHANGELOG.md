# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [v2.0.0] - 2018-10-29
### Changed
- only use `.traverse(key, cb, type)` to traverse the graph. removed `dfsTravers` & `bfsTraverse`.
- only use `.findShortestPath(key1, key2, type)` to fins the shortest path. removed `dfsShortestPath`.
