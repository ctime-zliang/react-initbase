import React from 'react'
import { Parent as ReactForwardRefParent } from './ReactForwardRef'
import { Wrapper as AsyncSetStateOfClassComponentWrapper } from './AsyncSetStateOfClassComponent'
import { Wrapper as UseEffectExecSequentialWrapper } from './UseEffectExecSequential'

function TestPageRoot(props: any) {
	return (
		<>
			<UseEffectExecSequentialWrapper />
		</>
	)
}

export default React.memo(TestPageRoot)
