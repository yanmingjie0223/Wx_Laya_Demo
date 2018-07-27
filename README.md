# 使用步骤

1、先下载模块：npm install

2、运行自动合并代码服务：npm run serve （可查看package.json文件）

3、打包微信小游戏使用LayaIDE

注意：

1、子域中没有纯色底会出现渲染锯齿情况

2、开启子域在game.json中添加："openDataContext": "src/myOpenDataContext"

3、适配是根据主域，调整适配可以通过发送适配比例到子域中

4、微信个人信息头像avatarUrl地址可以使用Sprite loadImage方法自动将数据转换成图片

5、version.json版本配置

微信开发注意细节：

1、设置-开发设置-服务器域名（容易遗漏配置）

2、打开右上角分享功能
wx.showShareMenu({withShareTicket: true})

3、右上角分享信息初始化
wx.onShareAppMessage(function(res){
    return {
        title: "不怕，就来PK！",
        imageUrl: "",
        success(res){
            console.log("转发成功!!!")
        },
        fail(res){
            console.log("转发失败!!!")
        }
    }
})
