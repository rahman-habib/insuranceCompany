const express = require("express");
const route = express.Router();
const { check, validationResult } = require('express-validator');
const newInsurance = require("../app");

route.post(
    "/claim-status/:id", [
    check("status", "status is required!").not().isEmpty()
    
    
],
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors:errors.array()});
    }
    
    try {
        await newInsurance.sync();
        const data=newInsurance.getClaim(req.params.id);
        await newInsurance.sync();
        if(req.body.status.status=="approve")
        {
            let newClaim={
                claimId:data.claimId,
                claimType:data.claimType,
                repairOption:data.repairOption,
                incidentDate:data.incidentDate,
                region:data.region,
                area:data.area,
                comments:data.comments,
                time:data.time,
                documents:data.documents,
                policyNo:data.policyNo,
                policyType:data.policyType,
                policyValidity:data.policyValidity,
                carNo:data.carNo,
                model:data.model,
                make:data.make,
                civilId:data.civilId,
                name:data.name,
                email:data.email,
                mobileNo:data.mobileNo,
                status:req.body.status.status,
                internalComments:req.body.status.internalComments,
                externalComments:req.body.status.externalComments
               };
               let newClaim1={
                claimId:data.claimId,
                claimType:data.claimType,
                repairOption:data.repairOption,
                incidentDate:data.incidentDate,
                region:data.region,
                area:data.area,
                comments:data.comments,
                time:data.time,
                documents:data.documents,
                policyNo:data.policyNo,
                policyType:data.policyType,
                policyValidity:data.policyValidity,
                carNo:data.carNo,
                model:data.model,
                make:data.make,
                civilId:data.civilId,
                name:data.name,
                email:data.email,
                mobileNo:data.mobileNo,
                status:req.body.status.status,
                externalComments:req.body.status.externalComments
               };
               newInsurance.claim(newClaim);
               await newInsurance.sync();
               newInsurance.requestPolicyHolder(newClaim1);
               await newInsurance.sync();
               console.log("owner: ",newInsurance.owner);
               console.log("location: ",newInsurance.location);
               console.log("origin: ",newInsurance.origin);
               let txnId=newInsurance.location.slice(0,-3);
               console.log("txnId: ",txnId)
               let obj={
                claimId:data.claimId,
                claimType:data.claimType,
                repairOption:data.repairOption,
                incidentDate:data.incidentDate,
                region:data.region,
                area:data.area,
                comments:data.comments,
                time:data.time,
                documents:data.documents,
                policyNo:data.policyNo,
                policyType:data.policyType,
                policyValidity:data.policyValidity,
                carNo:data.carNo,
                model:data.model,
                make:data.make,
                civilId:data.civilId,
                name:data.name,
                email:data.email,
                status:req.body.status.status,
                mobileNo:data.mobileNo,
                internalComments:req.body.status.internalComments,
                externalComments:req.body.status.externalComments,
                txnId:txnId,
               };
               let obj1={
                claimId:data.claimId,
                claimType:data.claimType,
                repairOption:data.repairOption,
                incidentDate:data.incidentDate,
                region:data.region,
                area:data.area,
                comments:data.comments,
                time:data.time,
                documents:data.documents,
                policyNo:data.policyNo,
                policyType:data.policyType,
                policyValidity:data.policyValidity,
                carNo:data.carNo,
                model:data.model,
                make:data.make,
                civilId:data.civilId,
                name:data.name,
                email:data.email,
                mobileNo:data.mobileNo,
                status:req.body.status.status,
                externalComments:req.body.status.externalComments,
                txnId:txnId,
               };
             
               newInsurance.appendTxIdClaim(obj);
               await newInsurance.sync();
               newInsurance.appendTxIdPolicyHolder(obj1);
               return res.status(200).json({
                msg: "Claim saved in blockchain",
                txnid:txnId,
               });
        }else if(req.body.status.status=="reject")
        {
            let newClaim={
                claimId:data.claimId,
                claimType:data.claimType,
                repairOption:data.repairOption,
                incidentDate:data.incidentDate,
                region:data.region,
                area:data.area,
                comments:data.comments,
                time:data.time,
                documents:data.documents,
                policyNo:data.policyNo,
                policyType:data.policyType,
                policyValidity:data.policyValidity,
                carNo:data.carNo,
                model:data.model,
                make:data.make,
                civilId:data.civilId,
                name:data.name,
                email:data.email,
                mobileNo:data.mobileNo,
                status:req.body.status.status,
                rejectionReasion:req.body.status.rejectionReasion,
                internalComments:req.body.status.internalComments,
                externalComments:req.body.status.externalComments
               };
               let newClaim1={
                claimId:data.claimId,
                claimType:data.claimType,
                repairOption:data.repairOption,
                incidentDate:data.incidentDate,
                region:data.region,
                area:data.area,
                comments:data.comments,
                time:data.time,
                documents:data.documents,
                policyNo:data.policyNo,
                policyType:data.policyType,
                policyValidity:data.policyValidity,
                carNo:data.carNo,
                model:data.model,
                make:data.make,
                civilId:data.civilId,
                name:data.name,
                email:data.email,
                mobileNo:data.mobileNo,
                status:req.body.status.status,
                rejectionReasion:req.body.status.rejectionReasion,
                externalComments:req.body.status.externalComments
               };
               newInsurance.claim(newClaim);
               await newInsurance.sync();
               newInsurance.requestPolicyHolder(newClaim1);
               await newInsurance.sync();
               console.log("owner: ",newInsurance.owner);
               console.log("location: ",newInsurance.location);
               console.log("origin: ",newInsurance.origin);
               let txnId=newInsurance.location.slice(0,-3);
               console.log("txnId: ",txnId)
               let obj={
                claimId:data.claimId,
                claimType:data.claimType,
                repairOption:data.repairOption,
                incidentDate:data.incidentDate,
                region:data.region,
                area:data.area,
                comments:data.comments,
                time:data.time,
                documents:data.documents,
                policyNo:data.policyNo,
                policyType:data.policyType,
                policyValidity:data.policyValidity,
                carNo:data.carNo,
                model:data.model,
                make:data.make,
                civilId:data.civilId,
                name:data.name,
                email:data.email,
                status:req.body.status.status,
                mobileNo:data.mobileNo,
                rejectionReasion:req.body.status.rejectionReasion,
                internalComments:req.body.status.internalComments,
                externalComments:req.body.status.externalComments,
                txnId:txnId,
               };
               let obj1={
                claimId:data.claimId,
                claimType:data.claimType,
                repairOption:data.repairOption,
                incidentDate:data.incidentDate,
                region:data.region,
                area:data.area,
                comments:data.comments,
                time:data.time,
                documents:data.documents,
                policyNo:data.policyNo,
                policyType:data.policyType,
                policyValidity:data.policyValidity,
                carNo:data.carNo,
                model:data.model,
                make:data.make,
                civilId:data.civilId,
                name:data.name,
                email:data.email,
                mobileNo:data.mobileNo,
                status:req.body.status.status,
                rejectionReasion:req.body.status.rejectionReasion,
                externalComments:req.body.status.externalComments,
                txnId:txnId,
               };
             
               newInsurance.appendTxIdClaim(obj);
               await newInsurance.sync();
               newInsurance.appendTxIdPolicyHolder(obj1);
               return res.status(200).json({
                msg: "Claim saved in blockchain",
                txnid:txnId,
               });
        }
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({Error:error});
    }
   

}
);
route.post(
    "/assign-To-Garage/:id", [
    check("status", "status is required!").not().isEmpty()
    
    
],
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors:errors.array()});
    }
    
    try {
        await newInsurance.sync();
        const data=newInsurance.getClaim(req.params.id);
        await newInsurance.sync();
      
            let newClaim={
                claimId:data.claimId,
                claimType:data.claimType,
                repairOption:data.repairOption,
                incidentDate:data.incidentDate,
                region:data.region,
                area:data.area,
                comments:data.comments,
                time:data.time,
                documents:data.documents,
                policyNo:data.policyNo,
                policyType:data.policyType,
                policyValidity:data.policyValidity,
                carNo:data.carNo,
                model:data.model,
                make:data.make,
                civilId:data.civilId,
                name:data.name,
                email:data.email,
                mobileNo:data.mobileNo,
                status:req.body.status,
                internalComments:data.internalComments,
                externalComments:data.externalComments
               };
            
               newInsurance.claim(newClaim);
               await newInsurance.sync();
               newInsurance.requestAgencyGarage(newClaim);
               await newInsurance.sync();
               console.log("owner: ",newInsurance.owner);
               console.log("location: ",newInsurance.location);
               console.log("origin: ",newInsurance.origin);
               let txnId=newInsurance.location.slice(0,-3);
               console.log("txnId: ",txnId)
               let obj={
                claimId:data.claimId,
                claimType:data.claimType,
                repairOption:data.repairOption,
                incidentDate:data.incidentDate,
                region:data.region,
                area:data.area,
                comments:data.comments,
                time:data.time,
                documents:data.documents,
                policyNo:data.policyNo,
                policyType:data.policyType,
                policyValidity:data.policyValidity,
                carNo:data.carNo,
                model:data.model,
                make:data.make,
                civilId:data.civilId,
                name:data.name,
                email:data.email,
                status:req.body.status,
                mobileNo:data.mobileNo,
                internalComments:data.internalComments,
                externalComments:data.externalComments,
                txnId:txnId,
               };
              
             
               newInsurance.appendTxIdClaim(obj);
               await newInsurance.sync();
               newInsurance.appendTxIdAgencyGarage(obj);
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




route.get('/get-claim/:id',async(req,res)=>{
    if(req.params.id==null||req.params.id.trim().length<=0){
        return res.status(400).json({error: "policyid is required"});
    }
    try {
        await newInsurance.sync();
        const data=newInsurance.getClaim(req.params.id);
        console.log(data)
        return res.status(200).json({Claim :data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error:error});
    }
})
route.get('/get-claim-history/:id',async(req,res)=>{
    if(req.params.id==null||req.params.id.trim().length<=0){
        return res.status(400).json({error: "policyid is required"});
    }
    try {
        await newInsurance.sync();
        const data=newInsurance.getClaimHistory(req.params.id);
        console.log(data)
        return res.status(200).json({Claim :data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error:error});
    }
})

module.exports=route;