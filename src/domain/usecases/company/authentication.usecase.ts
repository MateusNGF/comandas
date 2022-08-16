export interface AuthenticationCompany {
  auth(input : AuthenticationCompany.inputCredentials) : Promise<AuthenticationCompany.AccessCredentials>
}

export namespace AuthenticationCompany {
  export interface inputCredentials {
    email : string
    password : string
  }

  export interface AccessCredentials {
    token : string
  }
}