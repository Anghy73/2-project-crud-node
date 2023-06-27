import express from "express";
import morgan from "morgan";

let data = [
  {
    "id": 1,
    "name": "López",
    "lastname": "Gonzáles",
    "age": 35,
    "country": "Chile",
    "hobbies": [
      "Books",
      "Techno",
      "Biker"
    ]
  },
  {
    "id": 2,
    "name": "Perez",
    "lastname": "Cabrera",
    "age": 29,
    "country": "España",
    "hobbies": [
      "Travel",
      "Dance",
      "Sing"
    ]
  },
  {
    "id": 3,
    "name": "Andy",
    "lastname": "Ruz",
    "age": 18,
    "country": "Chile",
    "hobbies": [
      "Programming",
      "Street workout",
      "Games"
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

app.get('/people/:id', (req, res) => {
  const dataFound = data.find(person => person.id === parseInt(req.params.id))
  if (!dataFound) return res.status(404).json({"message": "No se encontro el dato"})
  res.send(dataFound)
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
    message: "Person updated successfully"
  })
})

app.delete('/people/:id', (req, res) => {
  const dataFound = data.find(person => person.id === parseInt(req.params.id))

  if (!dataFound) return res.status(404).json({"message": "No se encontro el dato"})

  data = data.filter(person => person.id !== parseInt(req.params.id))

  res.json({
    message: "Person delete successfully"
  })
})

app.listen(7000, () => {
  console.log(`Server ${app.get('nameServer')} ready on port ${app.get('port')}`)
});