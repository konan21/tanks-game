import {each} from "lodash";
import {Signal} from "signals";
import {IResourceDictionary, Loader} from "pixi.js";
import {TFileLoad} from "../type/TFileLoad";

export class ProxyLoader {
    public onAssetsLoaded: Signal = new Signal();
    private _loader: Loader = Loader.shared;
    private _queue: Array<{alias: string; files: Array<TFileLoad>}> = [];
    private _alias: string;

    constructor() {
        this.initLoaderEvents();
    }

    public get progress(): number {
        return this._loader.progress;
    }

    public get resources(): IResourceDictionary {
        return this._loader.resources;
    }

    public load(alias: string, files: Array<TFileLoad>): void {
        if (!this._loader.loading) {
            each(files, (file: TFileLoad) => {
                this._loader.add(file.name.toLowerCase(), file.url, {crossOrigin: true}, file.cb);
            });
            this._alias = alias;
            this._loader.load();
        } else {
            this._queue.push({alias: alias, files: files});
            console.warn(`Alias with name ${alias} already exist! It can't be added to Loader Queue`);
        }
    }

    public initLoaderEvents(): void {
        this._loader.onProgress.add((loader: Loader) => {
            console.log(`${this._alias} loading: ${loader.progress}%`);
        }, this);

        this._loader.onError.add((error: Error) => {
            console.log(error);
        }, this);

        this._loader.onComplete.add(() => {
            this.onAssetsLoaded.dispatch(this._alias);
            if (this._queue.length) {
                const nextFilesForLoad = this._queue.shift();
                this.load(nextFilesForLoad.alias, nextFilesForLoad.files);
            }
        }, this);
    }
}
