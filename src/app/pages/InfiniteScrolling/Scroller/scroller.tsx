import React, { ReactElement, useRef, useState } from 'react'
import styles from './index.module.less'

function ItemChild(props: any): ReactElement {
    const { onRenderCell, item, itemIndex } = props 
    const container = useRef<any>(null)
    return (
        <div ref={container}>
            {onRenderCell(item, itemIndex)}
        </div>
    )
}

function Scroller(props: any) {
    const { scrollContainerHeight, identity } = props
	const scrollContainer = useRef<any>(null)
    const upperPlaceholderElement = useRef<any>(null)
    const list = useState<object[]>([])
    const upperPlaceholderHeight = useState<number>(0)
    const underPlaceholderHeight = useState<number>(0)
    const startIndex = useState<number>(0)
    const endIndex = useState<number>(0)
    const anchorItem = useState<any>({
        index: 0,
        offset: 0
    })

    const createChild = (item: {[key: string]: any}, index: number) => {
        const itemIndex: number = +startIndex + index
        return (
            <ItemChild 
                item={item}
                itemIndex={itemIndex}
            />
        )
    }

    const onScroll = (e: any) => {
        console.log(e)
    }

	return (
		<>
			<div 
				ref={scrollContainer} 
				className={styles['scroll-container']}
				style={{ height: scrollContainerHeight }}
				onScroll={onScroll}
			>
                <div ref={upperPlaceholderElement} style={{ height: upperPlaceholderHeight + 'px' }}></div>
                {
                    list.map((item: {[key: string]: any}, index: number) => {
                        // return React.createElement(
                        //     createChild(item, index), 
                        //     { 
                        //         key: identity ? item[identity] : index 
                        //     }
                        // )
                    })}
                <div style={{ height: underPlaceholderHeight + 'px' }}></div>
			</div>
		</>
	)
}

export default React.memo(Scroller)