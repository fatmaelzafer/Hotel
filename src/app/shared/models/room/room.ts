export type Root = room[]

export interface room {
  _id: string
  roomNumber: number
  roomType: string
  reservoirId: any
  reservationFrom?: string
  reservationTo?: string
  price: number
  roomCapacity: number
  available: boolean
  id: string
  __v?: number
}
