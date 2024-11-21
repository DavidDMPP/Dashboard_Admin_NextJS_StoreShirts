export interface LoginResponse {
    token: string;
    user?: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export const AuthModel = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
      const response = await fetch('https://medieval-jacquenetta-daviddmpp-a0d98830.koyeb.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) throw new Error('Login failed');
      return response.json();
    }
  };