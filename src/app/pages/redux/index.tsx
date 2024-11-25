import React from 'react'
import { Helmet } from 'react-helmet-async'
import ReduxRoot from '../../modules/reduxTest'
import { TCommonComponentBaseProps } from '../../types/comm.types'

function ReduxContainerRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`ReduxContainerRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Redux State Manager</title>
			</Helmet>
			<ReduxRoot {...props} />
		</>
	)
}

export default React.memo(ReduxContainerRoot)
