import { Ok, Err } from "../result.js";
import { getAll, create } from "../repositories/studyGroupRepository.js";

const validateGroup = ({ subject, time, place, capacity }) => {
  subject = subject?.trim();
  time = time?.trim();
  place = place?.trim();
  const capacityNum = Number(capacity);
  if (!subject || !time || !place) {
    return Err({status:400,message:"Subject, time, place, and capacity are required."});
  }
  if (!Number.isInteger(capacityNum) || capacityNum <= 0) {
    return Err({status:400,message:"Capacity must be a positive number."});
  }
  return Ok({subject, time, place, capacity: capacityNum});
};

export const listGroups = async () => {
  return await getAll();
};

export const createGroup = async (data) => {
  const result = validateGroup(data);
  if (!result.ok) {return result;}
  const group = await create(result.value);
  return Ok(group);
};
