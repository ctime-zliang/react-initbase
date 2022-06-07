import { v4 as uuidv4 } from 'uuid'
import { createDefaultSuccessResponse } from '@app/utils/utils'
import { TCommonResponse } from './types'

type TListItem = {
	id: string
	title: string
	content: string
}

export async function fetchList(): Promise<TCommonResponse<Array<TListItem>>> {
	const len: number = 10
	const list: Array<TListItem> = []
	for (let i: number = 0; i < len; i++) {
		list.push({
			id: uuidv4(),
			title: uuidv4(),
			content: `Stale-While-Revalidate`,
		})
	}
	return createDefaultSuccessResponse(list)
}
