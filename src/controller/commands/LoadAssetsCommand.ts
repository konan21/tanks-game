import {each} from "lodash";
import {BaseCommand} from "./BaseCommand";
import {Model} from "../../model/Model";
import {View} from "../../view/View";
import {EAssetsAliases} from "../../enum/EAssetsAliases";
import {TFileLoad} from "../../type/TFileLoad";
import {LoaderResource} from "pixi.js";
import {EAssetsNames} from "../../enum/EAssetsNames";

export class LoadAssetsCommand extends BaseCommand<Model, View> {
    private _files: Array<TFileLoad> = [];

    public execute() {
        each(this.model.loader.resources, (resource: LoaderResource) => {
            if (resource.name !== EAssetsAliases.GAME_CONFIG) {
                if (resource.name.includes("atlas_names")) {
                    this.addFilesToLoad(resource.data, EAssetsNames.SPRITESHEETS);
                } else if (resource.name.includes("sound_names")) {
                    this.addFilesToLoad(resource.data, EAssetsNames.SOUNDS);
                }
            }
        });
        this.model.loader.load(EAssetsAliases.GAME_ASSETS, this._files);
    }

    private addFilesToLoad(data: any, folderName: string): void {
        for (let dataKey in data) {
            if (data.hasOwnProperty(dataKey)) {
                this._files.push({
                    name: folderName === EAssetsNames.SOUNDS ? `sound_${dataKey}` : dataKey,
                    url: this.model.assetsPath + folderName + "/" + data[dataKey],
                });
            } else {
                console.warn(`Can't load assets, because loader.resource.data haven't ${dataKey} property`);
            }
        }
    }
}
