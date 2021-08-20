import React from 'react'
import useSWR from 'swr'
import { fetchItemUrl } from '@/model/record'

const fetcher = (...args: any[]) => {
	fetch(args[0], {
		credentials: 'include',
		method: 'GET',
	})
		.then(res => {
			return res.json()
		})
		.catch(e => {
			console.warn(e)
		})
}

export function useItemDetail(id: string) {
	const { data, error } = useSWR(`${fetchItemUrl}?id=${id}`, fetcher)
	return {
		data,
		error,
	}
}
