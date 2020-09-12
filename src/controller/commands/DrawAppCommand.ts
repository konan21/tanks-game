import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {EAssetsAliases} from "../../enum/EAssetsAliases";

export class DrawAppCommand extends BaseCommand<Model, View> {
    public execute() {
        this.model.gameConfig = this.model.loader.resources[EAssetsAliases.GAME_CONFIG].data;
        this.model.setAppSizes();
        this.view.drawApp(this.model.width, this.model.height);
    }
}
