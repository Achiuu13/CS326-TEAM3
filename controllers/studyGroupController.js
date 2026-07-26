import * as studyGroupService from "../services/studyGroupService.js";

export const index = async (req, res) => {
  const groups = await studyGroupService.listGroups();
  res.status(200).render("groups", {
    title: "Study Groups", groups
  });
};

export const showCreateForm = (req, res) => {
  res.render("createGroup", {
    title: "Create Study Group"
  });
};

export const create = async (req, res) => {
  const result = await studyGroupService.createGroup(req.body);
  if (!result.ok) {
    res.status(result.error.status).send(result.error.message);
    return;
  }
  res.redirect("/groups");
};