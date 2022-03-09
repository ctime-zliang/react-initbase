import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { useTranslation } from 'react-i18next'
import { TGProfile, KEYOF_G_PROFILE_REDUCER } from '@app/store/globalProfile/config'
import * as actions from '@app/store/globalProfile/action'
import { RouteComponentProps } from 'react-router'
import './index.less'

const { Footer } = Layout
function PageFooterRoot(props: TPageFooterRootProps) {
	const { t } = useTranslation()
	const { isSetPageFooterHidder } = props
	if (isSetPageFooterHidder) {
		return null
	}
	return (
		<footer className="app-page-footer">
			<Layout>
				<Footer>Copyright Admin &copy;2010 - 2020 · {t('China')}</Footer>
			</Layout>
		</footer>
	)
}
PageFooterRoot.defaultProps = {
	isSetPageFooterHidder: false,
}
type TPageFooterRootProps = {
	isSetPageFooterHidder: boolean
	[key: string]: any
} & RouteComponentProps &
	TGProfile

export default connect(
	(state: { [key: string]: any } = {}, ownProps) => {
		return {
			...ownProps,
			...state[KEYOF_G_PROFILE_REDUCER],
		}
	},
	{ ...actions }
)(PageFooterRoot)
