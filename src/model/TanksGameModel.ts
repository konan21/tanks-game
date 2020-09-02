import {ITanksGameModel} from "../interface/ITanksGameModel";

export class TanksGameModel implements ITanksGameModel {
  public width: number;
  public height: number;
  public deltaTime: number;

  constructor() {
    this.width = 768;
    this.height = 1024;
  }
}
