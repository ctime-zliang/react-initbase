import { v4 as uuidv4 } from 'uuid'
import { createDefaultSuccessResponse } from '@app/utils/utils'
import { TCommonResponse } from './config'

type TListItem = {
	id: string
	title: string
	content: string
}

export async function fetchList(): Promise<TCommonResponse<TListItem[]>> {
	const len: number = 10
	const list: TListItem[] = []
	for (let i = 0; i < len; i++) {
		list.push({
			id: uuidv4(),
			title: uuidv4(),
			content: `Stale-While-Revalidate`,
		})
	}
	return createDefaultSuccessResponse(list)
}
