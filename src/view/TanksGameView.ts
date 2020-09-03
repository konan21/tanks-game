import {ITanksGameView} from "../interface/ITanksGameView";
import {TPixiAppOptions} from "../type/TPixiAppOptions";
import {Application, Container, Graphics, spine} from "pixi.js";
import Spine = spine.Spine;

export class TanksGameView implements ITanksGameView {
    private _app: Application;

    constructor(options?: TPixiAppOptions) {
        this.init();
    }

    public framesUpdate(deltaTime: number): void {}

    private init() {
        this._app = new Application();
        // this.app = new Application({
        //   width: 800,
        //   height: 600,
        //   // transparent: true,
        //   // backgroundColor: 0x86D0F2
        // });
        document.getElementById("root").appendChild(this._app.view);

        const graphics: Graphics = new Graphics();
        graphics.beginFill(0xde3249);
        graphics.drawRect(50, 50, 100, 100);
        graphics.endFill();
        graphics.name = "My Rect";
        this._app.stage.addChild(graphics);

        // this.drawLine();
    }

    // private drawLine() {
    //   const line: Graphics = new Graphics();
    //   line.lineStyle(10, 0xd5402b, 1);
    //   line.position.x = this.app.screen.width / 2;
    //   line.position.y = this.app.screen.height / 2;
    //   line.pivot.set(0, 140);
    //   line.rotation = 0.785398;
    //   line.moveTo(5, 0);
    //   line.lineTo(5, 280);
    //   this.app.stage.addChild(line);
    // }
}
