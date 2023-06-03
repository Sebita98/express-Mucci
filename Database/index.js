const mongoose = required("mongoose")
const cors = required ("cors")

const db = required ("./database")

const app = express()

app.use(cors())
app.use(express.json())

app.listen(8080, ()=> {
    console.log("server funcionando en el puerto 8080");
    db()
})

export default app;