const vscode = require('vscode');
module.exports = function(context) {
    // 注册HelloWord命令
    context.subscriptions.push(vscode.commands.registerCommand('extension.cvts', () => {
        vscode.window.activeTextEditor.edit(editBuilder => {
            const selectiontext = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
            // 从开始到结束，全量替换
            const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
            var contextdoc;
            // 如果没有选中文本，替换全部文本
            if(!selectiontext){
                contextdoc = vscode.window.activeTextEditor.document.getText().replace(/\s*/g,"");
            } else {
                contextdoc = selectiontext.replace(/\s*/g,"");
            }
            var rpmodlist = [/public/g,/private/g,/protected/g,/internal/g,/\/\/\/<summary>/g,/\/\/\/<\/summary>/g];
            for (const rptext of rpmodlist) {
                contextdoc = contextdoc.replace(rptext,"");
            }
            // 去除get，set访问器内的代码???
            var accessor = [/{get;set;}/g,/{get;}/g,/{set;}/g];
            for (const rptext of accessor) {
                contextdoc = contextdoc.replace(rptext,",");
            }
            var patch = (re,s) => {
                re = eval("/"+re+"/ig")
                return s.match(re).length;
            }
            // 查询文本里有多少类
            var contextdoclist = [];
            var count = patch('class', contextdoc);
            for (let index = 0; index < count; index++) {
                // 取class 到最后一个}区间为值
                contextdoclist.push(contextdoc.substring(contextdoc.indexOf("class"),contextdoc.indexOf("}")));
                contextdoc = contextdoc.substring(contextdoc.indexOf("}") +1 , contextdoc.length); 
            }
            var retext = "";
            for (let index = 0; index < contextdoclist.length; index++) {
                // 转换为TS类格式
                retext += getmodel(contextdoclist[index]) + "\n";
            }
            if(!selectiontext){
                editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), retext);
            } else{
                // 如果只转换选中文本，那只替换选中文本
                editBuilder.replace(new vscode.Range(vscode.window.activeTextEditor.selection.start,
                vscode.window.activeTextEditor.selection.end), retext);
            }
        });
    }));
};
// 读取类型替换配置
var typelist = [{
    name:"string", type: vscode.workspace.getConfiguration().get('string') !== undefined ? 
    vscode.workspace.getConfiguration().get('string') : "string"
},{
    name:"bool",  type: vscode.workspace.getConfiguration().get('bool') !== undefined ? 
    vscode.workspace.getConfiguration().get('bool') : "boolean"
},{
    name:"int", type: vscode.workspace.getConfiguration().get('int') !== undefined ? 
    vscode.workspace.getConfiguration().get('int') : "number"
},{
    name:"decimal", type: vscode.workspace.getConfiguration().get('decimal') !== undefined ? 
    vscode.workspace.getConfiguration().get('decimal') : "number"
},{
    name:"DateTime",  type: vscode.workspace.getConfiguration().get('DateTime') !== undefined ? 
    vscode.workspace.getConfiguration().get('DateTime') : "Date"
},{
    name:"byte",  type: vscode.workspace.getConfiguration().get('byte') !== undefined ? 
    vscode.workspace.getConfiguration().get('byte') : "string"
},{
    name:"char",  type: vscode.workspace.getConfiguration().get('char') !== undefined ? 
    vscode.workspace.getConfiguration().get('char') : "string"
},{
    name:"double",  type: vscode.workspace.getConfiguration().get('double') !== undefined ? 
    vscode.workspace.getConfiguration().get('double') : "number"
},{
    name:"float",  type: vscode.workspace.getConfiguration().get('float') !== undefined ? 
    vscode.workspace.getConfiguration().get('float') : "number"
},{
    name:"long",  type: vscode.workspace.getConfiguration().get('long') !== undefined ? 
    vscode.workspace.getConfiguration().get('long') : "number"
},{
    name:"sbyte",  type: vscode.workspace.getConfiguration().get('sbyte') !== undefined ? 
    vscode.workspace.getConfiguration().get('sbyte') : "number"
},{
    name:"short",  type: vscode.workspace.getConfiguration().get('short') !== undefined ? 
    vscode.workspace.getConfiguration().get('short') : "number"
},{
    name:"uint",  type: vscode.workspace.getConfiguration().get('uint') !== undefined ? 
    vscode.workspace.getConfiguration().get('uint') : "number"
},{
    name:"ulong",  type: vscode.workspace.getConfiguration().get('ulong') !== undefined ? 
    vscode.workspace.getConfiguration().get('ulong') : "number"
},{
    name:"ushort",  type: vscode.workspace.getConfiguration().get('ushort') !== undefined ? 
    vscode.workspace.getConfiguration().get('ushort') : "number"
},{
    name:"object",  type: vscode.workspace.getConfiguration().get('object') !== undefined ? 
    vscode.workspace.getConfiguration().get('object') : "any"
},{
    name:"dynamic",  type: vscode.workspace.getConfiguration().get('dynamic') !== undefined ? 
    vscode.workspace.getConfiguration().get('dynamic') : "any"
}];
function getmodel(contextdoc){
    // 属性列表
    var list = [];
    const clastart = contextdoc.indexOf("class") + 5;
    const claend =contextdoc.indexOf("{");
    var clsname = contextdoc.substring(clastart,claend);
    if (clsname.indexOf(":") != -1) {
        // 如果包含继承，去除继承文本
        clsname = clsname.split(":")[0];
    }
    contextdoc = contextdoc.substring(claend, contextdoc.length);
    // 遍历类型配置
    for (const typeitem of typelist) {
        var value = contextdoc;
        // 如果当前文本包含类型，则循环加入生成list
        while(value.indexOf(typeitem.name) !== -1){
            // 查找类型名位置
            const tpindex = value.indexOf(typeitem.name);
            // 查找类型名称开始位置
            const itemNameStartIndex = tpindex + typeitem.name.length;
         
            // 查找属性名结束位置
            const itemNameEndIndex = value.substring(itemNameStartIndex, value.length).indexOf(",");
            if (itemNameEndIndex == -1) {
                continue;
            }
            // 读取属性名名称
            var val = value.substring(itemNameStartIndex, itemNameEndIndex + itemNameStartIndex).replace(/\s*/g,"");

            // 如果包含Nullable<类型>，或者后面有？，则为可空类型
            var isnull = value.substring(tpindex + typeitem.name.length, tpindex + typeitem.name.length + 2).indexOf("?") != -1 ||
            value.substring(tpindex - 10, tpindex).indexOf("Nullable") != -1;

            // 如果包含[]，则为数组，如果包含Array<类型>, 则为集合
            var islist,isarray = false;
            if (isnull == false) {
                islist = value.substring(tpindex - 5, tpindex).indexOf("List") != -1;
                if (islist == false) {
                    isarray = value.substring(tpindex + typeitem.name.length, tpindex + typeitem.name.length + 3).indexOf("[]") != -1;
                }
            }
            val = val.replace("?","");
            var tpval = typeitem.type;
            if (isnull == false) {
                if (islist == true || isarray == true) {
                    tpval = tpval + '[]';
                }
            } else {
                val = val + '?'
            }
            val = val.replace(">","");
            val = val.replace("[]","");
            // 添加到属性列表
            list.push({ name: val, type: tpval});
            // 从字符串截出属性，继续循环
            value = value.substring(itemNameEndIndex + itemNameStartIndex + 1, value.length);
        }
        var value = contextdoc;
    }
    let text = "export class " + clsname + "\n" + "{" + "\n" ;
    for (const iterator of list) {
        text += "    " + iterator.name + ": " + iterator.type + ";" + "\n"
    }
    text += "}" + "\n";
    return text;
}