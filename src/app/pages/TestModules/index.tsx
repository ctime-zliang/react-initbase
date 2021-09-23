import React from 'react'
import { Parent } from './ReactForwardRef'
import { Wrapper } from './AsyncSetStateOfClassComponent'

function TestsRoot(props: any) {
	return (
		<>
			<Wrapper />
		</>
	)
}

export default React.memo(TestsRoot)
