
const Food = require('../../../database/collections/food')
const mongoose = require('mongoose')
const connect = require('../../../database/collections/connect')
const express = require('express')
const router = require('./index')



router.get('/food' , (req, res) => {
  Food.find({}, (err, products) => {
      if (err) return res.status(500).send({message: `Error al realizar la teticion: ${err}`})
      if (!products) return res.status(404).send({message:`No existe el producto`})

      res.send(200, { products })
  })
})

router.get('/food/:foodId', (req, res) =>{
     let foodId = req.params.foodId

    Food.findById(foodId, (err, food) => {
        if (err) return res.status(500).send({message:`Error al realizar la peticion ${err}`})
        if (!food) return res.status(404).send({message: `el producto no esxiste`})

        res.status(200).send({ food })
    })
})    

router.post('/food', (req, res) =>{
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

router.put('/food/:foodId', (req, res) =>{

})

router.delete('/food/:foodId', (req, res) => {
    let foodId = req.params.foodId

    Food.findById(foodId, (err, food) =>{
        if (err) return res.status(500).send({message:`Error al realizar la petion ${err}`})
        
        food.remove(err =>{ 
            if (err) res.status(500).send({message: `Error al borrar el producto:${err}`})

            res.status(200).send({message: `El prodcuto a sido eliminado`})
        })
    })
})

module.exports = router;