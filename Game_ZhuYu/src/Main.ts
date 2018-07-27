import App from "./core/App";
import { wxManager } from "./core/WxManager";

export default class Main {

    public constructor() {
        this.initEngine();
        this.initApp();

    }

    private initEngine(): void {
        //初始化微信小游戏
        Laya.MiniAdpter.init(true, false);
        //程序入口
        Laya.init(750, 1334);

        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
        Laya.stage.bgColor = "#000000";

        wxManager.initWxShareCanvas();
        wxManager.login();
    }

    private initApp(): void {
        (new App()).onStart();
    }

}