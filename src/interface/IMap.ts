export interface IMap {
    readonly cols: number;
    readonly rows: number;
    readonly tsize: number;
    readonly tiles: Array<Array<number>>;
    getTile(row: number, col: number): number;
}
