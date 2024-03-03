const express = require('express');
const router = express.Router();  
const Person = require('../models/person.models');

router.post('/', async(req, res) => {
    try{
        const data = req.body   //assuming the request body contains the person data
        console.log(data);
        const newPerson = new Person(data)  //create a new person document using the mongoose model

        const response = await newPerson.save()  //save the new person to the database

        console.log('Data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

router.get('/', async(req, res) => {
    try{
        const data = await Person.find();
        res.status(200).json(data);
        console.log('Data is: ' , data);
    }
    catch(err){
        console.log(`Error is : `, err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

router.get('/:work', async(req, res) => {
    try{
        const work = req.params.work;
        if(work == 'chef' || work == 'waiter' || work == 'manager'){
            const response = await Person.find({work: work});
            console.log('data is fetched');
            res.status(200).json(response);
        }
        else{
            res.status(400).json({
                error:"ERROR 404 Not Found !!!" 
            });
        }
    }
    catch{
        console.log(`Can't Access the link pls check the backend`);
        res.send(500).json({
            error: "Internal Server Error "
        })
    }
})

router.put('/:id', async(req, res) => {
    try{
        const personId = req.params.id; //extract the id from url
        const updatedPersonData = req.body; //updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,  //return the updated document
            runValidators: true //run mongoose validation 
        })

        if(!response){
            return res.status(404).json({
                error: "Person not found"
            })
        }

        console.log(`Data Updated`);
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        console.log('Response is :', response);
        if(!response){
            return res.status(404).json({
                error: 'Person id not found'
            });
        }
        console.log('Data delete');
        res.status(200).json({
            message: 'Data deleted successfully'
        });
    }
    catch(err){
        console.log('Error is : ', err);
        res.status(500).json({
            error : 'Internal Server Error : '
        })
    }
})


module.exports = router;
