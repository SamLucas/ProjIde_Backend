import { Request, Response } from "express"
import knex from "@/database/connection"

function Login() {

  const store = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email && !password)
      return res.status(400).json({ msg: "Dados inválidos!", ...req.body })

    const [response] = await knex("Users").where({ email, password })

    if (response.length === 0)
      return res.status(400).json({ msg: "Usuario não encontrado" })
    else
      return res.status(200).json(response)
  }

  return {
    store
  }
}

export default Login()