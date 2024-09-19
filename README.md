# Hash Compare Package

A utility package for hashing objects, comparing object differences, generating patches, merging objects, and versioning.

## Installation

To install the package, use npm:

```bash
npm install hash-compare
```

Replace `hash-compare` with the actual name of your package.

## Functions

`hashObject(obj: Record<string, any> | Record<string, any>[], hashFunction: HashFunction = simpleHash): string`

Hashes an object or an array of objects using a provided hash function.

### Parameters:
- `obj`: The object or array of objects to hash.
- `hashFunction (optional)`: A function that takes a string and returns a hash. Defaults to simpleHash.

### Returns:
A hash string representing the object.

### Example :
```js
import { hashObject } from 'hash-compare';

const obj = { key: 'value' };
const hash = hashObject(obj);
console.log(hash); // Output: hash string
```

`prettyPrintDiff(diff: Record<string, { oldValue: any; newValue: any }>): string`

Formats the differences between two objects into a human-readable string.

### Parameters:
 - `diff`: An object representing the differences.

### Returns:
A formatted string showing the differences.

### Example:
```js
import { prettyPrintDiff } from 'hash-compare';

const diff = { 'key': { oldValue: 'value1', newValue: 'value2' } };
const output = prettyPrintDiff(diff);
console.log(output);
```

`generatePatch(oldObj: Record<string, any>, newObj: Record<string, any>): Record<string, any>`

Generates a patch representing the changes from oldObj to newObj.

###  Parameters:
`oldObj`: The old object.
`newObj`: The new object.

### Returns:
A patch object representing the changes.

### Example:
```js
import { generatePatch } from 'hash-compare';

const oldObj = { key: 'value1' };
const newObj = { key: 'value2' };
const patch = generatePatch(oldObj, newObj);
console.log(patch); // Output: { 'key': 'value2' }
```

`deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any>`

Deeply merges the source object into the target object.

### Parameters:
`target`: The target object to be merged into.
`source`: The source object to merge from.

### Returns:
The merged target object.

### Example:
```js
import { deepMerge } from 'hash-compare';

const target = { key1: 'value1' };
const source = { key2: 'value2' };
const merged = deepMerge(target, source);
console.log(merged); // Output: { key1: 'value1', key2: 'value2' }

```

`addVersion(versionedObjects: VersionedObject[], newObject: Record<string, any>): VersionedObject[]`

Adds a new version of an object to an array of versioned objects.

### Parameters:
`versionedObjects`: An array of versioned objects.
`newObject`: The new object to add.

### Returns:
An updated array with the new version added.


### Example:
```js
import { addVersion } from 'hash-compare';

const versions = [{ version: 1, data: {} }];
const newObject = { key: 'value' };
const updatedVersions = addVersion(versions, newObject);
console.log(updatedVersions);
```

`deepCompare(obj1: Record<string, any> | Array<any>, obj2: Record<string, any> | Array<any>): Record<string, { oldValue: any; newValue: any }>`

Compares two objects or arrays and returns the differences.

### Parameters:
`obj1`: The first object or array.
`obj2`: The second object or array.


### Returns:
An object representing the differences.


### Example:

```js
import { deepCompare } from 'hash-compare';

const obj1 = { key: 'value1' };
const obj2 = { key: 'value2' };
const diff = deepCompare(obj1, obj2);
console.log(diff); // Output: { 'key': { oldValue: 'value1', newValue: 'value2' } }
```

