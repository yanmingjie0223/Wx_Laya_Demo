
export default class WxManager {

    /**
     * 开放域纹理
     */
    private _shareCanvasTexture: Laya.Texture;

    public constructor() {

    }

    public isWx(): boolean {
        if (wx) {
            return true;
        }
        return false;
    }

    public login(): void {
        if (this.isWx()) return;

        wx.login({
            success: (res: { code: string }) => {
                // todo: 发送code请求openId等信息
            },
            fail: () => {

            },
            complete: () => {

            }
        });
    }

    /**
     * 微信子域渲染开启
     */

    public initWxShareCanvas(): void {
        if (!this.isWx()) return;

        if(!Laya.Browser.window.sharedCanvas._addReference){
            Laya.Browser.window.sharedCanvas._addReference = ()=>{};
        }

        Laya.Browser.window.sharedCanvas.width = 750;
        Laya.Browser.window.sharedCanvas.height = 1334;
        this._shareCanvasTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
    }

    /**
     * 关闭子域渲染
     */
    public closeShareCanvas(wxSprite: Laya.Sprite): void {
        if (this._shareCanvasTexture) {
            //小游戏使用，非常费，每帧刷新
            this._shareCanvasTexture.bitmap.alwaysChange = false;
            wxSprite.graphics.clear();
        }
    }

    /**
     * 打开子域渲染
     */
    public openShareCanvas(wxSprite: Laya.Sprite): void {
        if (this._shareCanvasTexture) {
            //小游戏使用，非常费，每帧刷新
            this._shareCanvasTexture.bitmap.alwaysChange = true;
            wxSprite.graphics.drawTexture(this._shareCanvasTexture, 0, 0, 750, 1334);
        }
    }

}

export const wxManager = new WxManager();