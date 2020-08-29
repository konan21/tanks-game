import * as PIXI from "pixi.js";
window.PIXI = PIXI;
import "pixi-spine";
import {Application, Container, Graphics, spine} from "pixi.js";
import Spine = spine.Spine;
import "./index.scss";

class TestGraphics {
	private app: Application;

	constructor() {
		this.init();
	}

	private init() {
		this.app = new Application({
			width: 800,
			height: 600,
			// transparent: true,
			// backgroundColor: 0x86D0F2
		})
		document.getElementById("root").appendChild(this.app.view);
		this.drawLine();
	}

	private drawLine() {
		const line: Graphics = new Graphics();
		line.lineStyle(10, 0xD5402B, 1);
		line.position.x = this.app.screen.width / 2;
		line.position.y = this.app.screen.height / 2;
		line.pivot.set(0, 140);
		line.rotation = 0.785398;
		line.moveTo(5, 0);
		line.lineTo(5, 280);
		this.app.stage.addChild(line);
	}
}

new TestGraphics();
