const express = require("express");
const route = express.Router();
const { check, validationResult } = require('express-validator');
const newInsurance = require("../app");
route.post(
    "/accept/:no", [
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
        const data=newInsurance.getAgencyGarage(req.params.no);
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
route.post(
    "/reject/:no", [
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
        const data=newInsurance.getAgencyGarage(req.params.no);
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
route.get('/get-agencyGarage/:no',async(req,res)=>{
    if(req.params.no==null||req.params.no.trim().length<=0){
        return res.status(400).json({error: "policyNo is required"});
    }
    try {
        await newInsurance.sync();
        const data=newInsurance.getAgencyGarage(req.params.no);
        console.log(data)
        return res.status(200).json({Claim :data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error:error});
    }
});
route.get('/get-agencyGarage-history/:no',async(req,res)=>{
    if(req.params.no==null||req.params.no.trim().length<=0){
        return res.status(400).json({error: "policyNo is required"});
    }
    try {
        await newInsurance.sync();
        const data=newInsurance.getAgencyGarageHistory(req.params.no);
        console.log(data)
        return res.status(200).json({Claim :data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error:error});
    }
});
module.exports=route;