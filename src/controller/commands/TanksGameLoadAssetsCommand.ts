import {BaseCommand} from "./BaseCommand";
import {TanksGameModel} from "../../model/TanksGameModel";
import {TanksGameView} from "../../view/TanksGameView";

export class TanksGameLoadAssetsCommand extends BaseCommand<TanksGameModel, TanksGameView> {
  public execute() {
    console.log("COMMAND WAS EXECUTED!!!");
    console.log(this.view);
    console.log(this.model);
  }
}
