import { TCommonComponentBaseProps } from '../../../types/comm.types'
import React from 'react'
import './index.less'

const appPageContentStyle: { [key: string]: string | number } = {
	height: `calc(100vh - 95px)`,
	minHeight: `calc(100vh - 95px)`,
	overflow: 'auto',
	backgroundColor: `rgba(202, 202, 202, 0.3)`,
}

function PageContentRoot(props: TCommonComponentBaseProps): React.ReactElement {
	// console.log(`PageContentRoot ☆☆☆`, props)
	return (
		<main className="app-page-content" style={appPageContentStyle}>
			{props.children}
		</main>
	)
}

export default React.memo(PageContentRoot)
