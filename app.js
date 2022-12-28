//Importing Modules
const fs = require("fs");
const path = require("path");
const http = require("http");
var bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
var express = require("express");
var app = express();

//Use Methods
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
//Fabric Network
const { Gateway, Wallets } = require("fabric-network");

//LoadNetWork
loadNetwork = (channel, contractName) => {
    return new Promise(async (res, rej) => {
        const ccpPath = path.resolve(
          __dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json'
        );
        const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get("appUser");
        if (!identity) {
            console.log(
                'An identity for the user "appUser" does not exist in the wallet'
            );
            console.log("Run the registerUser.js application before retrying");
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: "appUser",
            discovery: { enabled: true, asLocalhost: true },
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);

        // Get the contract from the network.
        const contract = network.getContract(contractName);

        res(contract);
    });
};


//------------------Claim API Endpoints------------------

//Query All claims
app.get("/api/query-all-claims", async (req, res) => {
    try {
        loadNetwork("mychannel", "basic").then(async (contract) => {
            try {
                const result = await contract.evaluateTransaction(
                    "QueryAllClaims"
                );
                let data = JSON.parse(result.toString());
                return res.status(200).send(data);
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                return res.status(400).json({
                    error: `Failed to evaluate transaction: ${error.message}`,
                });
            }
        });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return res.status(400).json({ error: error });
    }
});

//Query Single claim
app.get("/api/query-claim/:ClaimId?", async (req, res) => {
    if (
        req.params.ClaimId == null ||
        req.params.ClaimId.trim().length <= 0
    ) {
        return res.status(400).json({ error: "order ID is required!" });
    }
    try {
        loadNetwork("mychannel", "basic").then(async (contract) => {
            try {
                const result = await contract.evaluateTransaction(
                    "QueryClaim",
                    req.params.ClaimId
                );
                console.log(
                    `Transaction has been evaluated, result is: ${result}`
                );
                let data = JSON.parse(result.toString());
                return res.status(200).send(data);
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                return res.status(400).json({
                    error: `Failed to evaluate transaction: ${error.message}`,
                });
            }
        });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return res.status(400).json({ error: error });
    }
});

//CreateClaim
app.post(
    "/api/initiate-claim",
    [
      check("ClaimId", "ClaimId is required!").not().isEmpty(),
      check("ClaimType", "ClaimType is required!").not().isEmpty(),
      check("RepairOption", "RepairOption is required!").not().isEmpty(),
      check("IncidentDate", "IncidentDate is required!").not().isEmpty(),
      check("Region", "Region is required!").not().isEmpty(),
      check("Area", "Area is required!").not().isEmpty(),
      check("Comments", "Comments is required!").not().isEmpty(),
      check("Time", "Time is required!").not().isEmpty(),
      check("Documents", "Documents is required!").not().isEmpty(),
      check("PolicyNo", "PolicyNo is required!").not().isEmpty(),
      check("PolicyType", "PolicyType is required!").not().isEmpty(),
      check("PolicyValidity", "PolicyValidity is required!").not().isEmpty(),
      check("CarNo", "CarNo is required!").not().isEmpty(),
      check("Model", "Model is required!").not().isEmpty(),
      check("Make", "Make is required!").not().isEmpty(),
      check("CivilId", "CivilId is required!").not().isEmpty(),
      check("Name", "Name is required!").not().isEmpty(),
      check("Email", "Email is required!").not().isEmpty(),
      check("MobileNo", "MobileNo is required!").not().isEmpty(),
      check("Status", "Status is required!").not().isEmpty(),
      check("Status_1", "status_1 is required!").not().isEmpty(),
    ],
    async (req, res) => {
        console.log("Create Endpoint!");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            loadNetwork("mychannel", "basic").then(async (contract) => {
                try {
                    await contract.submitTransaction(
                        "CreateClaim",
                        req.body.ClaimId,
                        req.body.ClaimType,
                        req.body.RepairOption,
                        req.body.IncidentDate,
                        req.body.Region,
                        req.body.Area,
                        req.body.Comments,
                        req.body.Time,
                        JSON.stringify(req.body.Documents),
                        req.body.PolicyNo,
                        req.body.PolicyType,
                        req.body.PolicyValidity,
                        req.body.CarNo,
                        req.body.Model,
                        req.body.Make,
                        req.body.CivilId,
                        req.body.Name,
                        req.body.Email,
                        req.body.MobileNo,
                        req.body.Status,     
                        req.body.Status_1 );
                    console.log("Transaction has been submitted");
                    return res.status(200).send("Submited");
                } catch (error) {
                    console.error(`Failed to evaluate transaction: ${error}`);
                    return res.status(400).json({
                        error: `Failed to evaluate transaction: ${error.message}`,
                    });
                }
            });
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
);

// setClaimStatusApprove
app.post("/api/claim-status-approve/:CalimId?", 
[
    check("Status", "Status is required!").not().isEmpty(),
    check("ExternalComments", "ExternalComments is required!").not().isEmpty(),
    check("InternalComments", "InternalComments is required!").not().isEmpty(),
    check("ApproveTime", "ApproveTime is required!").not().isEmpty(),
],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "setClaimStatusApprove",
                  req.params.ClaimId,
                  req.body.Status,
                  req.body.ExternalComments,
                  req.body.InternalComments,
                  req.body.ApproveTime,
              );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// setClaimStatusReject
app.post("/api/claim-status-reject/:CalimId?", 
[
    check("Status", "Status is required!").not().isEmpty(),
    check("ExternalComments", "ExternalComments is required!").not().isEmpty(),
    check("InternalComments", "InternalComments is required!").not().isEmpty(),
    check("RejectionTime", "RejectionTime is required!").not().isEmpty(),
    check("RejectionReasion", "RejectionReasion is required!").not().isEmpty(),

  ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "setClaimStatusReject",
                  req.params.ClaimId,
                  req.body.Status,
                  req.body.ExternalComments,
                  req.body.InternalComments,
                  req.body.RejectionTime,
                  req.body.RejectionReasion,
              );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});
