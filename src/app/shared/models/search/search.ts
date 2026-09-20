
export interface roomsearchresponse<t> {
  meta: Meta
  data: t
}

export interface Meta {
  totalDoc: number
  currentPage: number
  totalPages: number
  limit: number
}


