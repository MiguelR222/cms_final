import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    orgName: { type: String, required: true },
    heroInfo: { type: String, required: true },
    serviceOne: { type: String, required: true },
    serviceTwo: { type: String, required: true },
    serviceThree: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true }
});

export default mongoose.models.Site || mongoose.model("Site", siteSchema);