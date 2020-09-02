export interface ITanksGameContext<M, V, C> {
  init(): void;
  getModel(): M;
  getView(): V;
  getController(): C;
  gameLoop(deltaTime: number): void;
}
