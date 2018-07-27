import { eventManager } from "./event/EventManager";
import EventConst from "./event/EventConst";
import FriendWindow from "../module/FriendWindow";

export default class App {

    public constructor() {

    }

    public onStart(): void {
        eventManager.on(EventConst.FRIEND_RANK, this, this.showFriendRank);
    }

    public onRemoveEvent(): void {
        eventManager.off(EventConst.FRIEND_RANK, this, this.showFriendRank);
    }

    private showFriendRank(): void {
        const friendView = new FriendWindow();
        Laya.stage.addChild(friendView);
        wx.getFriendCloudStorage({
            keyList: ['score'],
            success: res => {
                let data = res.data;
                friendView.setListData(this.getRankData(data));
            },
            fail: function () { }
        });
    }

    private getRankData(userGameData: UserGameData[]): Array<any> {
        let rankData = [];
        for (let i = 0; i < userGameData.length; i++) {
            let item: UserGameData = userGameData[i] as UserGameData;
            let KVData = this.wxDataToObject(item.KVDataList);
            let score = KVData.score ? KVData.score : 0;
            rankData.push({avatarUrl: item.avatarUrl, nickName: item.nickname, score: score, openId: item.openid})
        }
        rankData.sort(this.sortRankData);
        // 加入排行
        for (let i = 0, len = rankData.length; i < len; i++) {
            rankData[i]['rank'] = i + 1;
        }
        return rankData;
    }

    private wxDataToObject(KVDataList: {key: string, value: string}[]): any {
        let data = {};
        for (let i = 0, len = KVDataList.length; i < len; i++) {
            data[KVDataList[i].key] = KVDataList[i].value;
        }
        return data;
    }

    private sortRankData(rankA, rankB) {
        return parseInt(rankB.score) - parseInt(rankA.score);
    }

}