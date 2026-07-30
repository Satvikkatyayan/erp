import { RenderResult } from '../services/template-rendering.service';

export interface CommunicationProviderInterface {
  send(payload: RenderResult): Promise<void>;
}
