/**
 * 0 - empty line
 * 1 - walls which could be destroyed - small_wall_1.png, small_wall_2.png, small_wall_3.png, small_wall_4.png
 * 2 - walls which couldn't be destroyed - wall.png
 * 3 - watter (not added) - water.png
 * 4 - leaves (not added) - leaves.png
 * 7 - Base "eagle" - eagle.png
 * 8 - Player's tank respawn - tank.png
 * 9 - Enemy's tank respawn - enemy_blue.png, enemy_red.png, enemy_white.png
 */
export enum EEntityType {
    EMPTY_SPACE = 0,
    SMALL_WALL = 1,
    WALL = 2,
    WATER = 3,
    LEAVES = 4,
    EAGLE = 7,
    PLAYER_TANK = 8,
    ENEMY_TANK = 9,
}

export class MapModel {
    // prettier-ignore
    public static readonly tiles: Array<Array<number>> = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 2],
        [2, 2, 2, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 8, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ];

    public static readonly cols: number = MapModel.tiles[0].length; // 36 * 25 = 900
    public static readonly rows: number = MapModel.tiles.length; // 36 * 20 = 720
    // public static readonly tsize: number = 500; // 900x720
    public static readonly countEnemyTanks: number = 6;

    public static getTile(row: number, col: number): number {
        return MapModel.tiles[row][col];
    }
}
