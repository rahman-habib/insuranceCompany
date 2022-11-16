const express = require("express");
const route = express.Router();
const { check, validationResult } = require('express-validator');
const newInsurance = require("../app");
route.post(
    "/reject/:id", [
    check("status", "if (reject)=>Rejection Reasion ,Remarks , Status is required!").not().isEmpty()
    
    
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
                status:req.body.status.status,
                internalComments:data.internalComments,
                externalComments:data.externalComments,
                remarks:req.body.status.remarks,
                rejectionReasion:req.body.status.rejectionReasion
            };
       
       newInsurance.requestAgencyGarage(newClaim);
       await newInsurance.sync();
       newInsurance.claim(newClaim);
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
        mobileNo:data.mobileNo,
        status:req.body.status.status,
        internalComments:data.internalComments,
        externalComments:data.externalComments,
        remarks:req.body.status.remarks,
        rejectionReasion:req.body.status.rejectionReasion,
        txnId:txnId,
       };
     
      
       newInsurance.appendTxIdAgencyGarage(obj);
       await newInsurance.sync();
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
    "/initial-estimate/:id", [

    check("parts", "parts is required!").not().isEmpty(),
    check("services", "services is required!").not().isEmpty(),
    check("estimate_day_no", "estimate_day_no is required!").not().isEmpty()
    
    
],
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors:errors.array()});
    }
    
    try {
        await newInsurance.sync();
        const data=newInsurance.getAgencyGarage(req.params.id);
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
                internalComments:data.internalComments,
                externalComments:data.externalComments,
                status:req.body.status,
                parts:req.body.parts,
                services:req.body.services,
                estimate_day_no:req.body.estimate_day_no
            };
               
               newInsurance.requestAgencyGarage(newClaim);
               await newInsurance.sync();
               newInsurance.claim(newClaim);
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
                mobileNo:data.mobileNo,
                internalComments:data.internalComments,
                externalComments:data.externalComments,
                status:req.body.status,
                parts:req.body.parts,
                services:req.body.services,
                estimate_day_no:req.body.estimate_day_no,
                txnId:txnId,
               };
             
              
               newInsurance.appendTxIdAgencyGarage(obj);
               await newInsurance.sync();
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

