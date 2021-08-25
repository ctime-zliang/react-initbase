import React from 'react'
import Scroller from './Scroller/scroller'

function InfiniteScrollRoot(props: any) {
	return (
		<>
			<Scroller />
		</>
	)
}

export default React.memo(InfiniteScrollRoot)
