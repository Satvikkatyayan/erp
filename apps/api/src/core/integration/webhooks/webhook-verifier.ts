import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class WebhookVerifier {
  private readonly logger = new Logger(WebhookVerifier.name);
  private idempotencyCache = new Set<string>();

  verify(payload: string, headers: any, secret: string) {
    // 1. Signature
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    if (headers['x-signature'] !== expectedSignature) {
        throw new Error('Invalid Webhook Signature');
    }
    
    // 2. Idempotency
    const idempotencyKey = headers['x-idempotency-key'];
    if (idempotencyKey) {
        if (this.idempotencyCache.has(idempotencyKey)) {
            throw new Error('Idempotent Replay Detected - Dropping Payload');
        }
        this.idempotencyCache.add(idempotencyKey);
    }
    
    // 3. Replay Protection (Timestamp)
    const ts = parseInt(headers['x-timestamp'], 10);
    if (Date.now() - ts > 300000) { // 5 mins
        throw new Error('Webhook Timestamp expired (Replay Attack)');
    }
    
    this.logger.debug('Webhook Verified Successfully.');
    return true;
  }
}