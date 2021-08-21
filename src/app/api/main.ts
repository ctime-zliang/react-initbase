import { v4 as uuidv4 } from 'uuid'
import { createDefaultSuccessResponse } from '@/utils/utils'
import { ICommonResponse } from './config'

export async function fetchList(): Promise<ICommonResponse> {
	const len = 10
	const list: object[] = []
	for (let i = 0; i < len; i++) {
		list.push({
			id: uuidv4(),
			title: uuidv4(),
			content: `Stale-While-Revalidate`,
		})
	}
	return createDefaultSuccessResponse(list)
}
