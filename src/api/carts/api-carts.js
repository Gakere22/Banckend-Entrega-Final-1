import express from 'express'
import cartsModel from '../../models/cartsModel.js'
import fs from 'fs'

import { ruta, getNextId, saveCartsOnFile,} from '../../gestion-archivos/carts.js'

import  {getDataFromFile} from '../../gestion-archivos/general.js'
import productsModel from '../../models/productsModel.js'


//const express = require("express")


const routerCarts = express.Router() 


//const archivoCarts = require("../../gestion-archivos/carts.js")

//const archivoGeneral = require("../..//gestion-archivos/general.js")





/*
routerCarts.post("/carts", (req,res)=>{
    
    res.json({message:" se dio de alta"}) //devoverl con estatus

})
*/

routerCarts.post("/carts/:cid/products/:pid",async(req,res)=>{
    const cId = req.params.cid;
    const id = req.params.pid
    
    
   try {
    const cart = await cartsModel.findById(cId)
    if(cart){
        const existe = await productsModel.findById(id)
        //const indexPro = await productsModel.findIndex(p => p._id === id)
        if(existe){
            console.log(" controlo stock")
            console.log(existe)
            let index = cart.products.findIndex( p =>  p.product.toString() === id)
            console.log(index)
            if(index != -1){
                cart.products[index].quantity++
                await cart.save()
                res.json({message: " se actualizo la cantidad del producto "})
            }else{
                let pro = { product: id, quantity: 1}
                cart.products.push(pro)
                await cart.save()
                res.json({message: " se agrego el producto"})
            }
            existe.stock --
            //console.log(" e reduce el estoc")
           // console.log(existe)
           let result =  await productsModel.updateOne({_id : id},{$set: existe})
           // console.log(result)
        }else{
            res.json({message: " el producto no existe"})
        }
        
    }else{
        res.json({message: " identificador de carrito no existe"})
    }
    


   } catch (error) {
            console.error(error)    
   }
    
})

routerCarts.get("/carts", async(req,res)=> {
    
    const carts = await cartsModel.find().populate('products.product')

    console.log (carts)
    res.json({message: "trae los carritos"})
     
})

//modifica la esctructura de datos del carrito
routerCarts.get("/carts/:cid", async (req,res)=>{
    const cId = req.params.cid
   
   try {
    const carrito = await cartsModel.findById(cId).populate('products.product')
    //let carro = await cartsModel.findOne({_id: '66bc48ab5476186db174504b'}).populate('products.product') 
    if (carrito){    
        console.log("muestro carrito con detalle de productos")
        console.log(JSON.stringify(carrito, null, '\t'))
      
        res.render("carrito", carrito)
        }else{
            res.json({message: "el id del carrito no exixte"})
        }
   } catch (error) {
        console.error(error)
   }
    
    
})

routerCarts.delete("/carts/:cid/products/:pid",  async  (req,res)=>{
    const id = req.params.pid
    const cid = req.params.cid
    
    //console.log("del id del producto")
    //console.log(id)

   
    const carrito = await cartsModel.findById(cid)
    
    if (carrito){
        
        const carritoActualizado = carrito.products.filter (p=> p.product.toString() !== id)
        carrito.products = carritoActualizado

        await carrito.save()
        const product = await productsModel.findById(id)
      //  console.log(product.stock)
        product.stock++
      //  console.log("despues de la eliminacion ")
      //  console.log(product.stock)
        let result = await productsModel.updateOne({_id: id},{$set: product})
     //   console.log(result)
        res.json({message:"se elimino el produto de su carrito"})
    }
    


})

routerCarts.delete("/carts/:cid", async(req, res )=>{

    const cid = req.params.cid

    const carrito = await cartsModel.findById(cid)
  //  console.log(carrito)
    carrito.products = []
    await carrito.save()
   // console.log(carrito)
    res.json({message: " carrito vacio"})

})

/*
router.get("/carts", (req,res)=>{


})
    */
   
export default routerCarts