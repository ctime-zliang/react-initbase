import React from 'react'
import PageContent from '@/modules/Componnet/PageContent'
import PageHeader from '@/modules/Componnet/PageHeader'
import PageFooter from '@/modules/Componnet/PageFooter'

function Layout(props: any) {
	console.log(`Layout ☆☆☆`, props)
	return (
		<>
			<PageHeader />
			<PageContent>{props.children}</PageContent>
			<PageFooter />
		</>
	)
}

export default React.memo(Layout)
