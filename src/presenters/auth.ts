import { AuthModel, LoginCredentials, LoginResponse } from '../models/auth';

export interface AuthView {
  setLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  onLoginSuccess: (response: LoginResponse) => void;
}

export class AuthPresenter {
  constructor(private view: AuthView) {}

  async handleLogin(credentials: LoginCredentials) {
    try {
      this.view.setLoading(true);
      this.view.setError('');
      const response = await AuthModel.login(credentials);
      if (response.token) {
        this.view.onLoginSuccess(response);
      } else {
        this.view.setError('Login gagal');
      }
    } catch (error) {
      this.view.setError('Email atau password salah');
    } finally {
      this.view.setLoading(false);
    }
  }
}