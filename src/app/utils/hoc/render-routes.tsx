import React from 'react'
import { IRouteItem } from '../../router/config'
import { Route, Redirect, Switch } from 'react-router-dom'

function createSpecRoute(route: IRouteItem, profile: any, outerProps: any) {
	let SpecComponent: any = null
	if (route.noMatch) {
		SpecComponent = route.noMatch
	}
	if (profile.noMatch) {
		SpecComponent = profile.noMatch
	}
	if (SpecComponent) {
		return (
			<Route
				path={route.path}
				render={(props: any) => {
					return <SpecComponent path={route.path} {...props} {...outerProps}></SpecComponent>
				}}
			/>
		)
	}
	return null
}
function createRouteComponentList(routes: IRouteItem[], profile: any, outerProps: any) {
	return routes.map((route, index) => {
		return (
			<Route
				key={route.path}
				path={route.path}
				exact={route.exact}
				strict={route.strict}
				render={props => {
					if (!route.requiresAuth || route.path === profile.authPath) {
						return (
							<>
								<Switch>
									{createRouteComponentList(route.routes || route.children || [], profile, outerProps)}
									<Route
										exact={true}
										path={route.path}
										render={props => {
											return <route.component exact={true} path={route.path} {...props} {...outerProps}></route.component>
										}}
									/>
									{createSpecRoute(route, profile, outerProps)}
								</Switch>
							</>
						)
					}
					return <Redirect to={{ pathname: profile.authPath }} {...props} />
				}}
			/>
		)
	})
}

export function renderRoutes(routes: IRouteItem[], profile: any, outerProps: any) {
	return <Switch>{createRouteComponentList(routes, profile, outerProps)}</Switch>
}
