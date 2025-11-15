import { useState, useCallback } from 'react';
import { ElectricalPanel } from '@/domain/electrical-panel';
import { PanelApiService } from '@/infrastructure/panel-api-service';

/**
 * Single hook for managing Electronic Panels
 *
 * @summary
 * Provides all CRUD operations for electronic panels with loading and error states.
 *
 * @returns Hook methods and state for electronic panels operations
 */
export const useElectronicPanel = () => {
  /**
   * State management
   */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Panels data state
   */
  const [panels, setPanels] = useState<ElectricalPanel[]>([]);
  const [currentPanel, setCurrentPanel] = useState<ElectricalPanel | null>(null);

  /**
   * Fetch all panels
   */
  const fetchPanels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await PanelApiService.getAllPanels();
      setPanels(response.panels);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch panels';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch a single panel by ID
   */
  const fetchPanelById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const panel = await PanelApiService.getPanelById(id);
      setCurrentPanel(panel);
      return panel;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch panel';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new panel
   */
  const createPanel = useCallback(
    async (data: {
      name: string;
      location: string;
      brand: string;
      amperage_capacity: number;
      state: string;
      year_manufactured: number;
      year_installed: number;
    }) => {
      setLoading(true);
      setError(null);
      try {
        const newPanel = await PanelApiService.createPanel(data);
        if (newPanel) {
          setPanels((prev) => [...prev, newPanel]);
        }
        return newPanel;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to create panel';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Update an existing panel
   */
  const updatePanel = useCallback(
    async (
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
    ) => {
      setLoading(true);
      setError(null);
      try {
        const updatedPanel = await PanelApiService.updatePanel(id, data);
        if (updatedPanel) {
          setPanels((prev) => prev.map((panel) => (panel.id === id ? updatedPanel : panel)));
          if (currentPanel?.id === id) {
            setCurrentPanel(updatedPanel);
          }
        }
        return updatedPanel;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to update panel';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [currentPanel]
  );

  /**
   * Delete a panel
   */
  const deletePanel = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await PanelApiService.deletePanel(id);
        setPanels((prev) => prev.filter((panel) => panel.id !== id));
        if (currentPanel?.id === id) {
          setCurrentPanel(null);
        }
        return result;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to delete panel';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [currentPanel]
  );

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Clear current panel state
   */
  const clearCurrentPanel = useCallback(() => {
    setCurrentPanel(null);
  }, []);

  return {
    panels,
    currentPanel,
    loading,
    error,

    fetchPanels,
    fetchPanelById,
    createPanel,
    updatePanel,
    deletePanel,
    clearError,
    clearCurrentPanel,
  };
};
