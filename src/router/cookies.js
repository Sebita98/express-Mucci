import { Router } from "express"

const cookies_router = Router()

//setear una cookie
cookies_router.get('/set', (req, res) => {
    return res.status(200).cookie(
        'nombre_de_la_clave',
        'objeto',
        { maxAge: 200000, signed: true }
    ).json({
        succes: true,
        message: 'cookie seteada'
    })
})

//leer cookie sin firma
cookies_router.get('/', (req, res) => {
    console.log(req);
    return res.status(200).json({
        succes: true,
        cookies: req.signedCookies
    })
})

//leer cookie con firma
cookies_router.get('/get', (req, res) => {
    console.log(req);
    return res.status(200).json({
        succes: true,
        cookies: req.cookies
    })
})


//para borrar una cookie
cookies_router.get('/delete', (req, res) => {
    return res.status(200).clearCookie('nombre_de_la_clave').json({
        success: true,
        message: 'cookie eliminada'
    })
})

//setear cookie con mail
cookies_router.get('/set/:email', (req, res) => {
    const { email } = req.params
    return res.status(200).cookie(
        'user',
        email,
        {
            maxAge: 60000,
            signed: true
        }
    ).json({
        succes: true,
        message: 'cookie seteada'
    })
})

export default cookies_router