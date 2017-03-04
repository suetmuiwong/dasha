Node+Express+MongoDB搭建后台
文件打开网址：http://localhost：3000/
一、自行安装好 nodejs  https://nodejs.org/   （注意系统环境变量配置）
二、安装express	
	全局安装
	```
	npm install express -g
				npm install express-generator -g （express4 已经把命令行工具分离出来了）
	```
三、安装MongoDB数据库	https://www.mongodb.com/ （可视化工具可使用robomongo）
四、创建工程。	
	express dasha （express项目种子生成器会自动生成express相应的工程结构）
		/bin: 用于应用启动
		/public: 静态资源目录
		/routes：路由目录
		/views: jade模板目录，是view(视图)目录
		app.js 程序main文件
五、进入工程，安装依赖（npm install），然后在工程根目录启动应用（npm start）
六、使用mongoose连接MongoDB数据库
	安装 npm install mongoose
	在app.js里配置 	var mongoose = require(“mongoose”);
					var dbUrl = 'mongodb://127.0.0.1:27017/ys';
					mongoose.connect(dbUrl);
七、创建schemas、models、controllers三个文件夹，并写好相关文件
八、想写相关view层文件
九、测试调试END				