const updateDelay = 1000 / 60;
let lastMs = 0;

export function delay(func: () => void): Promise<unknown> {
    const currentMs = Date.now();
    if (lastMs + updateDelay < currentMs) {
        lastMs = currentMs;
        func();
        return new Promise(resolve => setTimeout(resolve, 0))
    }
    return Promise.resolve();
}