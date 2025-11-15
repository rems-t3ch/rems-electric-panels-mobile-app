/**
 * Define the possible states of an electrical panel.
 */
export type PanelState = 'operative' | 'maintenance' | 'out_of_service';

/**
 * Mapping of panel states to their display strings.
 */
export const PANEL_STATES: Record<PanelState, string> = {
  operative: 'OPERATIVE',
  maintenance: 'MAINTENANCE',
  out_of_service: 'OUT OF SERVICE',
};