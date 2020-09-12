import {each} from "lodash";
import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {EAssetsAliases} from "../../enum/EAssetsAliases";
import {TFileLoad} from "../../type/TFileLoad";

export class LoadSubConfigsCommand extends BaseCommand<Model, View> {
    public execute() {
        const files: Array<TFileLoad> = [];
        each(this.model.gameConfig.subConfigs, (subConfig: string) => {
            files.push({
                name: `${EAssetsAliases.SUB_CONFIGS}__${this.replaceSubConfigName(subConfig)}`,
                url: this.model.configPath + subConfig,
            });
        });
        this.model.loader.load(EAssetsAliases.SUB_CONFIGS, files);
    }

    private replaceSubConfigName(name: string): string {
        return name.replace("/", "__").replace(".json", "");
    }
}
