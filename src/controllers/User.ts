import { Request, Response } from "express"
import knex from "@/database/connection"

function User() {

  const store = async (req: Request, res: Response) => {
    const { email, name, password } = req.body

    if (!email && !name && !password)
      return res.status(400).json({ msg: "Dados inválidos!", ...req.body })

    const response = await knex("Users").where({ email })
    if (response.length > 0)
      return res.status(400).json({ msg: "Já existe um cadastro com esse email!" })

    knex("Users")
      .insert({ email, name, password })
      .then(data => res.status(201).json(data))
      .catch(err => {
        console.log(err)
        return res.status(400).json({ msg: "Não foi possivel realizar o cadastro." })
      })
  }

  return {
    store
  }
}

export default User()