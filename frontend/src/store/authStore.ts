import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'professor' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

const authInitialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        ...authInitialState,

        setUser: (user) =>
          set(
            { user, isAuthenticated: !!user },
            false,
            'auth/setUser'
          ),

        setAuthenticated: (value) =>
          set({ isAuthenticated: value }, false, 'auth/setAuthenticated'),

        setLoading: (loading) =>
          set({ isLoading: loading }, false, 'auth/setLoading'),

        logout: () => set(authInitialState, false, 'auth/logout'),
      }),
      {
        name: 'psychora-auth',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);
