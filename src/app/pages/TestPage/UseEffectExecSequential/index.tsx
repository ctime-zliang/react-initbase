import React, { useEffect, useState } from 'react'

function A1(props: any) {
	useEffect(() => {
		console.log(`Component A1 useEffect.`)
		return () => {
			console.log(`Component A1 useEffect return-callback.`)
		}
	})
	return (
		<div data-tag="A1">
			<B1 />
			<B2 />
			<B3 />
		</div>
	)
}

function B1(props: any) {
	useEffect(() => {
		console.log(`Component B1 useEffect.`)
		return () => {
			console.log(`Component B1 useEffect return-callback.`)
		}
	})
	return (
		<div data-tag="B1">
			<C1 />
		</div>
	)
}

function C1(props: any) {
	useEffect(() => {
		console.log(`Component C1 useEffect.`)
		return () => {
			console.log(`Component C1 useEffect return-callback.`)
		}
	})
	return <div data-tag="C1">C1</div>
}

function B2(props: any) {
	useEffect(() => {
		console.log(`Component B2 useEffect.`)
		return () => {
			console.log(`Component B2 useEffect return-callback.`)
		}
	})
	return (
		<div data-tag="B2">
			<C2 />
		</div>
	)
}

function C2(props: any) {
	useEffect(() => {
		console.log(`Component C2 useEffect.`)
		return () => {
			console.log(`Component C2 useEffect return-callback.`)
		}
	})
	return <div data-tag="C2">C2</div>
}

function B3(props: any) {
	useEffect(() => {
		console.log(`Component B3 useEffect.`)
		return () => {
			console.log(`Component B3 useEffect return-callback.`)
		}
	})
	return (
		<div data-tag="B3">
			<C3 />
			<C4 />
		</div>
	)
}

function C3(props: any) {
	useEffect(() => {
		console.log(`Component C3 useEffect.`)
		return () => {
			console.log(`Component C3 useEffect return-callback.`)
		}
	})
	return <div data-tag="C3">C3</div>
}

function C4(props: any) {
	useEffect(() => {
		console.log(`Component C4 useEffect.`)
		return () => {
			console.log(`Component C4 useEffect return-callback.`)
		}
	})
	return <div data-tag="C4">C4</div>
}

/*
	[WrapperComponent Function]
	|
    A1
    |
    B1 —— B2 —— B3
    |     |     |
    C1    C2    C3 —— C4

    effect do - mounted
        C1
        B1
		C2
        B2
        C3
        C4
        B3
        A1

    effect callback - unmounted
        C1
        B1
		C2
        B2
        C3
        C4
        B3
        A1
 */

export function Wrapper(props: any) {
	const [count, setCount] = useState<number>(0)
	return (
		<>
			<button
				onClick={(): void => {
					setCount(count + 1)
				}}
			>
				Set Count
			</button>
			<span>{count}</span>
			{count <= 2 ? <A1 /> : null}
		</>
	)
}
