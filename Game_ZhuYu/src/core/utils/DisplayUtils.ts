export default class DisplayUtils {

    /**
     * 创建text文本
     *
     * @param xPos
     * @param yPos
     * @param size
     * @param width
     * @param parent
     * @param color
     * @param align
     */
    public static createText(xPos, yPos, size, width = 0, parent = null , color = "#ffffff", align = Laya.Stage.ALIGN_CENTER) {
        let text = new Laya.Text();
        text.font = "Microsoft YaHei";
        text.fontSize = size;
        text.pos(xPos, yPos);
        text.wordWrap = true;
        if (width != 0) {
            text.width = width;
        }
        text.align = align;
        text.color = color;
        if (parent) {
            parent.addChild(text);
        }
        return text;
    }

    /**
     * 创建一个Image控件
     *
     * @param xPos
     * @param yPos
     * @param textureUrl
     * @param parent
     */
    public static createImage(xPos, yPos, textureUrl, parent = null) {
        let image = new Laya.Image();
        if (textureUrl) {
            this.imageToTexture(textureUrl, image);
        }
        image.pos(xPos, yPos);
        if (image.source) {
            image.size(image.source.sourceWidth, image.source.sourceHeight);
        }
        if (parent) {
            parent.addChild(image);
        }
        return image;
    }

    /**
     * 给Image控件赋值textureUrl地址纹理
     *
     * @param textureUrl
     * @param image
     */
    public static imageToTexture(textureUrl: string, image: Laya.Image) {
        let texture = Laya.loader.getRes(textureUrl);
        if (texture) {
            image.source = texture;
        }
        else {
            let res = [{"url": textureUrl, "type": Laya.Loader.IMAGE}];
            Laya.loader.load(res, Laya.Handler.create(null, () => {
                if (!image.destroyed) {
                    image.source = Laya.loader.getRes(textureUrl);
                }
            }));
        }
    }

}