import mongoose from "mongoose";

const studyGroupSchema = new mongoose.Schema(
  {
    subject: {type: String, required: true},
    time: {type: String, required: true},
    place: {type: String, required: true},
    capacity: {type: Number, required: true}
  },
  { timestamps: true }
);

const StudyGroup = mongoose.model("StudyGroup", studyGroupSchema);

export const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
export const getAll = async () => StudyGroup.find().lean();
export const findById = async (id) => StudyGroup.findById(id).lean();
export const create = async (data) => (await StudyGroup.create(data)).toObject();
export const updateById = async (id, data) => StudyGroup.findByIdAndUpdate(id, data, { new: true }).lean();
export const removeById = async (id) => {await StudyGroup.findByIdAndDelete(id);};