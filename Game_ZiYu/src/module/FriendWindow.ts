import RankItem from "./RankItem";

export default class FriendWindow extends Laya.Sprite {

    private _list: Laya.List;

    public constructor() {
        super();
        this.initView();
    }

    private initView(): void {
        this._list = new Laya.List();
        this.addChild(this._list);
        this._list.size(600, 400);
		this._list.itemRender = RankItem;
		this._list.vScrollBarSkin = "";
		this._list.renderHandler = new Laya.Handler(this, (cell, index) => {
			cell.setItem(cell.dataSource);
		});
    }

    public setListData(listData: Array<any>): void {
        this._list.array = listData;
    }

    public setListSize(_w: number, _h: number): void {
        this._list.size(_w, _h);
    }

}