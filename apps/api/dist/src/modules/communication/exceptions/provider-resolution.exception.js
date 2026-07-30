"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderResolutionException = void 0;
class ProviderResolutionException extends Error {
    constructor(channel, capabilities, message = 'No eligible provider found') {
        super(`Provider Resolution Failed: ${message}. Channel: ${channel}`);
        this.name = 'ProviderResolutionException';
        this.requestedChannel = channel;
        this.requestedCapabilities = capabilities;
    }
}
exports.ProviderResolutionException = ProviderResolutionException;
//# sourceMappingURL=provider-resolution.exception.js.map