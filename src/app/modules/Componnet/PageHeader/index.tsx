import React from 'react'
import { connect } from 'react-redux'
import { Layout, Button } from 'antd'
import './index.less'
import { IGProfile, KEYOF_G_PROFILE_REDUCER } from '@app/store/globalProfile/config'
import * as actions from '@app/store/globalProfile/action'
import logoImage from '@app/asserts/images/log.jpg'
import { RouteComponentProps } from 'react-router'

const { Header } = Layout
function PageHeaderRoot(props: IPageHeaderRootProps) {
	const { g_languageSet, g_globalId, updateGLanguageSet } = props
	const { isSetPageHeaderHidder } = props
	if (isSetPageHeaderHidder) {
		return null
	}
	return (
		<header className="app-page-header">
			<Layout>
				<Header>
					<a className="log-link" href="/" target="_blank" title="React App">
						<div className="protail-wrapper">
							<img className="log-img" src={logoImage} title="Logo Image" />
							<span title={g_globalId}>React App</span>
						</div>
					</a>
					<div>
						Language:{' '}
						<Button size="small" style={{ marginLeft: '8px' }} onClick={updateGLanguageSet}>
							{g_languageSet || '-'}
						</Button>
					</div>
				</Header>
			</Layout>
		</header>
	)
}
PageHeaderRoot.defaultProps = {
	isSetPageHeaderHidder: false,
}
interface IPageHeaderRootProps extends RouteComponentProps, IGProfile {
	isSetPageHeaderHidder: boolean
	[key: string]: any
}

export default connect(
	(state: { [key: string]: any } = {}, ownProps) => {
		return {
			...ownProps,
			...state[KEYOF_G_PROFILE_REDUCER],
		}
	},
	{ ...actions }
)(PageHeaderRoot)
