import React from 'react'

const storage: { status: string; result: any } = {
	status: 'pending',
	result: null,
}

const data = new Promise(resolve => setTimeout(() => resolve('结果'), 3000))

function wrapPromise(promise: any) {
	let suspender = promise.then(
		(r: any) => {
			storage.status = 'success'
			storage.result = r
		},
		(e: any) => {
			storage.status = 'error'
			storage.result = e
		}
	)
	if (storage.status === 'pending') {
		throw suspender
	} else if (storage.status === 'error') {
		throw storage.result
	} else if (storage.status === 'success') {
		return storage.result
	}
}

function App() {
	const state = wrapPromise(data)
	return <div>{state}</div>
}

function Loading() {
	return <div>..loading</div>
}

export class TodoApp extends React.Component {
	render() {
		storage.status = 'pending'
		return (
			<React.Suspense fallback={<Loading></Loading>}>
				<App />
			</React.Suspense>
		)
	}
}
