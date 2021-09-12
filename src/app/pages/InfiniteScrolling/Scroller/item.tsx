import React, { useEffect, useRef } from 'react'
import styles from './index.module.less'

function Item(props: ItemProps) {
	const { onRenderCell, item, itemIndex, needAdjustment } = props
	const itemContainer = useRef<any>(null)

	const setCache = (props: ItemProps, itemIndex: number) => {
		const { projector, upperPlaceholderHeight, needAdjustment } = props
		const cachedItemRect = projector.cachedItemRect
		const curItem = cachedItemRect[itemIndex]
		const prevItem = cachedItemRect[itemIndex - 1]
		const rect = itemContainer.current.getBoundingClientRect()

		if (prevItem) {
			// 当前item不存在但是前一个存在
			const bottom = prevItem.bottom + rect.height
			const top = prevItem.bottom
			cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height, needAdjustment: false }
		} else {
			// 当前 item 不存在，且前一个也不存在
			const bottom = upperPlaceholderHeight + rect.height
			const top = upperPlaceholderHeight
			cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height, needAdjustment: false }
		}
	}

	useEffect(() => {
		setCache(props, itemIndex)
	}, [needAdjustment])

	return <div ref={itemContainer}>{onRenderCell(item, itemIndex)}</div>
}
Item.defaultProps = {
	item: null,
	itemIndex: 0,
	onRenderCell: () => {},
}
interface ItemProps {
	item: any
	itemIndex: number
	onRenderCell: (item?: any, index?: number) => React.ReactNode
	upperPlaceholderHeight: number
	needAdjustment: boolean
	projector: any
}

export default Item
