import {IModel} from "../../interface/IModel";
import {IView} from "../../interface/IView";

export class BaseCommand<M extends IModel, V extends IView> {
    private _model: M;
    private _view: V;

    constructor(model: M, view: V) {
        this.init(model, view);
    }

    public execute(): void {}

    protected get model(): M {
        return this._model;
    }

    protected get view(): V {
        return this._view;
    }

    private init(model: M, view: V): void {
        this._model = model;
        this._view = view;
    }
}
