
export const getOffset = (page: number, limit: number) => (page - 1 ) * limit;

export const getPages = (count: number, limit: number) => Math.ceil(count / limit);