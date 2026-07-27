"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = void 0;
const common_1 = require("@nestjs/common");
const local_provider_1 = require("./providers/local.provider");
const s3_provider_1 = require("./providers/s3.provider");
const quota_engine_1 = require("./policy/quota.engine");
const lifecycle_engine_1 = require("./lifecycle/lifecycle.engine");
const platform_storage_sdk_1 = require("./sdk/platform-storage.sdk");
let StorageModule = class StorageModule {
};
exports.StorageModule = StorageModule;
exports.StorageModule = StorageModule = __decorate([
    (0, common_1.Module)({
        providers: [
            local_provider_1.LocalStorageProvider,
            s3_provider_1.S3StorageProvider,
            quota_engine_1.QuotaEngine,
            lifecycle_engine_1.LifecycleEngine,
            platform_storage_sdk_1.PlatformStorageSDK
        ],
        exports: [platform_storage_sdk_1.PlatformStorageSDK]
    })
], StorageModule);
//# sourceMappingURL=storage.module.js.map