route.post(
    "/delivery-ready/:id", [
    check("status", "status is required!").not().isEmpty(),
    check("remarks", "remarks is required!").not().isEmpty(),
    check("deliveryReadyFor", "deliveryReadyFor is required!").not().isEmpty()


],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await newInsurance.sync();
            const data = newInsurance.getAgencyGarage(req.params.id);
            await newInsurance.sync();

            let newClaim = {
                claimId: data.claimId,
                claimType: data.claimType,
                repairOption: data.repairOption,
                incidentDate: data.incidentDate,
                region: data.region,
                area: data.area,
                comments: data.comments,
                time: data.time,
                documents: data.documents,
                policyNo: data.policyNo,
                policyType: data.policyType,
                policyValidity: data.policyValidity,
                carNo: data.carNo,
                model: data.model,
                make: data.make,
                civilId: data.civilId,
                name: data.name,
                email: data.email,
                mobileNo: data.mobileNo,
                internalComments: data.internalComments,
                externalComments: data.externalComments,
                netTotal: data.netTotal,
                koPay: data.koPay,
                parts: data.parts,
                services: data.services,
                estimate_day_no: data.estimate_day_no,
                status: req.body.status,
                remarks: req.body.remarks,
                deliveryReadyFor: req.body.deliveryReadyFor
                
            };

            newInsurance.claim(newClaim);
            await newInsurance.sync();
            newInsurance.requestPolicyHolder(newClaim);
            await newInsurance.sync();
            newInsurance.requestAgencyGarage(newClaim);
            await newInsurance.sync();
            console.log("owner: ", newInsurance.owner);
            console.log("location: ", newInsurance.location);
            console.log("origin: ", newInsurance.origin);
            let txnId = newInsurance.location.slice(0, -3);
            console.log("txnId: ", txnId)
            let obj = {
                claimId: data.claimId,
                claimType: data.claimType,
                repairOption: data.repairOption,
                incidentDate: data.incidentDate,
                region: data.region,
                area: data.area,
                comments: data.comments,
                time: data.time,
                documents: data.documents,
                policyNo: data.policyNo,
                policyType: data.policyType,
                policyValidity: data.policyValidity,
                carNo: data.carNo,
                model: data.model,
                make: data.make,
                civilId: data.civilId,
                name: data.name,
                email: data.email,
                mobileNo: data.mobileNo,
                internalComments: data.internalComments,
                externalComments: data.externalComments,
                netTotal: data.netTotal,
                koPay: data.koPay,
                parts: data.parts,
                services: data.services,
                estimate_day_no: data.estimate_day_no,
                status: req.body.status,
                remarks: req.body.remarks,
                deliveryReadyFor: req.body.deliveryReadyFor,
                txnId: txnId,
            };


            newInsurance.appendTxIdClaim(obj);
            await newInsurance.sync();
            newInsurance.appendTxIdPolicyHolder(obj);
            await newInsurance.sync();
            newInsurance.appendTxIdAgencyGarage(obj);
            return res.status(200).json({
                msg: "Claim saved in blockchain",
                txnid: txnId,
            });


        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: error });
        }


    }
);
route.post(
    "/deliver-vehicle/:id", [
    check("status", "status is required!").not().isEmpty(),
    check("remarks", "remarks is required!").not().isEmpty(),


],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await newInsurance.sync();
            const data = newInsurance.getAgencyGarage(req.params.id);
            await newInsurance.sync();

            let newClaim = {
                claimId: data.claimId,
                claimType: data.claimType,
                repairOption: data.repairOption,
                incidentDate: data.incidentDate,
                region: data.region,
                area: data.area,
                comments: data.comments,
                time: data.time,
                documents: data.documents,
                policyNo: data.policyNo,
                policyType: data.policyType,
                policyValidity: data.policyValidity,
                carNo: data.carNo,
                model: data.model,
                make: data.make,
                civilId: data.civilId,
                name: data.name,
                email: data.email,
                mobileNo: data.mobileNo,
                internalComments: data.internalComments,
                externalComments: data.externalComments,
                netTotal: data.netTotal,
                koPay: data.koPay,
                parts: data.parts,
                services: data.services,
                estimate_day_no: data.estimate_day_no,
                status: req.body.status,
                remarksFinal: req.body.remarksFinal,
                remarks: data.remarks,
                deliveryReadyFor: data.deliveryReadyFor
                
            };

            newInsurance.claim(newClaim);
            await newInsurance.sync();
            newInsurance.requestPolicyHolder(newClaim);
            await newInsurance.sync();
            newInsurance.requestAgencyGarage(newClaim);
            await newInsurance.sync();
            console.log("owner: ", newInsurance.owner);
            console.log("location: ", newInsurance.location);
            console.log("origin: ", newInsurance.origin);
            let txnId = newInsurance.location.slice(0, -3);
            console.log("txnId: ", txnId)
            let obj = {
                claimId: data.claimId,
                claimType: data.claimType,
                repairOption: data.repairOption,
                incidentDate: data.incidentDate,
                region: data.region,
                area: data.area,
                comments: data.comments,
                time: data.time,
                documents: data.documents,
                policyNo: data.policyNo,
                policyType: data.policyType,
                policyValidity: data.policyValidity,
                carNo: data.carNo,
                model: data.model,
                make: data.make,
                civilId: data.civilId,
                name: data.name,
                email: data.email,
                mobileNo: data.mobileNo,
                internalComments: data.internalComments,
                externalComments: data.externalComments,
                netTotal: data.netTotal,
                koPay: data.koPay,
                parts: data.parts,
                services: data.services,
                estimate_day_no: data.estimate_day_no,
                status: req.body.status,
                remarksFinal: req.body.remarks,
                remarks: data.remarks,
                deliveryReadyFor: data.deliveryReadyFor,
                txnId: txnId,
            };


            newInsurance.appendTxIdClaim(obj);
            await newInsurance.sync();
            newInsurance.appendTxIdPolicyHolder(obj);
            await newInsurance.sync();
            newInsurance.appendTxIdAgencyGarage(obj);
            return res.status(200).json({
                msg: "Claim saved in blockchain",
                txnid: txnId,
            });


        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: error });
        }


    }
);

route.get('/get-agencyGarage/:id',async(req,res)=>{
    if(req.params.id==null||req.params.id.trim().length<=0){
        return res.status(400).json({error: "policyid is required"});
    }
    try {
        await newInsurance.sync();
        const data=newInsurance.getAgencyGarage(req.params.id);
        console.log(data)
        return res.status(200).json({Claim :data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error:error});
    }
});
route.get('/get-agencyGarage-history/:id',async(req,res)=>{
    if(req.params.id==null||req.params.id.trim().length<=0){
        return res.status(400).json({error: "policyid is required"});
    }
    try {
        await newInsurance.sync();
        const data=newInsurance.getAgencyGarageHistory(req.params.id);
        console.log(data)
        return res.status(200).json({Claim :data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error:error});
    }
});
module.exports=route;