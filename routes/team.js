var express = require("express");
const app = require("../app");
var router = express.Router();

const {
  addTeamMember,
  getTeamMembers,
  deleteTeamMember,
} = require("../controllers/dashboardController");
const upload = require("../utils/uploadImage");
const { TeamMember } = require("../models/TeamMember");

/* Pagination Function */

router.post("/add", upload.single("image"), addTeamMember);
router.get("/get", paginatedResults(TeamMember), getTeamMembers);
router.delete("/delete/:id", deleteTeamMember);

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      return res.status(500).json("INTERNAL SERVER ERROR");
    }
  };
}

module.exports = router;
