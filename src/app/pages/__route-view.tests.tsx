import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from '@/pages/Layout'
import HomeRoute from '@/pages/$Home'
import Error404 from '@/pages/ErrorPage/404'
import RecordMgrList from '@/pages/RecordMgr/List'
import RecordMgrDetail from '@/pages/RecordMgr/Detail'
import RecordMgrError from '@/pages/RecordMgr/Error'
import EntryLinkList from '@/pages/$EntryLinkList/List'
import CssRenderTest from '@/pages/CssRenderTest'
import InfiniteScrolling from '@/pages/InfiniteScrolling'
import TestModules from '@/pages/TestModules'

export default () => {
	return (
		<Switch>
			<Route
				exact={true}
				path="/"
				render={routerProps => {
					return (
						<Layout {...routerProps}>
							<HomeRoute {...routerProps} />
						</Layout>
					)
				}}
			></Route>
			<Route
				exact={true}
				path="/link"
				render={routerProps => {
					return (
						<Layout {...routerProps}>
							<EntryLinkList {...routerProps} />
						</Layout>
					)
				}}
			></Route>
			<Route
				exact={true}
				path="/tests"
				render={routerProps => {
					return (
						<Layout {...routerProps}>
							<TestModules {...routerProps} />
						</Layout>
					)
				}}
			></Route>
			<Route
				exact={true}
				path="/inf-scroll"
				render={routerProps => {
					return (
						<Layout {...routerProps}>
							<InfiniteScrolling {...routerProps} />
						</Layout>
					)
				}}
			></Route>
			<Route
				exact={true}
				path="/cssrender"
				render={routerProps => {
					return (
						<Layout {...routerProps}>
							<CssRenderTest {...routerProps} />
						</Layout>
					)
				}}
			></Route>
			<Route
				exact={true}
				render={() => {
					return (
						<Switch>
							<Route
								exact={true}
								path="/record"
								render={routerProps => {
									return (
										<Layout {...routerProps}>
											<RecordMgrList {...routerProps} />
										</Layout>
									)
								}}
							></Route>
							<Route
								exact={true}
								path="/record/detail/:id"
								render={routerProps => {
									console.log(routerProps)
									return (
										<Layout {...routerProps}>
											<RecordMgrDetail {...routerProps} />
										</Layout>
									)
								}}
							></Route>
							<Route
								path="/record/*"
								render={routerProps => {
									return (
										<Layout {...routerProps}>
											<RecordMgrError />
										</Layout>
									)
								}}
							></Route>
						</Switch>
					)
				}}
			></Route>
			<Route
				path="*"
				render={routerProps => {
					return (
						<Layout {...routerProps}>
							<Error404 />
						</Layout>
					)
				}}
			></Route>
		</Switch>
	)
}
