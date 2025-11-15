import { PanelState } from './electrical-panel-states';

/**
 * Electrical Panel Domain Entity
 * 
 * @summary
 * Represents an electrical panel with its properties and state.
 * 
 * @property id - Unique identifier for the panel
 * @property name - Name of the panel
 * @property location - Physical location of the panel
 * @property brand - Brand of the panel
 * @property amperage_capacity - Amperage capacity of the panel
 * @property state - Current state of the panel
 * @property year_manufactured - Year the panel was manufactured
 * @property year_installed - Year the panel was installed
 */
export class ElectricalPanel {
  id: string;
  name: string;
  location: string;
  brand: string;
  amperage_capacity: number;
  state: PanelState;
  year_manufactured: number;
  year_installed: number;

  constructor(data: {
    id: string;
    name: string;
    location: string;
    brand: string;
    amperage_capacity: number;
    state: PanelState;
    year_manufactured: number;
    year_installed: number;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.location = data.location;
    this.brand = data.brand;
    this.amperage_capacity = data.amperage_capacity;
    this.state = data.state;
    this.year_manufactured = data.year_manufactured;
    this.year_installed = data.year_installed;
  }
}