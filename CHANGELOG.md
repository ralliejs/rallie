# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.16.2](https://github.com/ralliejs/rallie/compare/v0.16.1...v0.16.2) (2023-08-30)

### Bug Fixes

- **@rallie/react:** fix the bug that the state doesn't update when the dependencies change ([828243a](https://github.com/ralliejs/rallie/commit/828243a733ac0d6d1ce9a48561b7d0a7a6c955eb)), closes [#47](https://github.com/ralliejs/rallie/issues/47)

## [0.16.1](https://github.com/ralliejs/rallie/compare/v0.16.0...v0.16.1) (2023-08-12)

**Note:** Version bump only for package ralliejs

# [0.16.0](https://github.com/ralliejs/rallie/compare/v0.15.1...v0.16.0) (2023-03-08)

### Features

- **@rallie/load-html:** add the config `filter` to filter the element you do not want ([bbe5b18](https://github.com/ralliejs/rallie/commit/bbe5b186625e2dee636e958829c48e295e6c4fca))

## [0.15.1](https://github.com/ralliejs/rallie/compare/v0.15.0...v0.15.1) (2023-03-07)

**Note:** Version bump only for package ralliejs

# [0.15.0](https://github.com/ralliejs/rallie/compare/v0.14.2...v0.15.0) (2023-03-04)

### Features

- **@rallie/block:** bind the trigger name of event and methods on the `this` object of the listener ([4957c54](https://github.com/ralliejs/rallie/commit/4957c54c5eefc96a4190089af5dda29db17b52df))

## [0.14.2](https://github.com/ralliejs/rallie/compare/v0.14.1...v0.14.2) (2023-03-04)

### Bug Fixes

- **@rallie/block:** remove the ability to get the trigger of event or methods ([718ff08](https://github.com/ralliejs/rallie/commit/718ff08ff42506f89b07d58f267c90d20ab67a4a))

## [0.14.1](https://github.com/ralliejs/rallie/compare/v0.14.0...v0.14.1) (2023-03-03)

### Bug Fixes

- **@rallie/block:** method and event listener can get the trigger name by the last argument ([b4de50b](https://github.com/ralliejs/rallie/commit/b4de50babc6a59551ee362fcfd358499b47ecefe))

# [0.14.0](https://github.com/ralliejs/rallie/compare/v0.13.2...v0.14.0) (2023-02-25)

### Features

- **@rallie/block:** remove the method `registerBlock` ([92e4ff0](https://github.com/ralliejs/rallie/commit/92e4ff0147e26508dfbe7a59948476111f131e0e))

## [0.13.2](https://github.com/ralliejs/rallie/compare/v0.13.1...v0.13.2) (2023-02-22)

### Bug Fixes

- **@rallie/react): fix(@rallie/react:** fixup the commit 45433cfa657e735115d3841a05ad63652bad5f3d ([127c69b](https://github.com/ralliejs/rallie/commit/127c69b135f52c7552dceac5bdcd602f182660c9))

## [0.13.1](https://github.com/ralliejs/rallie/compare/v0.13.0...v0.13.1) (2023-02-22)

### Bug Fixes

- **@rallie/react:** fix the bug of function state([#46](https://github.com/ralliejs/rallie/issues/46)) ([45433cf](https://github.com/ralliejs/rallie/commit/45433cfa657e735115d3841a05ad63652bad5f3d))

# [0.13.0](https://github.com/ralliejs/rallie/compare/v0.12.0...v0.13.0) (2023-02-21)

### Features

- **core:** remove activate parameters ([c767592](https://github.com/ralliejs/rallie/commit/c767592e1cc062be2b29cd20abe9a92bf3f474ab))
- **core:** remove the lifecycle `onBootstrap`, `onDestroy` ([e95d0d3](https://github.com/ralliejs/rallie/commit/e95d0d3c1d9dcbc22d6b964eca3c9c6529039124))

# [0.12.0](https://github.com/ralliejs/rallie/compare/v0.11.0...v0.12.0) (2023-02-13)

### Features

- **block:** move the method `initState` and `export` from CreatedBlock to RegisteredBlock ([2169e20](https://github.com/ralliejs/rallie/commit/2169e2017304b47bffdb7a1982f9e31aaac17d6e))

# [0.11.0](https://github.com/ralliejs/rallie/compare/v0.10.0...v0.11.0) (2022-10-24)

### Features

- **block:** rename `rallie` to `@rallie/block` ([dd5a967](https://github.com/ralliejs/rallie/commit/dd5a967726992866df60df5cbf213520ccdda847))

# [0.10.0](https://github.com/ralliejs/rallie/compare/v0.9.2...v0.10.0) (2022-10-23)

### Features

- **core:** remove `socket.waitState` ([29c4e86](https://github.com/ralliejs/rallie/commit/29c4e8615a93e910bd2f639a9910b370ffe1d67d))

## [0.9.2](https://github.com/ralliejs/rallie/compare/v0.9.1...v0.9.2) (2022-10-21)

### Performance Improvements

- cache connected block to avoid memory leak ([28109b9](https://github.com/ralliejs/rallie/commit/28109b9d1f3605054910a7e566960114978f38bf))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.1] - 2022-07-09

### Changed

- change the generic parameter of `block.connect`

## [0.9.0] - 2022-07-08

### Added

- add `CreatedBlock.export()` and `ConnectedBlock.import()`

## [0.8.1] - 2022-04-20

### Fixed

- fixed some bugs

### Changed

- replace the concept 'App' with 'Block'

## [0.8.0] - 2022-03-22

### Changed

- replace the concept 'App' with 'Block'

## [0.7.1] - 2022-02-20

### Changed

- add the parameter to declare dependencies for react hooks

## [0.7.0] - 2022-01-17

### Changed

- change the parammeter of `app.run`
- refactor the logic to handle circular dependency

### Removed

- remove `ctx.fetchScript`，`ctx.excudeCode` and `ctx.conf`

## [0.6.10] - 2021-12-29

### Fixed

- fix the problem that the watching callbacks are executed multiple times when the state is modified multiple times

## [0.6.9] - 2021-12-28

### Fixed

- fixed some bugs of `@rallie/react`

## [0.6.8] - 2021-12-27

### Changed

- remove the argument `isWatchingEffect` of `socket.watchState`
- a string to describe the action is neccessary when calling `socket.setState`

## [0.6.7] - 2021-12-14

### Removed

- remove `app.InHostMode` and `app.runInRemoteMode`

### Added

- add `app.run`

## [0.6.6] - 2021-12-10

### Fixed

- fixed the ty type error

## [0.6.5] - 2021-12-10

### Fixed

- fixed some bugs

## [0.6.4] - 2021-12-9

### Changed

- change the vue version of @rallie/vue's peer dependency to v2.0.0

## [0.6.3] - 2021-12-2

### Changed

- remove `@rallie/load-html`'s dependencies of `cheerio` and `path-browserify`
- allow `@rallie/load-html` to load content element

## [0.6.2] - 2021-12-1

### Fixed

- fix some bugs

## [0.6.1] - 2021-11-25

### Added

- add mixins for @rallie/vue to support vue2

### Changed

- seprate name from `ctx`

## [0.6.0] - 2021-11-23

### Changed

- remove the `publicState` and `privateState`, only remain the `state`

## [0.5.2] - 2021-11-07

### Changed

- rename the `unicaster` to `methods`

### Fixed

- fix some bugs

## [0.5.0] - 2021-10-28

### Changed

- rename the project to 'rallie'
- add the package rallie, @rallie/core, @rallie/react, @rallie/vue

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
