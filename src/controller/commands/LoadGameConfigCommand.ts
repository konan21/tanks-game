import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {EAssetsAliases} from "../../enum/EAssetsAliases";

export class LoadGameConfigCommand extends BaseCommand<Model, View> {
    public execute() {
        this.model.loader.load(EAssetsAliases.GAME_CONFIG, [
            {
                name: EAssetsAliases.GAME_CONFIG,
                url: this.model.configPath + this.model.gameConfigName,
            },
        ]);
    }
}
