export type AuthState = {
  authenticated: boolean | undefined;
};

export type LoginForm = {
  username: string;
  password: string;
};

export type LoginRequest = LoginForm;

export type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

export interface AuthResponse {
  authenticated: boolean;
}
