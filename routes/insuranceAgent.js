const express = require("express");
const route = express.Router();
const { check, validationResult } = require('express-validator');
const newInsurance = require("../app");
route.post(
    "/initiate-claim", [
    check("driverName", "driverName is required!").not().isEmpty(),
    check("policyNo", "policyNo is required!").not().isEmpty(),
    check("licenceNo", "licenceNo is required!").not().isEmpty(),
    check("vehicleNo", "vehicleNo is required!").not().isEmpty(),
    check("expiryDate", "expiryDate is required!").not().isEmpty(),
    check("modelNo", "modelNo is required!").not().isEmpty(),
    check("links", "links is required!").not().isEmpty(),
    
],
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors:errors.array()});
    }
    
    try {
        await newInsurance.sync();
        const data=newInsurance.getClaim(req.body.policyNo);
        await newInsurance.sync();
        if(data!=null){
            let newClaim={
                licenceNo:req.body.licenceNo,
                modelNo:req.body.modelNo,
                policyNo:req.body.policyNo,
                vehicleNo:req.body.vehicleNo,
                driverName:req.body.driverName,
                expiryDate:req.body.expiryDate,
                links:req.body.links,
                status:"re-submitted",
               };
               newInsurance.claim(newClaim);
               await newInsurance.sync();
               console.log("owner: ",newInsurance.owner);
               console.log("location: ",newInsurance.location);
               console.log("origin: ",newInsurance.origin);
               let txnId=newInsurance.location.slice(0,-3);
               console.log("txnId: ",txnId)
               let obj={
                licenceNo:req.body.licenceNo,
                modelNo:req.body.modelNo,
                policyNo:req.body.policyNo,
                vehicleNo:req.body.vehicleNo,
                driverName:req.body.driverName,
                expiryDate:req.body.expiryDate,
                links:req.body.links,
                status:"re-submitted",
                txnId:txnId,
               };
             
               newInsurance.appendTxIdClaim(obj);
               return res.status(200).json({
                msg: "Claim saved in blockchain",
                txnid:txnId,
               });
        }else{
            let newClaim={
                licenceNo:req.body.licenceNo,
                modelNo:req.body.modelNo,
                policyNo:req.body.policyNo,
                vehicleNo:req.body.vehicleNo,
                driverName:req.body.driverName,
                expiryDate:req.body.expiryDate,
                links:req.body.links,
               };
               newInsurance.claim(newClaim);
               await newInsurance.sync();
               console.log("owner: ",newInsurance.owner);
               console.log("location: ",newInsurance.location);
               console.log("origin: ",newInsurance.origin);
               let txnId=newInsurance.location.slice(0,-3);
               console.log("txnId: ",txnId)
               let obj={
                licenceNo:req.body.licenceNo,
                modelNo:req.body.modelNo,
                policyNo:req.body.policyNo,
                vehicleNo:req.body.vehicleNo,
                driverName:req.body.driverName,
                expiryDate:req.body.expiryDate,
                links:req.body.links,
                txnId:txnId,
               };
             
               newInsurance.appendTxIdClaim(obj);
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
    "/request-claim/:no", [
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
        const data=newInsurance.getClaim(req.params.no);
        await newInsurance.sync();
       let newClaim={
        licenceNo:data.licenceNo,
        modelNo:data.modelNo,
        policyNo:data.policyNo,
        vehicleNo:data.vehicleNo,
        driverName:data.driverName,
        expiryDate:data.expiryDate,
        links:data.links,
        status:req.body.status,
       };
       newInsurance.claim(newClaim);
       await newInsurance.sync();
       console.log("owner: ",newInsurance.owner);
       console.log("location: ",newInsurance.location);
       console.log("origin: ",newInsurance.origin);
       let txnId=newInsurance.location.slice(0,-3);
       console.log("txnId: ",txnId)
       let obj={
        licenceNo:data.licenceNo,
        modelNo:data.modelNo,
        policyNo:data.policyNo,
        vehicleNo:data.vehicleNo,
        driverName:data.driverName,
        expiryDate:data.expiryDate,
        links:data.links,
        status:req.body.status,
        txnId:txnId,
       };
     
       newInsurance.appendTxIdClaim(obj);
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
route.post(
    "/assign-assessment/:no", [
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
        const data=newInsurance.getClaim(req.params.no);
        await newInsurance.sync();
       let newClaim={
        licenceNo:data.licenceNo,
        modelNo:data.modelNo,
        policyNo:data.policyNo,
        vehicleNo:data.vehicleNo,
        driverName:data.driverName,
        expiryDate:data.expiryDate,
        links:data.links,
        status:req.body.status,
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
        licenceNo:data.licenceNo,
        modelNo:data.modelNo,
        policyNo:data.policyNo,
        vehicleNo:data.vehicleNo,
        driverName:data.driverName,
        expiryDate:data.expiryDate,
        links:data.links,
        status:req.body.status,
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
route.get('/get-claim/:no',async(req,res)=>{
    if(req.params.no==null||req.params.no.trim().length<=0){
        return res.status(400).json({error: "policyNo is required"});
    }
    try {
        await newInsurance.sync();
        const data=newInsurance.getClaim(req.params.no);
        console.log(data)
        return res.status(200).json({Claim :data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error:error});
    }
})
route.get('/get-claim-history/:no',async(req,res)=>{
    if(req.params.no==null||req.params.no.trim().length<=0){
        return res.status(400).json({error: "policyNo is required"});
    }
    try {
        await newInsurance.sync();
        const data=newInsurance.getClaimHistory(req.params.no);
        console.log(data)
        return res.status(200).json({Claim :data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error:error});
    }
})

module.exports=route;