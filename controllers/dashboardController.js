const { TeamMember } = require("../models/TeamMember");
const validator = require("validator");

async function addTeamMember(req, res) {
  try {
    const teamMember = new TeamMember({
      name: req.body.name,
      phone: req.body.phone,
      track: req.body.track,
      linkedin: req.body.linkedin,
      facebook: req.body.facebook,
      behanceOrGithub: req.body.behanceOrGithub,
      linktree: req.body.linktree,
      image: process.env.URL + req.file.filename,
      description: req.body.description,
    });
    await teamMember.save();
    return res.status(200).json(teamMember);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        if (error.errors[key].message == "validator is not defined") {
          error.errors[key].message = `Must be a Valid URL`;
        }
        errors[key] = error.errors[key].message;
      });
      return res.status(400).send(errors);
    }
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getTeamMembers(req, res) {
  try {
    const teamMembers = await TeamMember.find();
    if (!teamMembers) {
      return res.status(400).json("No Team Members Found..");
    }
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = teamMembers.slice(startIndex, endIndex);
    const data = {};
    data.teamMembers = paginatedData;
    data.next = {
      page: page + 1,
      limit: limit,
    };
    data.previous = {
      page: page - 1,
      limit: limit,
    };
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function deleteTeamMember(req, res) {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(400).json("Team Member Not Found..");
    }
    await TeamMember.findByIdAndDelete(req.params.id);
    return res.status(200).json("Team Member Deleted.");
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { addTeamMember, getTeamMembers, deleteTeamMember };
