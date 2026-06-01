export interface Family {
  _id: string
  name: string
  flatNumber: string
}
export interface Payment {
  _id: string
  familyId: string | Family
  amount: number
  date: string
  fine: number
}
export interface Expense {
  id: string
  title: string
  amount: number
  status: 'PENDING' | 'APPROVED'
}
