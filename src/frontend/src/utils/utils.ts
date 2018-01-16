export function onlyUnique<T>(objs: T[]): T[] {
    return Array.from(new Set(objs));
}
