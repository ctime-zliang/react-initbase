export type Callback = (projectedItems: any[], upperPlaceholderHeight: number, underPlaceholderHeight: number, needAdjustment: boolean) => void
export type Cache = { index: number; top: number; bottom: number; height: number; needAdjustment?: boolean }

export class ScrollControl {
	public startIndex: number = 0
	public endIndex: number = 0
	public anchorItem: { [key: string]: any } = { index: 0, offset: 0 }
	public cachedItemRect: any = null

	private items: any = null
	private scroller: any = null
	private guesstimatedItemCountPerPage: number
	private averageHeight: number = 0
	private displayCount: number = 0
	private scrollerDom: HTMLDivElement
	private upperHeight: number = 0

	private callback: Callback

	constructor(scroller: any, items: any[], averageHeight: number, cachedItemRect: Cache[] = []) {
		this.scroller = scroller
		this.items = items
		this.averageHeight = averageHeight
		this.cachedItemRect = cachedItemRect
		/* ... */
		this.scrollerDom = scroller.containerElement
		this.guesstimatedItemCountPerPage = Math.ceil(this.scrollerDom.clientHeight / averageHeight)
		this.displayCount = this.guesstimatedItemCountPerPage + 3
		this.endIndex = this.startIndex + this.displayCount - 1
	}

	public next(items?: any[]) {
		if (items) {
			this.items = items
		}
		const projectedItems = this.items.slice(this.startIndex, this.endIndex + 1)
		const startItem = this.cachedItemRect[this.startIndex]
		const upperPlaceholderHeight = startItem ? startItem.top : this.upperHeight
		const needAdjustment = startItem ? false : true
		const cachedItemRectLength = this.cachedItemRect.length
		const endIndex = cachedItemRectLength === 0 ? this.endIndex : cachedItemRectLength
		const bottomCountDelta = this.items.length - endIndex
		const unCachedItemCount = bottomCountDelta < 0 ? 0 : bottomCountDelta
		const lastCachedItemRect = this.cachedItemRect[cachedItemRectLength - 1]
		const lastCachedItemRectBottom = lastCachedItemRect ? lastCachedItemRect.bottom : 0
		const lastItemRect =
			this.endIndex >= cachedItemRectLength ? this.cachedItemRect[cachedItemRectLength - 1] : this.cachedItemRect[this.endIndex]
		const lastItemRectBottom = lastItemRect ? lastItemRect.bottom : 0
		const underPlaceholderHeight = lastCachedItemRectBottom - lastItemRectBottom + unCachedItemCount * this.averageHeight

		this.callback(projectedItems, upperPlaceholderHeight, underPlaceholderHeight, needAdjustment)
	}

	public up() {
		const scrollTop = this.scrollerDom.scrollTop
		const anchorItemRect = this.cachedItemRect[this.anchorItem.index]
		if (scrollTop > anchorItemRect.bottom) {
			const nextAnchorItem = this.cachedItemRect.find((item: any, index: number) => {
				return item ? item.bottom > scrollTop : false
			})
			if (nextAnchorItem) {
				this.startIndex = nextAnchorItem.index > 2 ? nextAnchorItem.index - 3 : 0
				this.endIndex = this.startIndex + this.displayCount - 1
				this.anchorItem.index = nextAnchorItem.index
				this.anchorItem.offset = nextAnchorItem.top
			} else {
				const cachedItemLength = this.cachedItemRect.length
				const unCachedDelta = scrollTop - this.cachedItemRect[cachedItemLength - 1].bottom
				const guesstimatedUnCachedCount = Math.ceil(unCachedDelta / this.averageHeight)
				this.startIndex = this.endIndex + guesstimatedUnCachedCount - 3
				this.endIndex = this.startIndex + this.displayCount - 1
				this.cachedItemRect.length = 0
				this.upperHeight = scrollTop
			}
			this.next()
		}
	}

	public down() {
		const scrollTop = this.scrollerDom.scrollTop
		if (scrollTop < this.anchorItem.offset) {
			// const startItem = this.cachedItemRect[this.startIndex]
			const nextAnchorItem = this.cachedItemRect.find((item: any, index: number) => {
				return item ? item.bottom > scrollTop : false
			})
			const nextStartIndex = nextAnchorItem.index - 3
			if (this.cachedItemRect[nextStartIndex > 0 ? nextStartIndex : 0]) {
				this.startIndex = nextAnchorItem.index > 2 ? nextAnchorItem.index - 3 : 0
				this.endIndex = this.startIndex + this.displayCount - 1
				this.anchorItem.index = nextAnchorItem.index
				this.anchorItem.offset = nextAnchorItem.top
			} else {
				const guesstimatedAnchorIndex = Math.ceil((this.scrollerDom.scrollTop / this.anchorItem.offset) * this.anchorItem.index) - 1
				this.startIndex = guesstimatedAnchorIndex > 2 ? guesstimatedAnchorIndex - 3 : guesstimatedAnchorIndex
				this.endIndex = this.startIndex + this.displayCount - 1
				this.cachedItemRect.length = 0
				this.upperHeight = this.scroller.state.upperPlaceholderHeight
			}
			this.next()
		}
	}

	public subscribe(callback: Callback) {
		this.callback = callback
	}
}
