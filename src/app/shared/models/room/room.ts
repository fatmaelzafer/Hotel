export type Root = room[]

export interface room {
  _id: string
  roomNumber: number
  roomType: RoomType
  reservoirId: any
  reservationFrom: any
  reservationTo: any
  price: number
  roomCapacity: number
  available: boolean
  __v: number
  id: string
}

export interface RoomType {
  _id: string
  name: string
  roomAdvantages: RoomAdvantages
  id: string
}

export interface RoomAdvantages {
  beds: string
  view: string
  area: string
  breakfast: string
  livingRoom: string
  _id: string
  id: string
}
