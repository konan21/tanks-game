export type TKey = {
    value: string;
    isDown: boolean;
    isUp: boolean;
    press: Function | undefined;
    release: Function | undefined;
    downHandler?(event: KeyboardEvent): void;
    upHandler?(event: KeyboardEvent): void;
    unsubscribe?(event: KeyboardEvent): void;
};

export function keyboard(value: string) {
    let key: TKey = {
        value: value,
        isDown: false,
        isUp: true,
        press: undefined,
        release: undefined,
    };

    // The `downHandler`
    key.downHandler = (event: KeyboardEvent) => {
        if (event.key === key.value) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    // The `upHandler`
    key.upHandler = (event: KeyboardEvent) => {
        if (event.key === key.value) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    // Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}
