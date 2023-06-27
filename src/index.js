import express from "express";
import morgan from "morgan";

let data = [
  {
    "id": 1,
    "name": "nombre",
    "lastname": "apellido",
    "age": 0,
    "country": "país",
    "hobbies": [
      "run",
      "dance",
      "sing"
    ]
  },
  {
    "id": 2,
    "name": "nombre",
    "lastname": "apellido",
    "age": 0,
    "country": "país",
    "hobbies": [
      "run",
      "dance",
      "sing"
    ]
  },
  {
    "id": 3,
    "name": "nombre",
    "lastname": "apellido",
    "age": 0,
    "country": "país",
    "hobbies": [
      "run",
      "dance",
      "sing"
    ]
  }
]

const app = express();

// settings
app.set('port', 7000)
app.set('nameServer', 'CRUD')

// middleware
app.use(morgan('dev'))
app.use(express.json())

app.all("/", (req, res) => {
  res.json({
    "message": "Hello World"
  })
});

app.get('/people', (req, res) => {
  res.send(data)
})

app.post('/people', (req, res) => {
  const newData = {id: data.length + 1,...req.body}
  data.push(newData)
  res.send(newData)
})

app.put('/people/:id', (req, res) => {
  const newData = req.body
  const dataFound = data.find(person => person.id === parseInt(req.params.id))

  if (!dataFound) return res.status(404).json({"message": "No se encontro el dato"})

  data = data.map(person => person.id === parseInt(req.params.id) ? {...person, ...newData} : person)

  res.json({
    message: "Person updated succesfully"
  })
})

app.delete('/people/:id', (req, res) => {
  const dataFound = data.find(person => person.id === parseInt(req.params.id))
  if (!dataFound) return res.status(404).json({"message": "No se encontro el dato"})
  data = data.filter(person => person.id !== parseInt(req.params.id))
  res.json({
    message: "data delete"
  })
})


app.listen(7000, () => {
  console.log(`Server ${app.get('nameServer')} ready on port ${app.get('port')}`)
});
