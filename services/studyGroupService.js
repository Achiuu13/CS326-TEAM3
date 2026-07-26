import { Ok, Err } from "../result.js";
import { getAll, save } from "../repositories/studyGroupRepository.js";

const validateGroup = ({ subject, time, place, capacity }) => {
  if (!subject || !time || !place || !capacity) {
    return Err({
      status: 400,
      message: "Subject, time, place, and capacity are required."
    });
  }
  return Ok({subject, time, place, capacity});
};

export const listGroups = async () => {
  return await getAll();
};

export const createGroup = async (data) => {
  const result = validateGroup(data);
  if (!result.ok) {return result;}
  const groups = await getAll();
  groups.push(result.value);
  await save(groups);
  return Ok(result.value);
};
