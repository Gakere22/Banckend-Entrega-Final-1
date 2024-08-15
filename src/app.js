import express from 'express'
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import fs from 'fs'
import routerCarts from "./api/carts/api-carts.js"
import routerProducts from './api/products/api-products.js'
import { routerRealTime } from './api/realTime/realTimeProducts.js'
import { Server } from 'socket.io'
import {createInitialBaseCarts} from './gestion-archivos/carts.js'
import{createInitialBaseProducts} from './gestion-archivos/productos.js'
import { Socket } from 'socket.io'
//import socketProductsServer from './listeners/socketProductsServer.js'
//import { socketRealTimePro } from './api/realTime/realTimeProducts.js'
import mongoose from "mongoose"
import productsModel from "./models/productsModel.js"
import cartsModel from "./models/cartsModel.js"






// cuando levantava express con cmmon js 
//const express = require('express');

//const productsRouter = require ("./api/products/api-products.js")
//const cartsRouter = require ("./api/carts/api-carts.js");

//const archivoGeneral = require("./gestion-archivos/general.js");

//const archivoProductos = require ("./gestion-archivos/productos.js");

//const archivoCarts = require("./gestion-archivos/carts.js")

//const { error } = require("console");

//const rutePro = archivoProductos.ruta


//const ruteCart = archivoCarts.ruta


createInitialBaseProducts()

createInitialBaseCarts()


//console.log("levanto la data de productos ")

//console.log("esta es la ruta")

//console.log(rutePro)


//const productos = archivoGeneral.getDataFromFile(rutePro)

//console.log(productos)

//console.log("levanto la data de cart ")

//console.log("esta es la ruta")

//console.log(ruteCart)

//const carts = archivoGeneral.getDataFromFile(ruteCart)

//console.log(carts)

/*
const datos = [
    {name:"nahuel",
     last:"varas"

    },
    {name:"Toro",
    last:"varas"
   
    },
    {name:"Suri",
        last:"varas"
       
        }
]

//const ruta = "C:\archivos bckp\documentos\CODERHOUSE\BACKEND I\PREENTREGA1\src\archivos\productos.json"
const datosJson = JSON.stringify(datos)


//console.log(ruta)

console.log(rute)

const escribir = async (data)=>{
    
    await fs.promises.writeFile(rute, data, "utf8", 0o666,"w")
    console.log("guarde los datos del productos")
    
}



let nro = 0
    while(nro <= 3 ){
        escribir (datosJson)  
        nro++      
    }
*/
/*
const dameData = async (rute)=>{
     const data = await fs.promises.readFile(rute, "utf8","r")
     console.log(data)
     return  JSON.parse(data)
        /*
        if(err){
            console.error(err)
        }else{
            console.log(data)
            return JSON.parse(data)
        }

    }

dameData(rute)
*/

/*
const eliminarArchivo = (ruta)=>{

    fs.unlink(ruta,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("se elimino el archivo ")
        }

    })
}

eliminarArchivo(rute)
*/

const app = express();
app.use(express.json()) // esta linea es para poder enviar inpormacion en el body de la request
app.use(express.urlencoded({extended: true}))  // esta linea es para que la aplicacion entienda los parametros que viajan por la url



app.engine('handlebars', handlebars.engine());
app.set('views',__dirname +'/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname +'/public'))

mongoose.connect("mongodb+srv://nahuelvarasnv:nahuelvaras@cluster0.q7m0ifi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

 .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectar con la base de datos", error)
    })


  


let carro = []

const inicializarProductos = async(inicializarPro)=>{

    try {
        let result = await productsModel.create(inicializarPro)
        console.log( {result})

    } catch (error) {
        
    }
}

let productos=[
    {
        title: 'Termo',
        description: 'Termo de acero inoxidable',
        category: 'infuciones',
        price: 5000,
        status: true,
        stock: 11,
        thumbnalis: 'null',
    },
    {
        title: 'Mate',
        description: 'mate de madera tallado a mano',
        category: 'infuciones',
        price: 1500,
        status: true,
        stock: 10,
        thumbnalis: 'null',
    },
    {
        title: 'Pava',
        description: 'Acero inoxidable',
        category: 'infuciones',
        price: 7000,
        status: true,
        stock: 11,
        thumbnalis: 'null',
    },
    {
        title: 'Matera',
        description: 'Bolso de cuero',
        category: 'infuciones',
        price: 10000,
        status: true,
        stock: 11,
        thumbnalis: 'null',
    },
    {
        title: 'Yerbera',
        description: 'Acero inoxidable',
        category: 'recipuente de acero inoxicable para la yerva',
        price: 7000,
        status: true,
        stock: 15,
        thumbnalis: 'null',
    },
    {
        title: 'Azucarera',
        description: 'Acero inoxidable',
        category: 'infuciones',
        price: 7000,
        status: true,
        stock: 15,
        thumbnalis: 'null',
    },
    {
        title: 'Bombilla',
        description: 'Acero inoxidable',
        category: 'infuciones',
        price: 15000,
        status: true,
        stock: 9,
        thumbnalis: 'null',
    },
    {
        title: 'Galletero',
        description: 'Acero inoxidable',
        category: 'infuciones',
        price: 3000,
        status: true,
        stock: 11,
        thumbnalis: 'null',
    },
    {
        title: 'Comino',
        description: 'Especia fuerte',
        category: 'especia',
        price: 1000,
        status: true,
        stock: 11,
        thumbnalis: 'null',
    },
    {
        title: 'Pimiento Negra',
        description: 'Especia Picante',
        category: 'especia',
        price: 1000,
        status: true,
        stock: 11,
        thumbnalis: 'null',
    },
    {
        title: 'Pimienta Blanca',
        description: 'Especia picante',
        category: 'especia',
        price: 1000,
        status: true,
        stock: 11,
        thumbnalis: 'null',
    },
    {
        title: 'Azafran',
        description: 'Especia fuerte',
        category: 'especia',
        price: 3000,
        status: true,
        stock: 15,
        thumbnalis: 'null',
    },
    {
        title: 'Oregano',
        description: 'Especia Aromatica',
        category: 'especia',
        price: 5000,
        status: true,
        stock: 11,
        thumbnalis: 'null',
    },
    {
        title: 'Romero',
        description: 'Especia Aromatica',
        category: 'especia',
        price: 5000,
        status: true,
        stock: 11,
        thumbnalis: 'null',
    },
    {
        title: 'Tomillo',
        description: 'Especia Aromatica',
        category: 'especia',
        price: 5000,
        status: true,
        stock: 11,
        thumbnalis: 'null',
    },
    {
        title: 'Laurel',
        description: 'Especia Aromatica',
        category: 'especia',
        price: 5000,
        status: true,
        stock: 11,
        thumbnalis: 'null',
    },

]




