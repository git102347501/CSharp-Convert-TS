# Change Log

## [0.1.01] - 2021-03-28
### Added
- 支持基础值类型，引用类型，动态类型转换。
- 支持多个类同时转换。
- 支持转换中屏蔽日常类型注释，修饰符，访问器等。

## [0.1.17] - 2021-03-31
### Fixed
- 修复了类名或者属性名包含类型名时出现的错误。
### Added
- 添加选中文本转换。(右键菜单转换，当编辑器有选择文本时，将会只转换选择的文本类，如果未选择，则转换当前编辑TS文件所有内容)

## [0.1.20] - 2021-05-09
### Added
- 添加转换的类名以及属性注释保留。

## [0.1.28] - 2021-07-04
### Fixed
- 修复了属性名顺序问题。
- 修复了同属性相邻转换错误问题。

## [0.1.29] - 2022-07-21
### Fixed
- 修复了注释不规范问题。
### Added
- 添加转换类或接口选项配置，默认为 0：接口 interface，可选 1：类 class.
- 转换属性名配置，默认为 0：保持原命名, 1：全大写:2：全小写.

[Beta]: https://github.com/git102347501/CSharp-Convert-TS/compare/v0.0.01...HEAD
[0.1.01]: https://github.com/git102347501/CSharp-Convert-TS/compare/v0.0.01...v0.1.01
[0.1.17]: https://github.com/git102347501/CSharp-Convert-TS/compare/v0.1.01...v0.1.17
[0.1.20]: https://github.com/git102347501/CSharp-Convert-TS/compare/v0.1.17...v0.1.20
[0.1.28]: https://github.com/git102347501/CSharp-Convert-TS/compare/v0.1.20...v0.1.28
[0.1.29]: https://github.com/git102347501/CSharp-Convert-TS/compare/v0.1.20...v0.1.29
