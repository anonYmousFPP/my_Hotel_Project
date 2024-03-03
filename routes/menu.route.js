const express = require('express');
const router = express.Router();  
const Menu = require('../models/menu.models');

router.post('/', async(req, res) => {
    try{
        const data = req.body;
        const menuHotel = new Menu(data);
        const response = await menuHotel.save();
        console.log("Menu data is :", response);
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: "Internal server error"
        })
    }
})

router.get('/', async(req, res) => {
    try{
        const data = await Menu.find();
        res.status(200).json(data);
        console.log('Data is : ', data);
    }
    catch(err){
        console.log('Error is :', err);
        res.status(500).json({
            error:"Internal Server Error"
        });
    }
})

router.get('/:taste', async(req, res) => {
    try{
        const data = req.params.taste;
        if(data == 'sweet' || data == 'spicy' || data == 'sour'){

            // const response = await Person.find({work: work});
            // console.log('data is fetched');
            // res.status(200).json(response);


            const response = await Menu.find({taste: data});
            console.log('data is fetched');
            res.status(200).json(response);
        }
        else{
            res.status(400).json({
                error:"ERROR 404 Not Found !!!" 
            });
        }
    }
    catch(err){
        console.log('Your Error is: ', err);
        res.status(500).json({
            error: "This cause an error",
        })
    }
})


router.put('/:id', async(req, res) => {
    
    try{
        const menuId = req.params.id;
        const updatedMenu = req.body;
        const response = await Menu.findByIdAndUpdate(menuId, updatedMenu, {
            new: true,
            runValidators: true
        })

        if(!response){
            console.log(response);      // it print the null
            return res.status(404).json({
                error: "this menu id is not found"
            })
        }

        console.log('Data is updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log('Error is : ', err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})










































router.delete('/:id', async(req, res) => {
    try{
        const menuId = req.params.id;

        const response = await Menu.findByIdAndDelete(menuId);

        if(!response){
            console.log(err);
            res.status(404).json({
                Message: 'Menu Id not found'
            })
        }
        
        console.log(menuId, ' id is deleted');
        res.status(200).json({
            response
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})

module.exports = router;















