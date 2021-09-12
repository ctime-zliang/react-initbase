import React, { useState } from 'react'
import { InfiniteScroller } from './Scroller/scroller.class'

const createItemsData = () => {
	const list = []
	const len = 100
	for (let i = 0; i < len; i++) {
		list.push({ id: i + 1, text: `Text ${i + 1}` })
	}
	return list
}

const CellComponent = (props: any) => {
	// console.log(props)
	const { layerItemData } = props
	return (
		<div data-tagitem="cell-component-container">
			{layerItemData.id}. Cell Component: {layerItemData.text}
		</div>
	)
}

function InfiniteScrollRoot(props: any) {
	const [items, setItems] = useState(createItemsData())
	const [cache, setCache] = useState([])
	const [initialScrollTop, setInitialScrollTop] = useState(0)
	const onScroll = () => {
		console.log('onScroll')
	}
	const onEnd = () => {
		console.log('onEnd')
		// setItems([...items, ...createItemsData()])
	}
	return (
		<>
			<InfiniteScroller
				containerHeight={300}
				itemAverageHeight={64}
				items={items}
				itemKey="id"
				onRenderCell={CellComponent}
				onScroll={onScroll}
				onEnd={onEnd}
				initialScrollTop={initialScrollTop}
				cache={cache}
			/>
		</>
	)
}

export default React.memo(InfiniteScrollRoot)
