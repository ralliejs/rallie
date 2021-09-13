# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [0.4.0] - 2021-09-12
### Added
- rename the library to @obvious-js/core
- reactive state
- event proxy
## [0.3.5] - 2021-09-06
### Changed
- change `ctx.loadJs` to `ctx.loadScript`
- change `ctx.loadCss` to `ctx.loadLink`
- change `ctx.fetchJs` to `ctx.fetchScript`

## [0.3.4] - 2021-09-06
### Fixed
- fix the bug that when loading a script without src attribute, the promise will not resolve

## [0.3.3] - 2021-09-03
### Changed
- change the definition of MiddlewareFnType

## [0.3.2] - 2021-09-03
### Changed
- change the return value of touchBus
## [0.3.1] - 2021-09-02
### Added
- new Api: touchBus
### Changed
- it's not neccessary any more to specify the bus's name while calling createBus and getBus
- support to pass a object parameter while calling ctx.loadScript and ctx.loadLink
## [0.3.0] - 2021-08-18
### Changed
- remove the Bus's property `maxDependencyDepth` and `loadScriptByFetch`, use the new API `bus.config` instead
- change the way to declare assets, remove the second parametor of Bus's constructor, use the new API `bus.config` instead
- change the way to apply middleware, remove the third parametor of Bus's constructor, use the new API `bus.use` instead

## [0.2.4] - 2021-05-31
### Fixed
- fix some bugs
### Changed
- cancel deep clone when getting state

## [0.2.3] - 2021-01-26
### Changed
- change the Bus' property allowCrossOriginScript's name to loadScriptByFetch
- support better deep state which use the operator [] to indicate the index of an array

## [0.2.2] - 2021-01-05
### Added
- new API: socket.existState
- add umd bundle
## [0.2.1] - 2020-12-10
### Added
- enable to watch and set state deeply

## [0.1.1] - 2020-08-04
### Fixed
- fix some bugs
## [0.1.0] - 2020-08-03
### Added
- State and event communication capabilities
- Application scheduling capability
- Ability to access middleware