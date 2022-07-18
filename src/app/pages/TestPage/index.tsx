import React from 'react'
import { Parent as ReactForwardRefParent } from './ReactForwardRef'
import { Wrapper as AsyncSetStateOfClassComponentWrapper } from './AsyncSetStateOfClassComponent'
import { Wrapper as UseEffectExecSequentialWrapper } from './UseEffectExecSequential'
import { AddLongChild } from './AddChild'

function TestPageRoot(props: any) {
	return (
		<>
			<AddLongChild />
		</>
	)
}

export default React.memo(TestPageRoot)
