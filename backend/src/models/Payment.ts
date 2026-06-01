import mongoose, { Document, Schema } from 'mongoose'

// ✅ Interface
export interface IPayment extends Document {
  familyId: mongoose.Types.ObjectId
  amount: number
  fine: number
  date: Date
  createdAt: Date
  updatedAt: Date
}

// ✅ Schema
const paymentSchema = new Schema<IPayment>(
  {
    familyId: {
      type: Schema.Types.ObjectId,
      ref: 'Family',
      required: true,
      index: true, // ✅ fast queries by family
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // ✅ prevent negative
    },
    fine: {
      type: Number,
      default: 0,
      min: 0, // ✅ prevent negative
    },
    date: {
      type: Date,
      default: Date.now,
      index: true, // ✅ fast date filtering (reports)
    },
  },
  { timestamps: true }
)

// ✅ Compound index (VERY IMPORTANT for reports)
paymentSchema.index({ familyId: 1, date: -1 })

// ✅ Optional: clean response
paymentSchema.set('toJSON', {
  transform: (_: any, ret: any) => {
    ret.id = ret._id?.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

// ✅ Model
export const Payment = mongoose.model<IPayment>('Payment', paymentSchema)