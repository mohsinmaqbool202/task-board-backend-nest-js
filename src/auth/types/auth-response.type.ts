export interface AuthTokenResponse {
    access_token: string;
  }
  
  export interface AuthLoginResponse {
    access_token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      organizationId: string;
    };
  }