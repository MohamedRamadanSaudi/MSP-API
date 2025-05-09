var express = require("express");
var router = express.Router();
const {
  getTeamMembers,
  getTeamMemberById,
} = require("../controllers/teamMembersController");
const { TeamMember } = require("../models/TeamMember");
const paginatedResults = require("../utils/pagination");

// Custom sorting for team members - those with phone "0" will come first
const phoneSort = { phone: 1 }; // This will sort in ascending order, placing "0" first

router.get("/get", paginatedResults(TeamMember, phoneSort), getTeamMembers);
router.get("/getById/:id", getTeamMemberById);

module.exports = router;
