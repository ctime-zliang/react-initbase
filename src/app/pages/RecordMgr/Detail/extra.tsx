import React from 'react'
import styled from 'styled-components'
import { Alert, Button } from 'antd'
import { RouteComponentProps } from 'react-router'
import { inject, observer } from 'mobx-react'
import { TTestMobxStoreClass } from '@app/store/__mobx/testStore'

const Container = styled.div`
	padding: 25px 65px;
	display: flex;
`

function Extra(props: TExtraProps) {
	const testMobxStore: TTestMobxStoreClass = props.testMobxStore
	const changeStamp = (): void => {
		testMobxStore.modifyStamp(new Date().getTime())
	}
	return (
		<Container>
			<Alert message={`The Stamp is: ${testMobxStore.getStamp}`} type="info" showIcon style={{ width: '100%' }} />
			<Button onClick={changeStamp} style={{ height: 'inherit', marginLeft: '15px' }}>
				Change Stamp
			</Button>
		</Container>
	)
}
type TExtraProps = {
	testMobxStore: TTestMobxStoreClass
	[key: string]: any
} & RouteComponentProps

export default inject('testMobxStore')(observer(Extra))
