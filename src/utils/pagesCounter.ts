export const getPages = (totalPages: number, limit: number) => {
   return Math.ceil(totalPages / limit)
}
