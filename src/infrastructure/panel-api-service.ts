import { httpClient } from './api/http-client';
import { ElectricalPanel } from '@/domain/electrical-panel';
import { PanelAssembler } from './assemblers/panel.assembler';

/**
 * Panel API Service
 * 
 * @summary Provides methods to interact with the Electrical Panel API.
 */
export class PanelApiService {
  private static readonly BASE_PATH = '/panels';

  /**
   * Get all panels
   */
  static async getAllPanels(): Promise<{ panels: ElectricalPanel[]; total: number }> {
    const response = await httpClient.get(this.BASE_PATH);
    const panels = PanelAssembler.toEntitiesFromResponse(response);
    return {
      panels,
      total: response.data.total || panels.length,
    };
  }

  /**
   * Get panel by ID
   */
  static async getPanelById(id: string): Promise<ElectricalPanel | null> {
    const response = await httpClient.get(`${this.BASE_PATH}/${id}`);
    return PanelAssembler.toEntityFromResponse(response);
  }

  /**
   * Create a new panel
   */
  static async createPanel(data: {
    name: string;
    location: string;
    brand: string;
    amperage_capacity: number;
    state: string;
    year_manufactured: number;
    year_installed: number;
  }): Promise<ElectricalPanel | null> {
    const payload = PanelAssembler.toPayloadFromEntity(data);
    const response = await httpClient.post(this.BASE_PATH, payload);
    return PanelAssembler.toEntityFromResponse(response);
  }

  /**
   * Update a panel
   */
  static async updatePanel(
    id: string,
    data: {
      name?: string;
      location?: string;
      brand?: string;
      amperage_capacity?: number;
      state?: string;
      year_manufactured?: number;
      year_installed?: number;
    }
  ): Promise<ElectricalPanel | null> {
    const payload = PanelAssembler.toUpdatePayload(data);
    const response = await httpClient.put(`${this.BASE_PATH}/${id}`, payload);
    return PanelAssembler.toEntityFromResponse(response);
  }

  /**
   * Delete a panel
   */
  static async deletePanel(id: string): Promise<{ message: string }> {
    const response = await httpClient.delete<{ message: string }>(`${this.BASE_PATH}/${id}`);
    return response.data;
  }
}