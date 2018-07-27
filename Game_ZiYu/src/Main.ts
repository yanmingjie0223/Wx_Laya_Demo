import { eventManager } from "./core/event/EventManager";
import App from "./core/App";

export default class Main {

    public constructor() {
        this.initEngine();
        this.initApp();
        this.initMassage();
    }

    private initEngine(): void {
        //初始化微信小游戏
        Laya.MiniAdpter.init(true, true);
        //程序入口
        Laya.init(750, 1334);
    }

    private initMassage(): void {
        wx.onMessage((message) => {
            const eventType = message.type;
            const data = message.data;
            eventManager.event(eventType, [data]);
        });
    }

    private initApp(): void {
        (new App()).onStart();
    }

}