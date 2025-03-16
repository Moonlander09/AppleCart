import mongoose from "mongoose";

const specsSchema = new mongoose.Schema({
  modelName: String,
  weight: String,
  size: String,
  chip: String,
  internal: String,
  battery: String,
  camera: String,
  os: String,
  bluetooth: Number,
  sim: String,
  dimensions: String,
  warranty: String,
});

const Specs = mongoose.models.Specs || mongoose.model("Specs", specsSchema);
export default Specs;
