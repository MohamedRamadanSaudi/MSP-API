const { TeamMember } = require("../models/TeamMember");
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
    return res.status(200).json(res.paginatedResults);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getTeamMemberById(req, res) {
  try {
    const member = await TeamMember.findById(req.params.id);
    if(!member){
        return res.status(404).json("Member Not Found");
    }
    return res.status(200).json(member);
  } catch (error) {
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

async function updateTeamMember(req, res) {
  try {
    let teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json("Member Not Found...");
    }
    let image = teamMember.image;
    if (req.file) {
      image = process.env.URL + req.file.filename;
    }
    let updatedMember = {
      name: req.body.name !== null ? req.body.name : teamMember.name,
      phone: req.body.phone !== null ? req.body.phone : teamMember.phone,
      track: req.body.track !== null ? req.body.track : teamMember.track,
      linkedin:
        req.body.linkedin !== null ? req.body.linkedin : teamMember.linkedin,
      facebook:
        req.body.facebook !== null ? req.body.facebook : teamMember.facebook,
      behanceOrGithub:
        req.body.behanceOrGithub !== null
          ? req.body.behanceOrGithub
          : teamMember.behanceOrGithub,
      linktree:
        req.body.linktree !== null ? req.body.linktree : teamMember.linktree,
      image: image,
      description:
        req.body.description !== null
          ? req.body.description
          : teamMember.description,
    };
    console.log(updateTeamMember);
    await teamMember.updateOne(updatedMember);
    return res.status(200).json("Member Updated Successfully.");
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  addTeamMember,
  getTeamMembers,
  deleteTeamMember,
  updateTeamMember,
  getTeamMemberById,
};
