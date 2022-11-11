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
    getClaimHistory(no){
        try {
            return this.insuranceAgent.filter((clm)=>clm.policyNo==no);
        } catch (error) {
            return false;
        }
    }
    getClaim(no){
        try {
            let data=this.insuranceAgent.filter((clm)=>clm.policyNo==no);
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
    getReplacmentHistory(no){
        try {
            return this.replacementAgency.filter((clm)=>clm.policyNo==no);
        } catch (error) {
            return false;
        }

    }
    getReplacement(no){
        try {
            let data=this.replacementAgency.filter((clm)=>clm.policyNo==no);
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
    getSurveyors(no){
        try {
            let data=this.surveyors.filter((clm)=>clm.policyNo==no);
            data.reverse();
            return data[0];
        } catch (error) {
            return false;
        }
    }
    getSurveyorsHistory(no){
     try {
        return this.surveyors.filter((clm)=>clm.policyNo==no);

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
    getAgencyGarage(no){
        try {
            let data=this.AgencyGarage.filter((clm)=>clm.policyNo==no);
            data.reverse();
            return data[0];
        } catch (error) {
            return false;
        }
    }
    getAgencyGarageHistory(no){
        try {
            return this.AgencyGarage.filter((clm)=>clm.policyNo==no);

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