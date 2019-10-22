# Csharp-Convert-TS README

本插件用于:将C#后端类型，通过右键菜单一键转换为TypeScript类型，方便根据后端类型快速建立TS-Model使用。

This plug-in will be used to convert your C# Type to Typescript Type, So that the program can copy the type conversion directly from the back-end when it needs to build a model.

## Features

After copying the CSharp Type, Use the right-click menu or use the shortcut key to convert the type format.

请在安装完插件后，在TS文件内复制C#类，右击转换为TS类型即可，如下图所示：

The following will show you how to convert the copied type through the right-click menu:

![image](images/demo.gif)

## Extension Settings

You can set specific types you need to convert through `contributes.configuration`

For example:

This extension contributes the following settings:

CSharp type: Typescript Type

## Known Issues

目前仅支持基础值类型和引用类型，集合，动态类型转换，暂不支持转换以下复杂类型：

1.Dictionary<T,T>
2.HashTable
3.ConcurrentDictionary
4.自定义类
5.其余未列举出的类型...

## Release Notes

At present, it is a test version, and its function is not stable. If you have any suggestions, you are welcome to raise questions in GitHub project.

### 0.1.0

1.支持基础值类型，引用类型，动态类型转换。
2.支持多个类同时转换。
3.支持转换中屏蔽日常类型注释，修饰符，访问器等。

-----------------------------------------------------------------------------------------------------------

### For more information

* [GitHub Open source project address](https://github.com/git102347501/CSharp-Convert-TS)

