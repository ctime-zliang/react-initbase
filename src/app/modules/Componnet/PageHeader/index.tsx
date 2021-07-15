import React from 'react'
import { connect } from 'react-redux'
import { Layout, Button } from 'antd'
import './index.less'
import { IGProfile, KEY_G_PROFILE_REDUCER } from '@/store/profile/config'
import * as actions from '@/store/profile/action'
import logoImage from '@/asserts/images/log.jpg'
import { RouteComponentProps } from 'react-router'

const { Header } = Layout
function PageHeaderRoot(props: IPageHeaderRootProps) {
	const { g_languageSet, g_globalId, updateGLanguageSet } = props
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
interface IPageHeaderRootProps extends RouteComponentProps, IGProfile {
	[key: string]: any
}

export default connect(
	(state: { [key: string]: any } = {}, ownProps) => {
		return {
			...ownProps,
			...state[KEY_G_PROFILE_REDUCER],
		}
	},
	{
		...actions,
	}
)(PageHeaderRoot)
