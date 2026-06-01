import mongoose, { Document, Schema } from 'mongoose'

// ✅ Enum (shared-safe)
export enum ExpenseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

// ✅ TypeScript Interface
export interface IExpense extends Document {
  title: string
  amount: number
  status: ExpenseStatus
  createdAt: Date
  updatedAt: Date
}

// ✅ Schema
const expenseSchema = new Schema<IExpense>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // ✅ Prevent negative values
    },
    status: {
      type: String,
      enum: Object.values(ExpenseStatus),
      default: ExpenseStatus.PENDING,
    },
  },
  { timestamps: true }
)

// ✅ Optional index (for filtering by status)
expenseSchema.index({ status: 1 })

expenseSchema.set('toJSON', {
  transform: (_: any, ret: any) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

// ✅ Model
export const Expense = mongoose.model<IExpense>('Expense', expenseSchema)