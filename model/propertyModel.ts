import mongoose, { Document, Schema } from 'mongoose';

// Define the Property interface
export interface IProperty {
  userId?: string;
  property_name: string;
  property_address: string;
  property_type: "Apartment" | "Vacation homes" | "Single-family" | "Condominiums" | "Student Housing";
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  price: number;
  description: string;
  images: string[];
}


const propertySchema = new Schema<IProperty>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  property_name: {
    type: String,
    required: true,
  },
  property_address: {
    type: String,
    required: true,
  },
  property_type: {
    type: String,
    enum: ["Apartment", "Vacation homes", "Single-family", "Condominiums", "Student Housing"],
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  squareFeet: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
},{timestamps:true});


const PropertyModel = mongoose.model<IProperty>('Property', propertySchema);

export default PropertyModel;
