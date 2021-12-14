import React from 'react'
import { ScrollControl, Cache } from './controller'
import { Item } from './item.class'

export type ScrollerProps<T = {}> = {
	cache?: Cache[]
	containerHeight: number
	itemAverageHeight: number
	items: T[]
	itemKey: string
	initialScrollTop?: number
	className?: string
	onRenderCell: (props?: any, index?: number) => React.ReactNode
	onScroll?: (dom: HTMLElement) => void
	onEnd?: () => void
}
export type ScrollerState = {
	projectedItems: any[]
	upperPlaceholderHeight: number
	underPlaceholderHeight: number
}

export class InfiniteScroller extends React.Component<ScrollerProps> {
	public static defaultProps: { [key: string]: any } = {
		initialScrollTop: 0,
		onScroll: () => {},
		onEnd: () => {},
	}
	public state: ScrollerState = {
		projectedItems: [],
		underPlaceholderHeight: 0,
		upperPlaceholderHeight: 0,
	}
	public containerElement: HTMLElement
	public upperContentElement: HTMLElement
	public needAdjustment: boolean = false
	public isAdjusting: boolean = false
	public hasBottomTouched: boolean = true
	public scrollTop: number = 0
	public scroller: ScrollControl
	public width: number = 0
	public resizing: boolean = false

	public componentWillReceiveProps(nextProps: ScrollerProps) {
		this.hasBottomTouched = false
		this.scroller.next(nextProps.items)
	}

	public componentDidUpdate() {
		this.adjustUpperPlaceholderHieght()
	}

	public componentDidMount() {
		const { items, itemAverageHeight, cache, initialScrollTop, onEnd }: ScrollerProps = this.props
		this.width = this.containerElement.clientWidth
		this.scroller = new ScrollControl(this, items, itemAverageHeight, cache)
		this.scroller.subscribe((projectedItems, upperPlaceholderHeight, underPlaceholderHeight, needAdjustment) => {
			this.needAdjustment = needAdjustment
			if (underPlaceholderHeight < this.containerElement.clientHeight && !this.hasBottomTouched) {
				this.hasBottomTouched = true
				onEnd && onEnd()
			}
			const prevStateItemsLength = this.state.projectedItems.length
			this.setState(
				{
					projectedItems,
					upperPlaceholderHeight,
					underPlaceholderHeight,
				},
				() => {
					if (prevStateItemsLength === 0 && projectedItems.length > 0) {
						this.containerElement.scrollTop = initialScrollTop!
					}
				}
			)
		})
		if (items.length > 0) {
			this.hasBottomTouched = false
			this.scroller.next()
		}
		window.addEventListener('resize', () => {
			if (this.containerElement.clientWidth !== this.width) {
				this.width = this.containerElement.clientWidth
				this.resizing = true
				this.scroller.cachedItemRect.length = 0
				this.needAdjustment = true
				this.isAdjusting = false
				this.setState({})
			}
		})
	}

	public render() {
		const { containerHeight, className, itemKey, onRenderCell }: ScrollerProps = this.props
		const style: { [key: string]: string } = {
			overflow: 'scroll',
			WebkitOverflowScrolling: 'touch',
			overflowAnchor: 'none',
			height: +containerHeight + 'px',
		}
		return (
			<section className={className || ''} ref={el => el && (this.containerElement = el)} style={style} onScroll={this.onScroll.bind(this)}>
				<div ref={el => el && (this.upperContentElement = el)} style={{ height: this.state.upperPlaceholderHeight }}></div>
				{this.state.projectedItems.map((item, index) => (
					<Item
						key={itemKey ? item[itemKey] : index}
						layerItemIndex={this.scroller.startIndex + index}
						layerItemData={item}
						scroller={this.scroller}
						needAdjustment={this.needAdjustment}
						upperPlaceholderHeight={this.state.upperPlaceholderHeight}
						onRenderCell={onRenderCell}
					/>
				))}
				<div style={{ height: this.state.underPlaceholderHeight }}></div>
			</section>
		)
	}

	public adjustUpperPlaceholderHieght() {
		if (this.needAdjustment) {
			if (this.isAdjusting) {
				this.isAdjusting = false
				this.needAdjustment = false
				return
			}
			const anchor = this.scroller.anchorItem
			const cachedAnchorItem = this.scroller.cachedItemRect[anchor.index]
			const startItem = this.scroller.cachedItemRect[this.scroller.startIndex]
			const finalHeight = this.computeUpperPlaceholderHeight(cachedAnchorItem, startItem.top)
			const upperPlaceholderHeight = startItem.index === 0 ? 0 : finalHeight < 0 ? 0 : finalHeight
			const prevHeight = this.state.upperPlaceholderHeight
			const scrollTop = this.containerElement.scrollTop
			this.setState(
				{
					upperPlaceholderHeight,
				},
				() => {
					if (startItem.index > 0) {
						if (this.resizing) {
							const currentAnchor = this.scroller.cachedItemRect[this.scroller.startIndex + 3]
							const anchorDelta = anchor.offset - currentAnchor.top
							const nextScrollTop = this.containerElement.scrollTop - anchorDelta
							if (nextScrollTop < currentAnchor.top) {
								this.containerElement.scrollTop = currentAnchor.top
							} else if (nextScrollTop > currentAnchor.bottom) {
								this.containerElement.scrollTop = currentAnchor.bottom
							} else {
								this.containerElement.scrollTop = nextScrollTop
							}
							this.resizing = false
						} else {
							if (finalHeight < 0) {
								this.containerElement.scrollTop = scrollTop - finalHeight
							}
						}
					} else {
						//@ts-ignore
						this.containerElement.style['-webkit-overflow-scrolling'] = 'auto'
						this.containerElement.scrollTop = scrollTop - finalHeight
						//@ts-ignore
						this.containerElement.style['-webkit-overflow-scrolling'] = 'touch'
					}
					this.scroller.anchorItem = {
						index: this.scroller.startIndex + 3,
						offset: this.scroller.cachedItemRect[this.scroller.startIndex + 3].top,
					}
				}
			)
		}
	}

	public computeUpperPlaceholderHeight(cache: Cache, height: number): number {
		const scrollTop = this.containerElement.scrollTop
		const prevStartIndex = this.scroller.anchorItem.index > 2 ? this.scroller.anchorItem.index - 3 : 0
		const scrollThroughItemCount = prevStartIndex - this.scroller.startIndex
		this.isAdjusting = true
		const prevStartItem = this.scroller.cachedItemRect[prevStartIndex]
		const upperHeight = scrollThroughItemCount < 0 ? scrollTop : prevStartItem ? this.state.upperPlaceholderHeight : scrollTop
		const endIndex = prevStartItem ? prevStartIndex : this.scroller.startIndex + 3
		const scrollThroughItem = this.scroller.cachedItemRect.slice(this.scroller.startIndex, endIndex)
		const scrollThroughItemDistance = scrollThroughItem.reduce((acc: number, item: { height: number }) => {
			return acc + item.height
		}, 0)
		return upperHeight - scrollThroughItemDistance
	}

	public onScroll() {
		const { onScroll }: ScrollerProps = this.props
		const newScrollTop = this.containerElement.scrollTop
		onScroll && onScroll(this.containerElement)
		if (newScrollTop < this.scrollTop) {
			this.scroller.down()
		} else if (newScrollTop > this.scrollTop) {
			this.scroller.up()
		}
		this.scrollTop = newScrollTop
	}
}
