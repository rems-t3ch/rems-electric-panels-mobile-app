import { ElectricalPanel } from '@/domain/electrical-panel';

/**
 * Electrical Panel Assembler
 * 
 * @summary Transforms API responses to domain entities and prepares payloads for API requests.
 */
export class PanelAssembler {
  /**
   * Convert API resource to domain entity
   */
  static toEntityFromResource(resource: any): ElectricalPanel {
    return new ElectricalPanel({ ...resource });
  }

  /**
   * Convert API response to array of entities
   */
  static toEntitiesFromResponse(response: any): ElectricalPanel[] {
    if (response.status !== 200) {
      return [];
    }

    const resources = response.data.panels || [];
    return resources.map((resource: any) => this.toEntityFromResource(resource));
  }

  /**
   * Convert single entity response
   */
  static toEntityFromResponse(response: any): ElectricalPanel | null {
    if (response.status !== 200 && response.status !== 201) {
      return null;
    }

    return this.toEntityFromResource(response.data);
  }

  /**
   * Convert entity to API payload for creation
   */
  static toPayloadFromEntity(data: {
    name: string;
    location: string;
    brand: string;
    amperage_capacity: number;
    state: string;
    year_manufactured: number;
    year_installed: number;
  }) {
    return {
      name: data.name,
      location: data.location,
      brand: data.brand,
      amperage_capacity: data.amperage_capacity,
      state: data.state,
      year_manufactured: data.year_manufactured,
      year_installed: data.year_installed,
    };
  }

  /**
   * Convert entity to API payload for update
   */
  static toUpdatePayload(data: {
    name?: string;
    location?: string;
    brand?: string;
    amperage_capacity?: number;
    state?: string;
    year_manufactured?: number;
    year_installed?: number;
  }) {
    const payload: any = {};

    if (data.name !== undefined) payload.name = data.name;
    if (data.location !== undefined) payload.location = data.location;
    if (data.brand !== undefined) payload.brand = data.brand;
    if (data.amperage_capacity !== undefined) payload.amperage_capacity = data.amperage_capacity;
    if (data.state !== undefined) payload.state = data.state;
    if (data.year_manufactured !== undefined) payload.year_manufactured = data.year_manufactured;
    if (data.year_installed !== undefined) payload.year_installed = data.year_installed;

    return payload;
  }
}
