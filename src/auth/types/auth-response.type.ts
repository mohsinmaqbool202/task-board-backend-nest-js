export interface AuthTokenResponse {
    access_token: string;
  }
  
  export interface AuthLoginResponse {
    access_token: AuthTokenResponse;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      organizationId: string;
    };
  }