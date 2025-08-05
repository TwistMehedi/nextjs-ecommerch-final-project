import z from "zod";


export const Login = z.object({
  
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
});


export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


  export const category = z.object({
    title: z.string().min(3, "Title is required"),
    slug: z.string()
  });


export const product = z.object({
  name: z.string().min(3, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  mrp: z.string().min(1, "MRP is required"),
  price: z
    .string()
    .or(z.number())
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 250 && Number(val) <= 2500, {
      message: "Price must be a number between 250 and 2500",
    }),
  discount: z
    .string()
    .or(z.number())
    .refine((val) => !isNaN(Number(val)), {
      message: "Discount must be a number",
    }),
  category: z.string().min(1, "Category is required"),
  image: z.any(), // Can be refined if needed
  description: z.string().min(10, "Description must be at least 10 characters"),
});
