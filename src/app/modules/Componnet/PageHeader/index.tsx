import React from 'react'
import { Layout } from 'antd'
import './index.less'
import logoImage from '@/asserts/images/log.jpg'

const { Header } = Layout
function PageHeaderRoot(props: IPageHeaderRootProps) {
	const { userId } = props
	return (
		<header className="app-page-header">
			<Layout>
				<Header>
					<a className="log-link" href="/" target="_blank" title="React App">
						<div className="protail-wrapper">
							<img className="log-img" src={logoImage} title="Logo Image" />
							<span title={userId}>React App</span>
						</div>
					</a>
				</Header>
			</Layout>
		</header>
	)
}
interface IPageHeaderRootProps {
	userId?: string
}

export default React.memo(PageHeaderRoot)
