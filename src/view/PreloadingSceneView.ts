import {isNil} from "lodash";
import {Application, Graphics, Text, TextStyle} from "pixi.js";
import {SceneView} from "./SceneView";

export class PreloadingSceneView extends SceneView {
    private _innerBar: Graphics;
    private OFFSET: number = 25;
    private INNER_BAR_OFFSET: number = 2;
    private BAR_SIZES: {width: number; height: number} = {
        width: 290,
        height: 24,
    };

    constructor(app: Application) {
        super("Preloading", app);
        this.addText();
        this.addProgressBar();
    }

    public updateProgressBar(percentage: number): void {
        if (this._innerBar.width !== this.BAR_SIZES.width - this.INNER_BAR_OFFSET * 2) {
            const result: number =
                percentage !== 0 ? (this.BAR_SIZES.width * percentage) / 100 - this.INNER_BAR_OFFSET * 2 : 0;
            this.drawInnerBar(result);
        }
    }

    private addProgressBar(): void {
        const borderBar: Graphics = new Graphics();
        borderBar.beginFill(0x4c4c4c);
        borderBar.drawRect(
            this._app.screen.width / 2 - this.BAR_SIZES.width / 2,
            this._app.screen.height / 2 + this.OFFSET,
            this.BAR_SIZES.width,
            this.BAR_SIZES.height
        );
        borderBar.endFill();
        this.display.addChild(borderBar);

        this.drawInnerBar(0);
        this.display.addChild(this._innerBar);
    }

    private drawInnerBar(width: number): void {
        if (isNil(this._innerBar)) {
            this._innerBar = new Graphics();
        } else {
            this._innerBar.clear();
        }
        this._innerBar.beginFill(0xacacac);
        this._innerBar.drawRect(
            this._app.screen.width / 2 + this.INNER_BAR_OFFSET - this.BAR_SIZES.width / 2,
            this._app.screen.height / 2 + this.INNER_BAR_OFFSET + this.OFFSET,
            width,
            this.BAR_SIZES.height - this.INNER_BAR_OFFSET * 2
        );
        this._innerBar.endFill();
    }

    private addText(): void {
        const styles: TextStyle = new TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fontStyle: "italic",
            fontWeight: "bold",
            fill: 0xffffff,
        });
        // better to have all texts in one place, and get needed translation by key
        const loadingText: Text = new Text("Loading...", styles);
        loadingText.position.x = this._app.screen.width / 2;
        loadingText.position.y = this._app.screen.height / 2 - this.OFFSET;
        loadingText.anchor.set(0.5);
        this.display.addChild(loadingText);
    }
}
