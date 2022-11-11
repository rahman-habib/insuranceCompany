const Run=require('run-sdk')
const run=new Run({network:'mock'})

class Insurance extends Jig{
    init(){
        this.insuranceAgent=[];
        this.replacementAgency=[];
        this.surveyors=[];
        this.AgencyGarage=[];
       
    }
    Claim(claim){
        try {
            console.log("InitiateClaim :", claim);
            this.insuranceAgent.push(claim);
            return true;
        } catch (error) {
            return false;
        }
    }
    getClaimHistory(id){
        try {
            return this.insuranceAgent.filter((clm)=>clm.policyId==id);
        } catch (error) {
            return false;
        }
    }
    getClaim(id){
        try {
            let data=this.insuranceAgent.filter((clm)=>clm.policyId==id);
            data.reverse();
            return data[0];
        } catch (error) {
            return false;
        }
    }
    appendTxIdClaim(claim){
        try {
            this.insuranceAgent[this.insuranceAgent.length-1]=claim;
        return true;
        } catch (error) {
            return false;
        }

    }
    createReplacementRequest(claim){
        try {
            this.replacementAgency.push(claim);
            return true;
        } catch (error) {
            return false;
        }
    }
    getReplacmentHistory(id){
        try {
            return this.replacementAgency.filter((clm)=>clm.policyId==id);
        } catch (error) {
            return false;
        }

    }
    getReplacement(id){
        try {
            let data=this.replacementAgency.filter((clm)=>clm.policyId==id);
        data.reverse();
        return data[0];
        } catch (error) {
            return false;
        }
    
    }
    appendTxIdReplacement(claim){
        try {
            this.replacementAgency[this.replacementAgency.length-1]=claim;
            return true;
        } catch (error) {
            return false;
        }
    }
    requestSurveyors(claim){
        try {
            this.surveyors.push(claim);
            return true;
        } catch (error) {
            return false;
        }
    }
    getSurveyors(id){
        try {
            let data=this.surveyors.filter((clm)=>clm.policyId);
            data.reverse();
            return data[0];
        } catch (error) {
            return false;
        }
    }
    getSurveyorsHistory(id){
     try {
        return this.surveyors.filter((clm)=>clm.policyId==id);

     } catch (error) {
        return false;
     }
    }
    appendTxIdSurveyors(claim){
        try {
            this.surveyors[this.surveyors.length-1]=claim;
        return true;
        } catch (error) {
            return false;
        }
    }
    requestAgencyGarage(claim){
        try {
            this.AgencyGarage.push(claim);
            return true;
        } catch (error) {
            return false;
        }
    }
    getAgencyGarage(id){
        try {
            let data=this.AgencyGarage.filter((clm)=>clm.policyId==id);
            data.reverse();
            return data[0];
        } catch (error) {
            return false;
        }
    }
    getAgencyGarageHistory(id){
        try {
            return this.AgencyGarage.filter((clm)=>clm.policyId==id);

        } catch (error) {
            return false;
        }
    }
    appendTxIdAgencyGarage(claim){
        try {
            this.AgencyGarage[this.AgencyGarage.length-1]=claim;
            return true;
        } catch (error) {
            return false;
        }
    }
}