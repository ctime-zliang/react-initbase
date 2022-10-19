import React from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from 'antd'
import './index.less'
import { TCommonComponentBaseProps } from '../../../types/comm.types'

const { Footer } = Layout

function PageFooterRoot(props: TCommonComponentBaseProps): React.ReactElement {
	// console.log(`PageFooterRoot ☆☆☆`, props)
	const { t } = useTranslation()
	return (
		<footer className="app-page-footer">
			<Layout>
				<Footer>Copyright Admin &copy;2010 - 2020, {t('China')}</Footer>
			</Layout>
		</footer>
	)
}

export default React.memo(PageFooterRoot)
