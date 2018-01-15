import * as qs from 'query-string';

export function delayed(time: number, response: any) {
    return () => new Promise((resolve) => setTimeout(() => resolve(response), time));
}

export function respondWith(handler: any) {
    return (url: string, config: any, extra: any) => {
        const queryParams = qs.parse(qs.extract(url));
        const bodyParams = config && config.body && JSON.parse(config.body);

        let response;

        if (typeof handler === 'function') {
            response = handler(url, config, { queryParams, bodyParams, extra });
        } else {
            response = handler; // Trust me, its data
        }

        /* tslint:disable */
        console.groupCollapsed(url);
        console.groupCollapsed('config');
        console.log('url', url);
        console.log('config', config);
        console.log('queryParams', queryParams);
        console.log('bodyParams', bodyParams);
        console.log('extra', extra);
        console.groupEnd();

        console.log('response', response);
        console.groupEnd();
        /* tslint:enable */
        return response;
    };
}

let seed = 42;
export function seedRandom(newSeed: number) {
    seed = newSeed;
}

export function random(): number {
    const x = Math.sin(seed++) * 100000;
    return x - Math.floor(x);
}

export function randRange(fromInclusive: number, toExclusive: number): number {
    const range = toExclusive - fromInclusive;
    return (Math.floor(random() * 10000) % range) + fromInclusive;
}

export function getSeedFromString(text: string): number {
    return text.split('')
        .map((c: string) => c.charCodeAt(0))
        .reduce((sum: number, elem: number) => sum+elem, 0);
}