// AssignToGarage
app.post("/api/assign-To-Garage/Agency/:CalimId?", 
[
    check("Status", "Status is required!").not().isEmpty(),
    check("BranchName", "BranchName is required!").not().isEmpty(),
    check("AssignedDate", "AssignedDate is required!").not().isEmpty(),
    check("AgencyGarageName", "AgencyGarageName is required!").not().isEmpty(),
  ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "AssignToGarage",
                  req.params.ClaimId,
                  req.body.Status,
                  req.body.BranchName,
                  req.body.AssignedDate,
                  req.body.AgencyGarageName,
              );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// setGarageClaimReject
app.post("/api/Garage/Agency/reject/:CalimId?", 
[
    check("Status", "Status is required!").not().isEmpty(),
    check("Remarks", "Remarks is required!").not().isEmpty(),
    check("RejectionTime", "RejectionTime is required!").not().isEmpty(),
    check("RejectionReasion", "RejectionReasion is required!").not().isEmpty(),
  ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "setGarageClaimReject",
                  req.params.ClaimId,
                  req.body.Status,
                  req.body.Remarks,
                  req.body.RejectionTime,
                  req.body.RejectionReasion,
              );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// setGarageInitialEstimate
app.post("/api/initial-estimate/:CalimId?", 
[
  check("Status", "Status is required!").not().isEmpty(),
  check("Parts", "Parts is required!").not().isEmpty(),
  check("Services", "Services is required!").not().isEmpty(),
  check("EstimateDayno", "EstimateDayno is required!").not().isEmpty(),
  check("TotalEstimate", "TotalEstimate is required!").not().isEmpty(),
  check("VehiclePartsAmount", "VehiclePartsAmount is required!").not().isEmpty(),
  check("VehicleServicesAmount", "Time is required!").not().isEmpty(),
  ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "setGarageInitialEstimate",
                  req.params.ClaimId,
                  req.body.Status,
                  req.body.Parts,
                  req.body.Services,
                  req.body.EstimateDayno,
                  req.body.TotalEstimate,
                  req.body.VehiclePartsAmount,
                  req.body.VehicleServicesAmount );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// ClaimEstimateStatusApprove
app.post("/api/approved-estimate/:CalimId?", 
[
  check("Status", "Status is required!").not().isEmpty(),
  check("EstimateDate", "EstimateDate is required!").not().isEmpty(),
   ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "ClaimEstimateStatusApprove",
                  req.params.ClaimId,
                  req.body.Status,
                  req.body.EstimateDate,
                  );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// SendEstimateToHolder
app.post("/api/estimate-to-client/:CalimId?", 
[
  check("Status", "Status is required!").not().isEmpty(),
  check("NetTotal", "NetTotal is required!").not().isEmpty(),
  check("KoPay", "KoPay is required!").not().isEmpty(),

   ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "SendEstimateToHolder",
                  req.params.ClaimId,
                  req.body.Status,
                  req.body.NetTotal,
                  req.body.KoPay
                  );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// ApprovalFromHolder
app.post("/api/approval-by-client/:CalimId?", 
[
  check("Status", "Status is required!").not().isEmpty(),
   ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "ApprovalFromHolder",
                  req.params.ClaimId,
                  req.body.Status
                  );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// ReadyforDelivery
app.post("/api/delivery-ready/:CalimId?", 
[
  check("Status", "Status is required!").not().isEmpty(),
  check("DeliverRemarks", "DeliverRemarks is required!").not().isEmpty(),
  check("DeliveryReadyFor", "DeliveryReadyFor is required!").not().isEmpty(),

   ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "ReadyforDelivery",
                  req.params.ClaimId,
                  req.body.Status,
                  req.body.DeliverRemarks,
                  req.body.DeliveryReadyFor
                  );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// DeliverVehical
app.post("/api/deliver-vehicle/:CalimId?", 
[
  check("Status", "Status is required!").not().isEmpty(),
  check("DeliveredRemarks", "DeliveredRemarks is required!").not().isEmpty(),
   ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "DeliverVehical",
                  req.params.ClaimId,
                  req.body.Status,
                  req.body.DeliveredRemarks
                  );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// UnderRepair
app.post("/api/under-repair/:CalimId?", 
[
  check("Status", "Status is required!").not().isEmpty(),
  check("RepairRemarks", "RepairRemarks is required!").not().isEmpty(),
   ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "UnderRepair",
                  req.params.ClaimId,
                  req.body.Status,
                  req.body.RepairRemarks
                  );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// SettelByCash
app.post("/api/cash-settle/:CalimId?", 
[
  check("Status", "Status is required!").not().isEmpty(),
   ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "SettelByCash",
                  req.params.ClaimId,
                  req.body.Status
                  );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// AfterRepair
app.post("/api/after-repair/:CalimId?", 
[
  check("Status", "Status is required!").not().isEmpty(),
  check("ProofOfRepairRemarks", "ProofOfRepairRemarks is required!").not().isEmpty(),
  check("AfterRepairDocuments", "AfterRepairDocuments is required!").not().isEmpty(),

   ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "AfterRepair",
                  req.params.ClaimId,
                  req.body.Status,
                  req.params.ProofOfRepairRemarks,
                  req.body.AfterRepairDocuments
                  );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});

// MarkAsPaid
app.post("/api/mark-as-paid/:CalimId?", 
[
  check("Status", "Status is required!").not().isEmpty(),
  check("PaidInternalComments", "PaidInternalComments is required!").not().isEmpty(),
  check("PaidExternalComments", "PaidExternalComments is required!").not().isEmpty(),

   ],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  if (
      req.params.ClaimId == null ||
      req.params.ClaimId.trim().length <= 0
  ) {
      return res.status(400).json({ error: "Calim ID is required!" });
  }
  try {
      loadNetwork("mychannel", "basic").then(async (contract) => {
          try {
               await contract.submitTransaction(
                  "MarkAsPaid",
                  req.params.ClaimId,
                  req.body.Status,
                  req.params.PaidInternalComments,
                  req.body.PaidExternalComments
                  );

              console.log("Transaction has been submitted");
              return res.status(200).send("Submited");
          } catch (error) {
              console.error(`Failed to evaluate transaction: ${error}`);
              return res.status(400).json({
                  error: `Failed to evaluate transaction: ${error.message}`,
              });
          }
      });
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      return res.status(400).json({ error: error });
  }
});



//Query claim History
app.get("/api/query-claim-history/:ClaimId?", async (req, res) => {
    if (
        req.params.ClaimId == null ||
        req.params.ClaimId.trim().length <= 0
    ) {
        return res.status(400).json({ error: "order ID is required!" });
    }
    try {
        loadNetwork("mychannel", "basic").then(async (contract) => {
            try {
                const result = await contract.evaluateTransaction(
                    "GetHistoryClaim",
                    req.params.ClaimId
                );
                console.log(
                    `Transaction has been evaluated, result is: ${result}`
                );
                let data = JSON.parse(result.toString());
                let record=[]
                    for(let i=0;i<data.length;i++){
                        record.push(JSON.parse(data[i].Record))
                    }               
                return res.status(200).send(record);
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                return res.status(400).json({
                    error: `Failed to evaluate transaction: ${error.message}`,
                });
            }
        });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return res.status(400).json({ error: error });
    }
});


  


//Starting Server...
const server = http.createServer(app);
const port = 9910;
server.listen(port);
console.debug("Blockchain server listening on port " + port);