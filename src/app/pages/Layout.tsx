import React from 'react'
import PageContent from '@app/modules/Componnet/PageContent'
import PageHeader from '@app/modules/Componnet/PageHeader'
import PageFooter from '@app/modules/Componnet/PageFooter'

function Layout(props: any) {
	console.log(`Layout ☆☆☆`, props)
	const meta: { [key: string]: any } = props.meta || {}
	return (
		<>
			<PageHeader {...props} {...meta} />
			<PageContent>{props.children}</PageContent>
			<PageFooter {...props} {...meta} />
		</>
	)
}

export default React.memo(Layout)
