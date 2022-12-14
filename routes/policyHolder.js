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
    check("status", "status is required!").not().isEmpty(),
    check("status_1", "status_1 is required!").not().isEmpty(),

    
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
                status:req.body.status,
                status_1:req.body.status_1,
                
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
                status:req.body.status,
                status_1:req.body.status_1,
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
route.post(
    "/approval-to-client/:id", [
    check("status", "status is required!").not().isEmpty()


],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await newInsurance.sync();
            const data = newInsurance.getPolicyHolder(req.params.id);
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
                approve_time: data.approve_time,      
                assigned_date:data.assigned_date,
                agency_garage_name:data.agency_garage_name,
                branch_name:data.branch_name,
                total_estimate:data.total_estimate,
                vehicle_parts_amount:data.vehicle_parts_amount,
                vehicle_services_amount:data.vehicle_services_amount,
                internalComments: data.internalComments,
                externalComments: data.externalComments,
                status: req.body.status,
                netTotal: data.netTotal,
                koPay: data.koPay,
                parts: data.parts,
                services: data.services,
                estimate_day_no: data.estimate_day_no
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
                approve_time: data.approve_time,      
                assigned_date:data.assigned_date,
                agency_garage_name:data.agency_garage_name,
                branch_name:data.branch_name,
                total_estimate:data.total_estimate,
                vehicle_parts_amount:data.vehicle_parts_amount,
                vehicle_services_amount:data.vehicle_services_amount,
                internalComments: data.internalComments,
                externalComments: data.externalComments,
                status: req.body.status,
                netTotal: data.netTotal,
                koPay: data.koPay,
                parts: data.parts,
                services: data.services,
                estimate_day_no: data.estimate_day_no,
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
    "/after-repair/:id", [
    check("status", "status is required!").not().isEmpty(),
    check("afterRepairDocuments", "afterRepairDocuments is required!").not().isEmpty(),
    check("proofOfRepairRemarks", "proofOfRepairRemarks is required!").not().isEmpty()


],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await newInsurance.sync();
            const data = newInsurance.getPolicyHolder(req.params.id);
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
                externalComments: data.externalComments,
                status: req.body.status,
                approve_time: data.approve_time,      
                assigned_date:data.assigned_date,
                agency_garage_name:data.agency_garage_name,
                branch_name:data.branch_name,
                total_estimate:data.total_estimate,
                vehicle_parts_amount:data.vehicle_parts_amount,
                vehicle_services_amount:data.vehicle_services_amount,
                afterRepairDocuments: req.body.afterRepairDocuments,
                proofOfRepairRemarks: req.body.proofOfRepairRemarks,
                netTotal: data.netTotal,
                koPay: data.koPay,
                parts: data.parts,
                services: data.services,
                estimate_day_no: data.estimate_day_no
            };

            newInsurance.claim(newClaim);
            await newInsurance.sync();
            newInsurance.requestPolicyHolder(newClaim);
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
                externalComments: data.externalComments,
                status: req.body.status,
                approve_time: data.approve_time,      
                assigned_date:data.assigned_date,
                agency_garage_name:data.agency_garage_name,
                branch_name:data.branch_name,
                total_estimate:data.total_estimate,
                vehicle_parts_amount:data.vehicle_parts_amount,
                vehicle_services_amount:data.vehicle_services_amount,
                afterRepairDocuments: req.body.afterRepairDocuments,
                proofOfRepairRemarks: req.body.proofOfRepairRemarks,
                netTotal: data.netTotal,
                koPay: data.koPay,
                parts: data.parts,
                services: data.services,
                estimate_day_no: data.estimate_day_no,
                txnId: txnId,
            };


            newInsurance.appendTxIdClaim(obj);
            await newInsurance.sync();
            newInsurance.appendTxIdPolicyHolder(obj);
            
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
    "/cash-settle/:id", [
    check("status", "status is required!").not().isEmpty()


],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await newInsurance.sync();
            const data = newInsurance.getPolicyHolder(req.params.id);
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
                approve_time: data.approve_time,      
                assigned_date:data.assigned_date,
                agency_garage_name:data.agency_garage_name,
                branch_name:data.branch_name,
                total_estimate:data.total_estimate,
                vehicle_parts_amount:data.vehicle_parts_amount,
                vehicle_services_amount:data.vehicle_services_amount,
                externalComments: data.externalComments,
                status: req.body.status,
                netTotal: data.netTotal,
                koPay: data.koPay,
                parts: data.parts,
                services: data.services,
                estimate_day_no: data.estimate_day_no
            };

            newInsurance.claim(newClaim);
            await newInsurance.sync();
            newInsurance.requestPolicyHolder(newClaim);
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
                approve_time: data.approve_time,      
                assigned_date:data.assigned_date,
                agency_garage_name:data.agency_garage_name,
                branch_name:data.branch_name,
                total_estimate:data.total_estimate,
                vehicle_parts_amount:data.vehicle_parts_amount,
                vehicle_services_amount:data.vehicle_services_amount,
                externalComments: data.externalComments,
                status: req.body.status,
                netTotal: data.netTotal,
                koPay: data.koPay,
                parts: data.parts,
                services: data.services,
                estimate_day_no: data.estimate_day_no,
                txnId: txnId,
            };


            newInsurance.appendTxIdClaim(obj);
            await newInsurance.sync();
            newInsurance.appendTxIdPolicyHolder(obj);
            
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