// Demo authentication system with localStorage
// Demo credentials: demo@careerforge.com / Demo123!

export interface DemoUser {
  id: string;
  email: string;
  name: string;
}

export interface DemoSession {
  user: DemoUser;
  token: string;
}

const DEMO_CREDENTIALS = {
  email: 'demo@careerforge.com',
  password: 'Demo123!',
};

const SESSION_KEY = 'careerforge_demo_session';

export const demoAuth = {
  login: async (email: string, password: string): Promise<DemoSession | null> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const session: DemoSession = {
        user: {
          id: 'demo-user-123',
          email: DEMO_CREDENTIALS.email,
          name: 'Demo User',
        },
        token: 'demo-token-' + Date.now(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }
    return null;
  },

  signup: async (email: string, password: string, name: string): Promise<DemoSession | null> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo, accept any signup and auto-login
    const session: DemoSession = {
      user: {
        id: 'demo-user-' + Date.now(),
        email,
        name,
      },
      token: 'demo-token-' + Date.now(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(SESSION_KEY);
  },

  getSession: (): DemoSession | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  getDemoCredentials: () => DEMO_CREDENTIALS,
};
