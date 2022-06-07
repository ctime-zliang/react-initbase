import React, { useCallback, useState, useMemo } from 'react'

export const useForceUpdate = () => {
	const [, setState] = useState(false)
	return useCallback(() => {
		setState((preState: boolean): boolean => {
			return !preState
		})
	}, [])
}

export type TUseReactive = {
	value: any
	update(v: any): void
	render(): void
}
export const useReactive = (initValue: any): TUseReactive => {
	const forceUpdate = useForceUpdate()
	const reactive: TUseReactive = useMemo(() => {
		return {
			value: initValue,
			update(value: any): void {
				reactive.value = value
			},
			render() {
				forceUpdate()
			},
		}
	}, [initValue])
	return reactive
}
