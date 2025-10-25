export interface ILoginResponse {
   id: number
   username: string
   accessToken: string
   refreshToken: string
}

export interface IRefreshResponse {
   accessToken: string
   refreshToken: string
}
