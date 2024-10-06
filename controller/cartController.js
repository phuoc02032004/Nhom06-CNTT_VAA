const cart = require('../models/cart')

exports.getAll = async (req, res) =>{
    const data = await cart.findAll()
    if(data){
    res.status(201).json(data);
    }else{
        console.log("cannot find items")
    }
}

exports.getById = async (req, res) =>{
    const id = req.query.id;
    if(id){
        const data = await cart.findById(id);
        if(data){
            res.status(201).json(data);
        }else{
            console.log("cannot find item");
        }
    }
}


