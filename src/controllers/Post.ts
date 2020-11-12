import { Request, Response } from "express"
import knex from "@/database/connection"

function Post() {

  const store = async (req: Request, res: Response) => {
    const { title, text, user_id } = req.body

    if (!title && !text && !user_id)
      return res.status(400).json({ msg: "Dados inválidos!", ...req.body })

    knex("Post")
      .insert({
        title,
        text,
        user_id,
        visible: false,
        aproved: false,
        deleted: false
      })
      .then(data => res.status(201).json(data))
      .catch(err => {
        console.log(err)
        return res
          .status(400)
          .json({ msg: "Não foi possivel realizar o cadastro." })
      })
  }

  const index = async (req: Request, res: Response) => {
    const { user_id } = req.params
    knex("Post")
      .where({ user_id })
      .andWhere("deleted", false)
      .then(data => res.status(201).json(data))
      .catch(err => {
        console.log(err)
        return res
          .status(400)
          .json({ msg: "Não foi possivel realizar o cadastro." })
      })
  }

  const listAll = async (req: Request, res: Response) => {
    knex("Post")
      .where("deleted", false)
      .andWhere("visible", true)
      .andWhere("aproved", true)
      .then(data => res.status(201).json(data))
      .catch(err => {
        console.log(err)
        return res
          .status(400)
          .json({ msg: "Não foi possivel realizar o cadastro." })
      })
  }

  const solicitations = (req: Request, res: Response) => {
    knex("Post")
      .where("aproved", false)
      .andWhere("deleted", false)
      .then(data => res.status(201).json(data))
      .catch(err => {
        console.log(err)
        return res
          .status(400)
          .json({ msg: "Não foi possivel listas as solicitações." })
      })
  }

  const show = async (req: Request, res: Response) => {
    const { post_id } = req.params
    knex("Post")
      .where({ id: post_id })
      .andWhere("deleted", false)
      .then(([data]) => res.status(201).json(data))
      .catch(err => {
        console.log(err)
        return res
          .status(400)
          .json({ msg: "Não foi possivel listar os dados do post." })
      })
  }

  const changedVisible = async (req: Request, res: Response) => {
    const { id, visible } = req.body
    knex("Post")
      .where({ id })
      .update({ visible })
      .then(data => res.status(201).json(data))
      .catch(err => {
        console.log(err)
        return res
          .status(400)
          .json({ msg: "Não foi possivel realizar o cadastro." })
      })
  }

  const changedAproved = async (req: Request, res: Response) => {
    const { id, aproved } = req.body
    knex("Post")
      .where({ id })
      .update({ aproved })
      .then(data => res.status(201).json(data))
      .catch(err => {
        console.log(err)
        return res
          .status(400)
          .json({ msg: "Não foi possivel realizar o cadastro." })
      })
  }

  const changedDelete = async (req: Request, res: Response) => {
    const { id, deleted } = req.body
    knex("Post")
      .where({ id })
      .update({ deleted })
      .then(data => res.status(201).json(data))
      .catch(err => {
        console.log(err)
        return res
          .status(400)
          .json({ msg: "Não foi possivel realizar o cadastro." })
      })
  }

  const update = async (req: Request, res: Response) => {
    const { title, text, id } = req.body

    if ((!title && !text) || !id)
      return res.status(400).json({ msg: "Dados inválidos!", ...req.body })

    let DataUpdate = {}
    if (title) DataUpdate = { title }
    if (text) DataUpdate = { text, ...DataUpdate }

    console.log(DataUpdate, id)

    knex("Post")
      .where({ id })
      .update({ ...DataUpdate })
      .then(data => res.status(201).json(data))
      .catch(err => {
        console.log(err)
        return res
          .status(400)
          .json({ msg: "Não foi possivel atualiza o post." })
      })
  }

  return {
    store,
    show,
    index,
    update,
    listAll,
    solicitations,
    changedVisible,
    changedAproved,
    changedDelete,
  }
}

export default Post()
