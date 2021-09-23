import { v4 as uuidv4 } from 'uuid'
import { createDefaultSuccessResponse } from '@/utils/utils'
import { ICommonResponse } from './config'

interface IListItem {
	id: string
	title: string
	content: string
}

export async function fetchList(): Promise<ICommonResponse> {
	const len: number = 10
	const list: IListItem[] = []
	for (let i = 0; i < len; i++) {
		list.push({
			id: uuidv4(),
			title: uuidv4(),
			content: `Stale-While-Revalidate`,
		})
	}
	return createDefaultSuccessResponse(list)
}
