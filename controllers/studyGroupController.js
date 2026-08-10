import * as studyGroupService from "../services/studyGroupService.js";
import { isValidId } from "../repositories/studyGroupRepository.js";

export const index = async (req, res) => {
  const groups = await studyGroupService.listGroups();
  res.status(200).render("groups", {
    title: "Study Groups",groups,
    user: req.user
  });
};

export const showCreateForm = (req, res) => {
  res.render("createGroup", {
    title: "Create Study Group"
  });
};

export const create = async (req, res) => {
  const result = await studyGroupService.createGroup(req.body, req.user);
  if (!result.ok) {
    res.status(result.error.status).send(result.error.message);
    return;
  }
  res.redirect("/groups");
};

export const remove = async (req, res) => {
  const { id } = req.params;
  if(!isValidId(id)){
    res.status(400).send("id must be valid id");
    return;
  }
  const result = await studyGroupService.removeGroup(id, req.user);
  if(!result.ok){
    res.status(result.error.status).send(result.error.message);
    return;
  }
  res.status(200).send("");
}
