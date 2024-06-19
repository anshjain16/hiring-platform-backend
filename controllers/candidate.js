const Candidate = require('../models/schema')
const getallcandidates = async(req,res)=>{
    try{
        const candidate = await Candidate.find({})
        res.status(200).json({candidate});
    }
    catch(error){
         res.status(500).json({msg:error})
    }
}

const candidateregistration = async(req,res)=>{
    try{
        const candidate = await Candidate.create(req.body)
        res.status(201).json({ candidate });
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

const getcandidate = async(req,res)=>{
    try{
        const {id:candidateId} = req.params;
        const candidate = await Candidate.findOne({_id:candidateId})
        if(!candidate){
            return res.status(404).json({msg:`No candidate with ID :${candidateId}`})
        }
        res.status(200).json({candidate});
       
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}