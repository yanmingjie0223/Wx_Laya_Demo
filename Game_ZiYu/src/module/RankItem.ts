import DisplayUtils from "../core/utils/DisplayUtils";

export default class RankItem extends Laya.Box {

	private _bgIm: Laya.Sprite;

	private _rankTx: Laya.Text;
	private _avatarIm: Laya.Image;
	private _roleNameTx: Laya.Text;
	private _floorTx: Laya.Text;

	constructor() {
		super();
		this.size(600, 149);
		this.initView();
	}

	private initView(): void {
		this._bgIm = new Laya.Sprite();
        this._bgIm.graphics.drawRect(0, 0, 600, 144, "#000000");
        this.addChild(this._bgIm);

		this._rankTx = DisplayUtils.createText(27, 50, 54, 102, this);
		this._avatarIm = DisplayUtils.createImage(155, 20, null, this);
		this._roleNameTx = DisplayUtils.createText(300, 26, 30, 277, this, '#FEF1C5');
		this._floorTx = DisplayUtils.createText(300, 82, 30, 277, this, '#FE420F');

		this._avatarIm.size(110, 110);
		this._roleNameTx.bold = true;
		this._floorTx.bold = true;
		this._rankTx.bold = true;
		this._rankTx.stroke = 3;
		this._rankTx.strokeColor = "#000000";
	}

	public setItem(data: {avatarUrl: string, nickName: string, score: string, rank: number}): void {
		const rank = data.rank;
		this._rankTx.text = `${rank}`;
		this._roleNameTx.text = `${data.nickName}`;
		this._floorTx.text = "最高分数：" + data.score;
		DisplayUtils.imageToTexture(data.avatarUrl, this._avatarIm);
	}

	public clearBG(): void {
		if (this._bgIm) {
			this.graphics.clear();
			this._bgIm.removeSelf();
		}
    }

}