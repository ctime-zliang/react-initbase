import React from 'react'
import PageContent from '@/modules/Componnet/PageContent'
import PageHeader from '@/modules/Componnet/PageHeader'
import PageFooter from '@/modules/Componnet/PageFooter'

function Layout(props: any) {
	console.log(`Layout ☆☆☆`, props)
	const meta = props.meta || {}
	return (
		<>
			<PageHeader {...props} {...meta} />
			<PageContent>{props.children}</PageContent>
			<PageFooter {...props} {...meta} />
		</>
	)
}

export default React.memo(Layout)
