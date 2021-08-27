import React from 'react'
import { Parent } from './ReactForwardRef'

function TestsRoot(props: any) {
	return (
		<>
			<Parent />
		</>
	)
}

export default React.memo(TestsRoot)
