const mongoose = require("mongoose")
const cors = require ("cors")

const db = require ("./database")

const app = express()

app.use(cors())
app.use(express.json())

app.listen(8080, ()=> {
    console.log("server funcionando en el puerto 8080");
    db()
})

export default app;