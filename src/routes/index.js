import { Router } from 'express'

const router = Router()

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

router.all("/", (req, res) => {
  res.render('index', {
    title: 'Documento EJS ~ CRUD',
    data
  })
});

router.get('/people', (req, res) => {
  res.json(data)
})

router.get('/people/:id', (req, res) => {
  const dataFound = data.find(person => person.id === parseInt(req.params.id))
  if (!dataFound) return res.status(404).json({"message": "No se encontro el dato"})
  res.send(dataFound)
})

router.post('/people', (req, res) => {
  const newData = {id: data.length + 1,...req.body}
  data.push(newData)
  res.send(newData)
})

router.put('/people/:id', (req, res) => {
  const newData = req.body
  const dataFound = data.find(person => person.id === parseInt(req.params.id))

  if (!dataFound) return res.status(404).json({"message": "No se encontro el dato"})

  data = data.map(person => person.id === parseInt(req.params.id) ? {...person, ...newData} : person)

  res.json({
    message: "Person updated successfully"
  })
})

router.delete('/people/:id', (req, res) => {
  const dataFound = data.find(person => person.id === parseInt(req.params.id))

  if (!dataFound) return res.status(404).json({"message": "No se encontro el dato"})

  data = data.filter(person => person.id !== parseInt(req.params.id))

  res.json({
    message: "Person delete successfully"
  })
})

export default router