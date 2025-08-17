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
  image: z.any(),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const editEschema = z.object({
  name: z.string().min(3, "Product name is required"),
  mrp: z.string().min(1, "MRP is required"),
  price: z
    .string()
    .or(z.number())
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 250 && Number(val) <= 2500, {
      message: "Price must be a number between 250 and 2500",
    }),
    image: z.any(),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

 

export const couponCodeValidation = z.object({
  code: z
    .string()
    .min(5, "Coupon code must be at least 5 characters long")
    .trim(),

  discountPercentage: z.coerce
    .number({ invalid_type_error: "Discount must be a number" })
    .min(0, "Discount cannot be less than 0%")
    .max(100, "Discount cannot be more than 100%"),

  minShoppingPrice: z.coerce
    .number({ invalid_type_error: "Minimum shopping price must be a number" })
    .min(0, "Price cannot be negative"),

  validity: z.coerce
    .date({ invalid_type_error: "Invalid date" })
    .refine((date) => date > new Date(), {
      message: "Validity date must be in the future",
    }),
});

export const orderValidator = z.object({
  user: z.string().nonempty("User ID is required"),
  products: z.array(
    z.object({
      productId: z.string().nonempty("Product ID is required"),
      name: z.string().nonempty("Product name is required"),
      price: z.number().min(0),
      quantity: z.number().min(1),
      discount: z.number().min(0),
      total: z.number().min(0),
    })
  ),
  deliveryInfo: z.object({
    fullName: z.string().nonempty("Full name is required"),
    phone: z.string().nonempty("Phone number is required"),
    district: z.string().nonempty("District is required"),
    thana: z.string().nonempty("Thana is required"),
    address: z.string().nonempty("Address is required"),
  }),
  itemsTotal: z.number().min(0),
  deliveryFee: z.number().min(0).optional(),
  discountTotal: z.number().min(0).optional(),
  subtotal: z.number().min(0),
  paymentStatus: z.enum(["Pending", "On The Way", "Complated"]).optional(),
});
