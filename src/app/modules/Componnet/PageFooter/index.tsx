import React from 'react'
import { Layout } from 'antd'
import './index.less'

const { Footer } = Layout
function PageFooterRoot() {
	return (
		<footer className="app-page-footer">
			<Layout>
				<Footer>Copyright Admin &copy;2010 - 2020</Footer>
			</Layout>
		</footer>
	)
}

export default React.memo(PageFooterRoot)