/*

inicializarProductos(productos)
*/



/*
const consultarProductos = async ()=>{

    try {
        let productos = await productsModel.find()
        console.log(productos)

    } catch (error) {
        
    }

}
    
consultarProductos()
*/

const producto= 
    {
        
        product: '66ba6f6fb2ba2306d7d9679d',
        quantity: 1,
        
    }


let cart = null
const inicializarCarrito = async (pro)=>{

    const cart = new cartsModel({products:[]})    
    cart.products.push(producto)
    console.log("primer carro")
    console.log(cart)
    await cart.save()
   // let result = await cartsModel.create(producto)
    
    
    //console.log(result)

}

/*
inicializarCarrito(producto)
*/

const produ = {
    product: '66ba6f6fb2ba2306d7d9679b',
    quantity: 1,
    
}

const cargarCarro = async (pro)=>{
    let id = '66bc3dd02563a5f57881ffb4'
   try {
        let carro = await cartsModel.findOne({_id: id})
        console.log ("consulto carro")
        console.log (carro)
        carro.products.push(pro)
        if (carro != null){
            let result = await cartsModel.updateOne({_id: id}, carro)
            console.log(result)    
            

        }else{
            console.log("no se encontro el carrito")
        }
   } catch (error) {
    
   }
    
}
/*
cargarCarro(produ)
*/

const consultarCarro = async ()=>{

    let carro = await cartsModel.findOne({_id: '66bc48ab5476186db174504b'}).populate('products.product')
    console.log("cantidad")
   // console.log(carro.products.quantity)
    console.log(JSON.stringify(carro, null, '\t'))
}
/*
consultarCarro()
*/


/*
const consultaPro = async ()=>{

    let result = await productsModel.paginate({price: "1500"},{limit: 10, page:1})
    console.log(result)

    let detale

}

consultaPro()
*/
 
////pruba borrado logico
/*
const buscarPro = async()=>{
    let id = '66ba6f6fb2ba2306d7d9679d'
    let result = await productsModel.updateOne({_id: id},{$set: {status: false}})
    result = await productsModel.find().lean()
    console.log (result.length)
    result =  result.filter(pro => pro.status === false)
       

    console.log(result)    
};

let clave = '66ba6f6fb2ba2306d7d96798'

buscarPro()

*/

// incerter producto
/*
const producto1 ={
    title: 'Azucar  Mascabo',
    description: 'Azucar',
    category: 'saborizante',
    price: 1000,
    status: true,
    stock: 11,
    thumbnalis: 'null'
}

const incertarProd = async (pro)=>{
    const result = await productsModel.collection.insertOne(pro)
    const product = await productsModel.find().lean()
    console.log (product)
    }

incertarProd(producto1)
*/

/*
const prod= {
    title: "Azucar Extra Morena",
    description: "Azucar ",
    category: "saborizantes ",
    price: 2000,
    status: true,
    stock: 11,
    thumbnalis: null

 }
const actualizar = async (id, pro)=>{
    let existe = await productsModel.findById(id)
    console.log(existe)
    if (existe != null){

        let result = await productsModel.updateOne({_id: id},{$set: pro })
        console.log (result)
    console.log("se actualizo el producto")
    }else{
    console.log( "El producto no existe")
    }
    
    }
    let clave = '66bbfbc5b3fa35ecec2283f7'

actualizar(clave, prod) 

*/
const PORT = 8080;



app.use("/", routerProducts);
app.use("/", routerCarts);
app.use("/", routerRealTime);



const httpServer = app.listen(PORT, ()=>(console.log("levanto el servidor")))




/*
const io = new Server(httpServer)


socketProductsServer(io)
socketRealTimePro(io)

*/



