import {isNil} from "lodash";
import {TanksGameContext} from "../TanksGameContext";
import {ITanksGameView} from "../interface/ITanksGameView";
import {ITanksGameModel} from "../interface/ITanksGameModel";
import {ITanksGameContext} from "../interface/ITanksGameContext";
import {ITanksGameController} from "../interface/ITanksGameController";
import {ITanksGameCommand} from "../interface/ITanksGameCommand";

export class TanksGameController implements ITanksGameController {
    private _context: TanksGameContext;
    private _commands: Map<string, Function> = new Map(); // {[id: string]: Function};
    private _executedCommands: Map<string, ITanksGameCommand> = new Map(); // {[id: string]: ITanksGameCommand};

    constructor(context: TanksGameContext) {
        this._context = context;
    }

    public get context(): TanksGameContext {
        return this._context;
    }

    public set context(value: TanksGameContext) {
        this._context = value;
    }

    public executeCommand(alias: string): void {
        if (!this.hasCommand(alias)) {
            throw new Error("Can't execute command! It should be registered first.");
        }
        let command: ITanksGameCommand;
        if (!isNil(this._executedCommands.get(alias))) {
            command = this._executedCommands.get(alias);
        } else {
            const commandConstructor: any = this._commands.get(alias);
            command = new commandConstructor(this._context.getModel(), this._context.getView());
            this._executedCommands.set(alias, command);
        }
        command.execute();
    }

    public registerCommand(alias: string, classImplementation: Function): void {
        if (this.hasCommand(alias)) {
            throw new Error(`Command already registered ${alias}`);
        }
        this._commands.set(alias, classImplementation);
    }

    public hasCommand(alias: string): boolean {
        return !isNil(this._commands.get(alias));
    }
}
