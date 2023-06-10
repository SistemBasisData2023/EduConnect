const express = require("express");
const {
  addResource,
  downloadResource,
  getAllResources,
  getResourcesBySubject,
} = require("../controllers/resourceControllers");
const upload = require("../config/multer");

const router = express.Router();

router.post("/addResource", upload.single("filename"), addResource);

router.get("/", getAllResources);
router.get("/downloadResource/:resource_id", downloadResource);
router.get("/getResourcesBySubject/:subject_name", getResourcesBySubject);

const ResourceRoute = router;
module.exports = ResourceRoute;
