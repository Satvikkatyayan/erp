"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRegistry = void 0;
class AbstractRegistry {
    constructor() {
        this.items = new Map();
    }
    register(key, item) {
        if (this.supportsMultipleItemsPerKey()) {
            if (!this.items.has(key)) {
                this.items.set(key, []);
            }
            this.items.get(key).push(item);
        }
        else {
            this.items.set(key, item);
        }
    }
    get(key) {
        if (this.supportsMultipleItemsPerKey()) {
            return this.items.get(key)?.[0];
        }
        return this.items.get(key);
    }
    getAllItems(key) {
        if (this.supportsMultipleItemsPerKey()) {
            return this.items.get(key) || [];
        }
        const item = this.items.get(key);
        return item ? [item] : [];
    }
    getAll() {
        const all = [];
        for (const val of this.items.values()) {
            if (Array.isArray(val)) {
                all.push(...val);
            }
            else {
                all.push(val);
            }
        }
        return all;
    }
    remove(key) {
        this.items.delete(key);
    }
}
exports.AbstractRegistry = AbstractRegistry;
//# sourceMappingURL=abstract.registry.js.map