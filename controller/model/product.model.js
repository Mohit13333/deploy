import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: { type: Number, required: true },
    rating: {
      type: Number,
      min: [0, "wrong rating"],
      max: 5,
      default:0
    },
    stock: {
      type: Number,
      // required: true,
    },
    brand: String,
    category: String,
    thumbnail: String,
    images: [String],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
// const Product =model('Product', productSchema);

export default Product;
