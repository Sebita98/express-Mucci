const { Router } = require('express')
const {fork} = require('child_process')
const { sendMail } = require('../utils/sendMail')
const { sendSms, sendWhatsapp } = require('../utils/sendSms')
const compression = require('express-compression')

const router = Router()


router.use(compression({
    brotli:{
        enabled: true,
        zlib:{}
    }
}))
router.get('/stringlargo', (req,res)=>{
    let string = `hola coders, soy un string largo`
    for(let i=0; i< 5e4; i++){
        string +=`hola coders, soy un string largo`
    }
    res.send(string)
})

router.get('/mockuser', (req,res)=>{
    let users = []
    for (let i = 0; i < 100; i++) {
        users.push(generateUsers())
        
    }
    res.send({
        status: 'success',
        payload: users
    })
})

router.get('/mail', async (req,res)=> {
    await sendMail()
    res.send('Email enviado')
})

router.get('/sms', async (req,res)=> {
    await sendSms('Fede', 'Osandón')       
    res.send('SMS enviado')
})
router.get('/chat', async (req,res)=> {  
    await sendWhatsapp('Fede', 'Osandón')    
    res.send('SMS enviado')
})



module.exports = router