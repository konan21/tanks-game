export abstract class AbstractState<C> {
  public context: C; // state identity context - determining state transition logic

  constructor(context: C) {
    this.context = context;
  }

  /**
   * use for transition effects
   */
  public abstract onEnter(): void;

  /**
   * use for transition effects and/or
   * memory management - call a destructor method to clean up object
   * references that the garbage collector might not think are ready,
   * such as cyclical references between objects and arrays that
   * contain the objects
   */
  public abstract onLeave(): void;
}
