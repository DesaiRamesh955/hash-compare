import { inspect } from 'util';


const simpleHash = (data: string): string => {
    let hash = 0;
    if (data.length === 0) return hash.toString(16);

    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = (hash << 5) - hash + char; // hash * 31 + char
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString(16);
}

type HashFunction = (data: string) => string;

export const hashObject = (
    obj: Record<string, any> | Record<string, any>[],
    hashFunction: HashFunction = simpleHash
): string => {
    const jsonString = JSON.stringify(obj, Object.keys(obj).sort()); // Ensure consistent key order
    return hashFunction(jsonString);
}

export const prettyPrintDiff = (diff: Record<string, { oldValue: any; newValue: any }>): string => {
    return Object.entries(diff).map(([path, { oldValue, newValue }]) => {
        return `Path: ${path}\nOld Value: ${inspect(oldValue, { depth: null })}\nNew Value: ${inspect(newValue, { depth: null })}\n`;
    }).join('\n');
}
export const generatePatch = (
    oldObj: Record<string, any>,
    newObj: Record<string, any>
): Record<string, any> => {
    const patch: Record<string, any> = {};

    const createPatch = (a: any, b: any, path: string = '') => {
        if (a === b) return;

        if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
            if (Array.isArray(a) !== Array.isArray(b)) {
                patch[path] = b;
                return;
            }

            const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
            for (const key of keys) {
                createPatch(a[key], b[key], path ? `${path}.${key}` : key);
            }
        } else {
            patch[path] = b;
        }
    }

    createPatch(oldObj, newObj);
    return patch;
}
export const deepMerge = (target: Record<string, any>, source: Record<string, any>): Record<string, any> => {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && !(source[key] instanceof Array)) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            deepMerge(target[key], source[key]);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
    }
    return target;
}

interface VersionedObject {
    version: number;
    data: Record<string, any>;
}

export const addVersion = (
    versionedObjects: VersionedObject[],
    newObject: Record<string, any>
): VersionedObject[] => {
    const latestVersion = versionedObjects.length > 0
        ? Math.max(...versionedObjects.map(v => v.version))
        : 0;

    return [...versionedObjects, { version: latestVersion + 1, data: newObject }];
}


export const deepCompare = (
    obj1: Record<string, any> | Array<any>,
    obj2: Record<string, any> | Array<any>
): Record<string, { oldValue: any; newValue: any }> => {
    const diff: Record<string, { oldValue: any; newValue: any }> = {};

    const compare = (
        a: any,
        b: any,
        path: string = ''
    ) => {
        if (a === b) return;

        if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
            if (Array.isArray(a) !== Array.isArray(b)) {
                diff[path] = { oldValue: a, newValue: b };
                return;
            }

            const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
            for (const key of keys) {
                compare(a[key], b[key], path ? `${path}.${key}` : key);
            }
        } else {
            diff[path] = { oldValue: a, newValue: b };
        }
    }

    compare(obj1, obj2);
    return diff;
}
