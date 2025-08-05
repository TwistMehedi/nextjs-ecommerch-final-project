import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/database";
import { Product } from "@/models/productmodel";

export async function POST(req) {
  await connectDB();

  const formData = await req.formData();
  const files = formData.getAll("images");

  const name = formData.get("name");

  const slug = formData.get("slug");
  const mrp = formData.get("mrp");
  const price = formData.get("price");
  const category = formData.get("category");
  const discount = formData.get("discount");
  const description = formData.get("description");

  if (!files || files.length === 0) {
    return Response.json({ error: "No files uploaded" }, { status: 400 });
  }

  let uploadedImages = [];

  try {
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await new Promise((resolve, reject) => {
        // console.log(result)
        const stream = cloudinary.uploader.upload_stream(
          { folder: "uploads" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(buffer);
      });

      uploadedImages.push({
        secure_url: result.secure_url,
        public_id: result.public_id,
      });
    }

    const product = await Product.create({
      name,
      slug,
      mrp,
      price,
      category,
      discount,
      images: uploadedImages,
      description,
    });

    return Response.json(
      { message: "Product create successfull", success: true, product },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Product create server error" },
      { status: 500 }
    );
  }
}
