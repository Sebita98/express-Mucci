import { Router } from "express";
import { Router } from "express";
import messages_router from "./messages";

const views_router = Router()

views_router.use(
    "/code",
    messages_router
)

const router = Router()

router.get(
    '/',
    async (req, res) => {
        try {
            return res.render(
                'index', //nomrbe de la vista
                { //datos dinamicos que puede llegar a necestiar la vista
                    name: 'seba',
                    last_name: 'mucci',
                    alumnos: ['nico', 'ale', 'flor'],
                    title: 'index'
                } 
            )
        } catch (error) {
            next(error)
        }
    }
)

export default router