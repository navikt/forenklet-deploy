export function onlyUnique<T>(objs: T[]): T[] {
    return Array.from(new Set(objs));
}

export function chunk<T>(objs: T[], size: number): T[][] {
    let chunks: T[][] = [];
    for (let x=0; x <= objs.length / size; x++ ) {
        chunks = chunks.concat([objs.slice(size*x, (size*x)+size)]);
    }
    return chunks;
}
