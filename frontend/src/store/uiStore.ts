import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface UIState {
  sidebarOpen: boolean;
  activeModal: string | null;
  modalData: Record<string, unknown> | null;
  loading: boolean;
  loadingMessage: string;
  toasts: Toast[];
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  closeSidebar: () => void;
  openModal: (modalId: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;
  setLoading: (loading: boolean, message?: string) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const uiInitialState: UIState = {
  sidebarOpen: true,
  activeModal: null,
  modalData: null,
  loading: false,
  loadingMessage: '',
  toasts: [],
};

export const useUIStore = create<UIState & UIActions>()(
  devtools(
    persist(
      (set) => ({
        ...uiInitialState,

        toggleSidebar: () =>
          set(
            (state) => ({ sidebarOpen: !state.sidebarOpen }),
            false,
            'ui/toggleSidebar'
          ),

        setSidebarOpen: (open) =>
          set({ sidebarOpen: open }, false, 'ui/setSidebarOpen'),

        closeSidebar: () =>
          set({ sidebarOpen: false }, false, 'ui/closeSidebar'),

        openModal: (modalId, data) =>
          set(
            { activeModal: modalId, modalData: data ?? null },
            false,
            'ui/openModal'
          ),

        closeModal: () =>
          set({ activeModal: null, modalData: null }, false, 'ui/closeModal'),

        setLoading: (loading, message = '') =>
          set(
            { loading, loadingMessage: message },
            false,
            'ui/setLoading'
          ),

        addToast: (toast) =>
          set(
            (state) => ({
              toasts: [
                ...state.toasts,
                { ...toast, id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}` },
              ],
            }),
            false,
            'ui/addToast'
          ),

        removeToast: (id) =>
          set(
            (state) => ({
              toasts: state.toasts.filter((t) => t.id !== id),
            }),
            false,
            'ui/removeToast'
          ),

        clearToasts: () => set({ toasts: [] }, false, 'ui/clearToasts'),
      }),
      {
        name: 'psychora-ui',
        partialize: (state) => ({
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    { name: 'UIStore' }
  )
);
