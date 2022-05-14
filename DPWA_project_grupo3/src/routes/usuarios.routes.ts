import { create, deleteOne, getAll, getOne, update } from "../controllers/usuarios.controller";
import { Router } from "express";

const router = Router()

router.route('/')
    .get(getAll)
    .post(create)

router.route('/:nombre')
    .get(getOne)
    .put(update)
    .delete(deleteOne)

export default router