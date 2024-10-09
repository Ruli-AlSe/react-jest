import { stat } from "fs"

export const loginService = async (email: string, password: string) => {
  try {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    const res = await response.json()
    if (!res.rejected) {
      return {
        ok: true,
        status: 200,
      }
    } else {
      return {
        ok: false,
        status: 401,
      }
    }
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error,
    }
  }
}
