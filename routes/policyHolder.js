const express = require("express");
const route = express.Router();
const { check, validationResult } = require('express-validator');
const newInsurance = require("../app");
route.post(
    "/initiate-claim", [
    check("claimId", "claimId is required!").not().isEmpty(),
    check("claimType", "claimType is required!").not().isEmpty(),
    check("repairOption", "repairOption is required!").not().isEmpty(),
    check("incidentDate", "incidentDate is required!").not().isEmpty(),
    check("region", "region is required!").not().isEmpty(),
    check("area", "area is required!").not().isEmpty(),
    check("comments", "comments is required!").not().isEmpty(),
    check("time", "time is required!").not().isEmpty(),
    check("documents", "documents is required!").not().isEmpty(),
    check("policyNo", "policyNo is required!").not().isEmpty(),
    check("policyType", "policyType is required!").not().isEmpty(),
    check("policyValidity", "policyValidity is required!").not().isEmpty(),
    check("carNo", "carNo is required!").not().isEmpty(),
    check("model", "model is required!").not().isEmpty(),
    check("make", "make is required!").not().isEmpty(),
    check("civilId", "civilId is required!").not().isEmpty(),
    check("name", "name is required!").not().isEmpty(),
    check("email", "email is required!").not().isEmpty(),
    check("mobileNo", "mobileNo is required!").not().isEmpty(),

    
],
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors:errors.array()});
    }
    
    try {
        await newInsurance.sync();
        
        
            let newClaim={
                claimId:req.body.claimId,
                claimType:req.body.claimType,
                repairOption:req.body.repairOption,
                incidentDate:req.body.incidentDate,
                region:req.body.region,
                area:req.body.area,
                comments:req.body.comments,
                time:req.body.time,
                documents:req.body.documents,
                policyNo:req.body.policyNo,
                policyType:req.body.policyType,
                policyValidity:req.body.policyValidity,
                carNo:req.body.carNo,
                model:req.body.model,
                make:req.body.make,
                civilId:req.body.civilId,
                name:req.body.name,
                email:req.body.email,
                mobileNo:req.body.mobileNo,
                
               };
               newInsurance.claim(newClaim);
               await newInsurance.sync();
               newInsurance.requestPolicyHolder(newClaim);
               await newInsurance.sync();
               console.log("owner: ",newInsurance.owner);
               console.log("location: ",newInsurance.location);
               console.log("origin: ",newInsurance.origin);
               let txnId=newInsurance.location.slice(0,-3);
               console.log("txnId: ",txnId)
               let obj={
                claimId:req.body.claimId,
                claimType:req.body.claimType,
                repairOption:req.body.repairOption,
                incidentDate:req.body.incidentDate,
                region:req.body.region,
                area:req.body.area,
                comments:req.body.comments,
                time:req.body.time,
                documents:req.body.documents,
                policyNo:req.body.policyNo,
                policyType:req.body.policyType,
                policyValidity:req.body.policyValidity,
                carNo:req.body.carNo,
                model:req.body.model,
                make:req.body.make,
                civilId:req.body.civilId,
                name:req.body.name,
                email:req.body.email,
                mobileNo:req.body.mobileNo,
                txnId:txnId,
               };
             
               newInsurance.appendTxIdClaim(obj);
               await newInsurance.sync();
               newInsurance.appendTxIdPolicyHolder(obj);
               return res.status(200).json({
                msg: "Claim saved in blockchain",
                txnid:txnId,
               });
      
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({Error:error});
    }
   

}
);
route.get('/get-intiated-claim/:id',async(req,res)=>{
    if(req.params.id==null||req.params.id.trim().length<=0){
        return res.status(400).json({error: "policyid is required"});
    }
    try {
        await newInsurance.sync();
        const data=newInsurance.getPolicyHolder(req.params.id);
        console.log(data)
        return res.status(200).json({Claim :data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error:error});
    }
})
route.get('/get-initiated-claim-history/:id',async(req,res)=>{
    if(req.params.id==null||req.params.id.trim().length<=0){
        return res.status(400).json({error: "policyid is required"});
    }
    try {
        await newInsurance.sync();
        const data=newInsurance.getPolicyHolderHistory(req.params.id);
        console.log(data)
        return res.status(200).json({Claim :data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error:error});
    }
})
module.exports=route;