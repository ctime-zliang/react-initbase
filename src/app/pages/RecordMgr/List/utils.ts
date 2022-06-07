export const createSearchString = (pageIndex: number, pageSize: number): string => {
	let search = `?pageIndex=${pageIndex}&pageSize=${pageSize}`
	return search
}
