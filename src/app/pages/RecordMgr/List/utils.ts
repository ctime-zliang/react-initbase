export const createSearchString = (pageIndex: number, pageSize: number, keywords: string): string => {
	let search = `?pageIndex=${pageIndex}&pageSize=${pageSize}`
	if (keywords && keywords.trim()) {
		search += `&keywords=${encodeURI(encodeURI(keywords))}`
	}
	return search
}
