import express from "express";
import morgan from "morgan";
import ejs from "ejs";
import path from "path"
import router from "./routes/index.js";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const app = express();

// settings
app.set('port', 7000)
app.set('nameServer', 'CRUD')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// middleware
app.use(morgan('dev'))
app.use(express.json())

// routing
app.use(router)

app.use('/public', express.static(path.join(__dirname, '/public')))

app.listen(7000, () => {
  console.log(`Server ${app.get('nameServer')} ready on port ${app.get('port')}`)
});