import { seedRandom, randRange, getSeedFromString } from './utils';

export function getMockToggle(name: string, successrate: number) {
    seedRandom(getSeedFromString(name));
    return {
        name,
        enabled: randRange(0, 100) <= successrate
    };
}
