import React from 'react'
import { TRouteItem } from '../../router/config'
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom'

function createSpecRoute(route: TRouteItem, profile: any, outerProps: any) {
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
function createRouteComponentList(routes: TRouteItem[], profile: any, outerProps: any) {
	return routes.map((route: TRouteItem, index: number) => {
		return (
			<Route
				key={route.path}
				path={route.path}
				exact={route.exact}
				strict={route.strict}
				render={(routerProps: RouteComponentProps) => {
					if (!route.requiresAuth || route.path === profile.authPath) {
						return (
							<>
								<Switch>
									{createRouteComponentList(route.routes || [], profile, outerProps)}
									<Route
										exact={true}
										path={route.path}
										render={(routerProps: RouteComponentProps) => {
											return (
												<route.layout {...routerProps} {...outerProps} {...route}>
													<route.component {...routerProps} {...outerProps} {...route}></route.component>
												</route.layout>
											)
										}}
									/>
									{createSpecRoute(route, profile, outerProps)}
								</Switch>
							</>
						)
					}
					return <Redirect to={{ pathname: profile.authPath }} {...routerProps} />
				}}
			/>
		)
	})
}

export function renderRoutes(routes: TRouteItem[], profile: any, outerProps: any) {
	return <Switch>{createRouteComponentList(routes, profile, outerProps)}</Switch>
}
