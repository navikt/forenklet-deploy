
// tslint:disable-next-line:no-console
const consoleError = (console && console.error) || (() => null);

export function logError(error: any) {
    consoleError(error);
}
