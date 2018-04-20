'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Food = require('./database/collections/food')

const app = express()
const port =  4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/food' , (req, res) => {
  Food.find({}, (err, products) => {
      if (err) return res.status(500).send({message: `Error al realizar la teticion: ${err}`})
      if (!products) return res.status(404).send({message:`No existe el producto`})

      res.send(200, { products })
  })
})

app.get('/api/food/:foodId', (req, res) =>{
     let foodId = req.params.foodId

    Food.findById(foodId, (err, food) => {
        if (err) return res.status(500).send({message:`Error al realizar la peticion ${err}`})
        if (!food) return res.status(404).send({message: `el producto no esxiste`})

        res.status(200).send({ food })
    })
})    

app.post('/api/food', (req, res) =>{
  console.log('POST /api/food')
  console.log(req.body)

  let food = new Food()
  food.name = req.body.name
  food.description = req.body.description
  food.ingrediends = req.body.ingrediends

  food.save((err, productStored) =>{
      if(err) res.status(500).send({messaje: `Error al savar la base de datos:${err}`})

      res.status(200).send({productStored})
  })
})

app.put('/api/food/:foodId', (req, res) =>{

})

app.delete('/api/food/:foodId', (req, res) => {
    let foodId = req.params.foodId

    Food.findById(foodId, (err, food) =>{
        if (err) return res.status(500).send({message:`Error al realizar la petion ${err}`})
        
        food.remove(err =>{ 
            if (err) res.status(500).send({message: `Error al borrar el producto:${err}`})

            res.status(200).send({message: `El prodcuto a sido eliminado`})

        })
    })

})
          
mongoose.connect('mongodb://192.168.99.100:27017/Food', (err, res) => {
    if (err) throw err
    console.log('Conexion a la base de datos establecida..')

    app.listen(port,() => {
        console.log(`API RES corrienso el http://localhost:${port}`)
    })
})
