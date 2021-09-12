import * as React from 'react'
import { ScrollControl } from './controller'

export type ItemProps = {
	layerItemData: any
	layerItemIndex: number
	onRenderCell: (props?: any, index?: number) => React.ReactNode
	upperPlaceholderHeight: number
	needAdjustment: boolean
	scroller: ScrollControl
}

export class Item extends React.Component<ItemProps> {
	public itemElement: HTMLElement | null

	public componentWillReceiveProps(nextProps: ItemProps) {
		const { layerItemIndex, needAdjustment } = this.props
		if (needAdjustment) {
			this.setCache(nextProps, layerItemIndex)
		}
	}

	public shouldComponentUpdate(nextProps: ItemProps) {
		return this.props.layerItemIndex !== nextProps.layerItemIndex ? true : false
	}

	public componentDidMount() {
		this.setCache(this.props, this.props.layerItemIndex)
	}

	public render() {
		const { onRenderCell } = this.props
		return <div ref={el => (this.itemElement = el)}>{onRenderCell(this.props)}</div>
	}

	public setCache = (props: ItemProps, layerItemIndex: number) => {
		const { scroller, upperPlaceholderHeight } = props
		const cachedItemRect = scroller.cachedItemRect
		const curItem = cachedItemRect[layerItemIndex]
		const prevItem = cachedItemRect[layerItemIndex - 1]

		if (this.itemElement) {
			const rect = this.itemElement.getBoundingClientRect()
			if (prevItem) {
				const bottom = prevItem.bottom + rect.height
				const top = prevItem.bottom
				cachedItemRect[layerItemIndex] = { index: layerItemIndex, top, bottom, height: rect.height, needAdjustment: false }
			} else {
				const bottom = upperPlaceholderHeight + rect.height
				const top = upperPlaceholderHeight
				cachedItemRect[layerItemIndex] = { index: layerItemIndex, top, bottom, height: rect.height, needAdjustment: false }
			}
		}
	}
}
