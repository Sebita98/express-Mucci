import { Router } from "express";

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