export interface IController {
    executeCommand(alias: string): void;
    registerCommand(alias: string, classImplementation: Function): void;
    hasCommand(alias: string): boolean;
}
