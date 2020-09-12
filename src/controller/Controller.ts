import {isNil} from "lodash";
import {Context} from "../Context";
import {IController} from "../interface/IController";
import {ICommand} from "../interface/ICommand";

export class Controller implements IController {
    private _context: Context;
    private _commands: Map<string, Function> = new Map(); // {[id: string]: Function};
    private _executedCommands: Map<string, ICommand> = new Map(); // {[id: string]: ICommand};

    constructor(context: Context) {
        this._context = context;
    }

    public get context(): Context {
        return this._context;
    }

    public set context(value: Context) {
        this._context = value;
    }

    public executeCommand(alias: string): void {
        if (!this.hasCommand(alias)) {
            throw new Error("Can't execute command! It should be registered first.");
        }
        let command: ICommand;
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
