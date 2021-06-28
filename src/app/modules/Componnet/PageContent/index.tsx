import React from 'react'
import './index.less'

function PageContentRoot(props: any) {
	return (
		<main className="app-page-content" style={{ height: `calc(100% - 95px)`, minHeight: `calc(100vh - 95px)` }}>
			{props.children}
		</main>
	)
}

export default React.memo(PageContentRoot)
