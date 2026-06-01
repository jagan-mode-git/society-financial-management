import mongoose, { Document, Schema } from 'mongoose'

// ✅ TypeScript Interface
export interface IFamily extends Document {
  name: string
  flatNumber: string
  createdAt: Date
  updatedAt: Date
}

// ✅ Schema
const familySchema = new Schema<IFamily>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    flatNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true, // ✅ Normalize (A101 instead of a101)
      trim: true,
    },
  },
  { timestamps: true }
)

// ✅ Index (ensures uniqueness + faster queries)
familySchema.index({ flatNumber: 1 }, { unique: true })

familySchema.set('toJSON', {
  transform: (_: any, ret: any) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})
// ✅ Model
export const Family = mongoose.model<IFamily>('Family', familySchema)