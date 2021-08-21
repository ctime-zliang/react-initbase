import React from 'react'
import useSWR from 'swr'
import { fetchItem, fetchItemUrl } from '@/api/record'

export function useItemDetail(id: string, initialData: any = {}) {
	const profile: { [key: string]: any } = {
		shouldRetryOnError: false,
		errorRetryCount: 3,
		revalidateOnFocus: false,
		onSuccess(res: { [key: string]: any }, url: string, config: any) {
			console.log(`useSWR onSuccess`, res, url, config)
		},
		onError(res: { [key: string]: any }, url: string, config: any) {
			console.log(`useSWR onError`, res, url, config)
		},
	}
	if (initialData && Object.keys(initialData).length) {
		profile.initialData = initialData
	}
	const { data, error } = useSWR(
		`${fetchItemUrl}?id=${id}`,
		async (...args: any) => {
			return await fetchItem(args[0])
		},
		profile
	)
	return {
		data,
		error,
	}
}
