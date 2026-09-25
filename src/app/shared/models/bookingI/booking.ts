
export interface Booking {
  message: string
  stay: Stay
  guest: Guest
  priceSummary: PriceSummary
  reservationID: string
}

export interface Stay {
  roomNumber: number
  roomType: string
  checkIn: string
  checkout: string
  guests: number
}

export interface Guest {
  fullName: string
  email: string
  phone: string
  specialRequests: string
}

export interface PriceSummary {
  roomName: string
  nights: number
  nightPrice: number
  discount: number
  total: number
}
