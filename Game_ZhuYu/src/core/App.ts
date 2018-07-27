import EventConst from "./event/EventConst";
import { wxManager } from "./WxManager";

export default class App {

    public constructor() {

    }

    public onStart(): void {
        this.test();
    }

    public onRemoveEvent(): void {

    }

    private test(): void {
        const friendSp = new Laya.Sprite();
        Laya.stage.addChild(friendSp);
        wxManager.openShareCanvas(friendSp);

        wx.setUserCloudStorage({ KVDataList: [{key: 'score', value: 700 + '' }] });
        wx.getOpenDataContext().postMessage({ type: EventConst.FRIEND_RANK });
    }

}