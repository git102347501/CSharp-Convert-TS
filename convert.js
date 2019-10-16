const vscode = require('vscode');
module.exports = function(context) {
    // 注册HelloWord命令
    context.subscriptions.push(vscode.commands.registerCommand('extension.cvts', () => {
        vscode.window.activeTextEditor.edit(editBuilder => {
            // 从开始到结束，全量替换
            const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
            // 第一步，取所有文本，替换掉所有的public private 等修饰符,以及/// <summary>/// </summary>注释区域内容
            // class UserInfo
            // {
            //      string ID { get; set; }
            //      string NewPwd { get; set; }
            //      int OldPwd { get; set; }
            // }
            var contextdoc = vscode.window.activeTextEditor.document.getText();
            contextdoc = contextdoc.replace(/public/g,"");
            contextdoc = contextdoc.replace(/private/g,"");
            contextdoc = contextdoc.replace(/protected/g,"");
            contextdoc = contextdoc.replace(/internal/g,"");
            //contextdoc = contextdoc.replace(/summary(.*?)summary/g,"");

            // // 第二步, 根据类型匹配字典，将类型替换为对应TS类型加&，将所有{ get; set; }修饰器替换为逗号,花括号替换为[]
            // class UserInfo
            // [
            //      string&ID,
            //      string&NewPwd,
            //      number&OldPwd,
            // ]           
            contextdoc = contextdoc.replace(/{ get; set; }/g,",");
            var typelist = [{
                name:"string", type:"string"
            },{
                name:"int", type:"number"
            },{
                name:"decimal", type:"number"
            },{
                name:"bool", type:"boolean"
            },{
                name:"DateTime", type:"Date"
            },{
                name:"decimal", type:"number"
            }]
            for (const typeitem of typelist) {
                var value = contextdoc;
                // 属性列表
                var list = [];
                while(value.indexOf(typeitem.name) !== -1){
                    // 查找类型位置
                    var typeindex = value.indexOf(typeitem.name)  + typeitem.name.length;
                    // 查找属性名位置
                    var valueindex = value.substring(typeindex, value.length).indexOf(",");
                    // 读取属性名名称
                    var val = value.substring(typeindex,valueindex + typeindex).replace(/\s*/g,"");
                    // 添加到属性列表
                    list.push({ name: val, type: typeitem.type});
                    // 从字符串截出属性，继续循环
                    value = value.substring(valueindex + typeindex + 1, value.length);
                }
            }
            var start = "export " + contextdoc.substring(0,contextdoc.indexOf("{")).replace("\"","").replace(/^\s*|\s*$/g,"");
            let text = start + "\n" + "{" + "\n" ;
            for (const iterator of list) {
                text += "    " + iterator.name + ": " + iterator.type + ";" + "\n"
            }
            text += "}" + "\n";
            editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
        });
    }));
};