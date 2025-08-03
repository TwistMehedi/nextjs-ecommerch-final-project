import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
