
export interface roomsearchresponse {
  meta: Meta
  data: roomsearch[]
}

export interface Meta {
  totalDoc: number
  currentPage: number
  totalPages: number
  limit: number
}

export interface roomsearch {
  _id: string
  roomNumber: number
  roomType: string
  reservoirId: any
  reservationFrom: any
  reservationTo: any
  price: number
  roomCapacity: number
  available: boolean
  id: string
  __v?: number
}
