import { api } from "../../services/api"
import { IUser } from "./types"

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("u", JSON.stringify(user))
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("u")
  if (!json) return null
  const user = JSON.parse(json)
  return user ?? null
}

export async function LoginRequest(email: string, password: string): Promise<IUser | null> {
  try {
    const request = await fetch("http://localhost:8080/auth/login", {body: JSON.stringify({email, password}), headers: {"Content-Type": "application/json"}, method: "POST"})	
    const response = await request.json()
    return response
  } catch (e: any) {
    return null
  }
}

export async function RegisterRequest(email: string, password: string, name: string, type: string, birthDate: Date, description: string) {
  try {
    const request = await api.post("auth/register", { email, password, name, type, birthDate, description })
    return request.data
  } catch (e: any) {
    return null
  }
}

export async function LogoutRequest() {
  const user = localStorage.getItem("u")
  const refreshToken = JSON.parse(user!)?.refreshToken

  try {
    const request = await api.post("auth/revoke", {"refresh_token": refreshToken})
    return request.data
  } catch (e: any) {
    return null
  }
}


