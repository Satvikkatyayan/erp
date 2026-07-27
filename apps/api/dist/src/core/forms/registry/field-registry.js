"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRegistry = void 0;
const common_1 = require("@nestjs/common");
let FieldRegistry = class FieldRegistry {
    constructor() {
        this.fields = new Map();
        this.register({
            type: 'TEXT',
            defaultConfig: { maxLength: 255 },
            accessibility: { role: 'textbox', ariaRequired: false },
            serialize: (val) => String(val || '')
        });
        this.register({
            type: 'NUMBER',
            defaultConfig: { min: 0 },
            accessibility: { role: 'spinbutton', ariaRequired: false },
            serialize: (val) => Number(val || 0)
        });
        this.register({
            type: 'REPEATABLE_GROUP',
            defaultConfig: { minItems: 0, maxItems: 10 },
            accessibility: { role: 'group' },
            serialize: (val) => Array.isArray(val) ? val : []
        });
    }
    register(def) { this.fields.set(def.type, def); }
    get(type) { return this.fields.get(type); }
};
exports.FieldRegistry = FieldRegistry;
exports.FieldRegistry = FieldRegistry = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FieldRegistry);
//# sourceMappingURL=field-registry.js.map