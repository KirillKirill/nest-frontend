export type Decoded = {
  userId: number;
  role: string;
  exp?: number;
  iat?: number;
};

export type RegistrationData = {
  email: string;
  password: string;
  username: string;
};

export type User = {
  id: number | undefined;
  username: string;
  email: string;
  role: string;
  password?: string;
};

export type ErrorResponse = {
  statusCode: number;
  validationErrors: Error[];
};

export type Error = {
  children?: unknown;
  constraints: Record<string, string>;
  property: string;
  target: Record<string, string>;
  value: string;
};
