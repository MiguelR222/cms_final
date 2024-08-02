import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    logo: { type: String, required: true },
    imageOne: { type: String, required: true },
    imageTwo: { type: String, required: true },
    imageThree: { type: String, required: true },
    imageFour: { type: String, required: true }
});

export default mongoose.models.Image || mongoose.model("Image", imageSchema);