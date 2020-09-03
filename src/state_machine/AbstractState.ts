export abstract class AbstractState<M, V> {
    protected model: M;
    protected view: V;

    constructor(model: M, view: V) {
        this.model = model;
        this.view = view;
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
