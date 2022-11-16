const Run=require('run-sdk')
const run=new Run({network:'mock'})

class Insurance extends Jig{
    init(){
        this.insuranceAgent=[];
        this.policyHolder=[];
        this.AgencyGarage=[];
       
    }
    claim(claim){
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
            return this.insuranceAgent.filter((clm)=>clm.claimId==id);
        } catch (error) {
            return false;
        }
    }
    getClaim(id){
        try {
            let data=this.insuranceAgent.filter((clm)=>clm.claimId==id);
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
 
    requestPolicyHolder(claim){
        try {
            this.policyHolder.push(claim);
            return true;
        } catch (error) {
            return false;
        }
    }
    getPolicyHolder(id){
        try {
            let data=this.policyHolder.filter((clm)=>clm.claimId==id);
            data.reverse();
            return data[0];
        } catch (error) {
            return false;
        }
    }
    getPolicyHolderHistory(id){
     try {
        return this.policyHolder.filter((clm)=>clm.claimId==id);

     } catch (error) {
        return false;
     }
    }
    appendTxIdPolicyHolder(claim){
        try {
            this.policyHolder[this.policyHolder.length-1]=claim;
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
            let data=this.AgencyGarage.filter((clm)=>clm.claimId==id);
            data.reverse();
            return data[0];
        } catch (error) {
            return false;
        }
    }
    getAgencyGarageHistory(id){
        try {
            return this.AgencyGarage.filter((clm)=>clm.claimId==id);

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

module.exports=Insurance;