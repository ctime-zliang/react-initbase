import React from 'react'
import { BaseUseMemo, BaseUseCallback } from './Common'
import { Parent as ReactForwardRefParent } from './ReactForwardRef'
import { Wrapper as AsyncSetStateOfClassComponentWrapper } from './AsyncSetStateOfClassComponent'
import { Wrapper as UseEffectExecSequentialWrapper } from './UseEffectExecSequential'

function TestPageRoot(props: any) {
	return (
		<>
			<BaseUseCallback />
		</>
	)
}

export default React.memo(TestPageRoot)
