// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const vscode = require('vscode');
/**
 * @param {*} context
 */
exports.activate = function(context) {
	console.log('模型转换插件已启动！');
	console.log(vscode);
	require('./convert')(context);
}

// this method is called when your extension is deactivated
exports.deactivate = function() {
    console.log('您的扩展已被释放！')
};
