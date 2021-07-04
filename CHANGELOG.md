# Change Log

All notable changes to the "csharp-convert-ts" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### 0.1.0

1.支持基础值类型，引用类型，动态类型转换。
2.支持多个类同时转换。
3.支持转换中屏蔽日常类型注释，修饰符，访问器等。

### 0.1.17

问题修复：
1.修复了类名或者属性名包含类型名时出现的错误。

功能拓展：
1.添加选中文本转换。
说明：右键菜单转换，当编辑器有选择文本时，将会只转换选择的文本类，如果未选择，则转换当前编辑TS文件所有内容。

### 0.1.20

功能拓展：
1.添加转换的类名以及属性注释保留。

### 0.1.28

问题修复：
1.修复了属性名顺序问题。
2.修复了同属性相邻转换错误问题。

- Initial release