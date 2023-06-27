import express from "express";
import morgan from "morgan";
import router from "./routes/index.js";

const app = express();

// settings
app.set('port', 7000)
app.set('nameServer', 'CRUD')

// middleware
app.use(morgan('dev'))
app.use(express.json())

// routing
app.use(router)

app.listen(7000, () => {
  console.log(`Server ${app.get('nameServer')} ready on port ${app.get('port')}`)
});