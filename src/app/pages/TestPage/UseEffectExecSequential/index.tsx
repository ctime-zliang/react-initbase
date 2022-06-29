import React, { useEffect, useState } from 'react'

function A1(props: any) {
	const { count } = props
	useEffect(() => {
		console.log(`Component A1 useEffect.`)
		return () => {
			console.log(`Component A1 useEffect return-callback.`)
		}
	})
	return (
		<div data-tag="A1">
			<B1 count={count} />
			{count <= 3 ? <B2 count={count} /> : null}
			<B3 count={count} />
		</div>
	)
}

function B1(props: any) {
	const { count } = props
	useEffect(() => {
		console.log(`Component B1 useEffect.`)
		return () => {
			console.log(`Component B1 useEffect return-callback.`)
		}
	})
	return (
		<div data-tag="B1">
			<C1 count={count} />
		</div>
	)
}

function C1(props: any) {
	const { count } = props
	useEffect(() => {
		console.log(`Component C1 useEffect.`)
		return () => {
			console.log(`Component C1 useEffect return-callback.`)
		}
	})
	return <div data-tag="C1">C1 - {count}</div>
}

function B2(props: any) {
	const { count } = props

	const [number, setNumber] = useState(0)

	useEffect(() => {
		let timer = window.setInterval(() => {
			console.log(`++`)
			setNumber(value => {
				return value + 1
			})
		}, 1000)
		return () => {
			window.clearInterval(timer)
		}
	}, [])

	useEffect(() => {
		console.log(`Component B2 useEffect.`)
		return () => {
			console.log(`Component B2 useEffect return-callback.`)
		}
	})
	return (
		<div data-tag="B2">
			<em>{number}</em>
			<C2 count={count} />
		</div>
	)
}

function C2(props: any) {
	const { count } = props
	useEffect(() => {
		console.log(`Component C2 useEffect.`)
		return () => {
			console.log(`Component C2 useEffect return-callback.`)
		}
	})
	return <div data-tag="C2">C2 - {count}</div>
}

function B3(props: any) {
	const { count } = props
	useEffect(() => {
		console.log(`Component B3 useEffect.`)
		return () => {
			console.log(`Component B3 useEffect return-callback.`)
		}
	})
	return <div data-tag="B3">{count <= 2 ? <C31 count={count} /> : <C32 count={count} />}</div>
}

function C31(props: any) {
	const { count } = props
	useEffect(() => {
		console.log(`Component C31 useEffect.`)
		return () => {
			console.log(`Component C31 useEffect return-callback.`)
		}
	})
	return <div data-tag="C31">C31 - {count}</div>
}

function C32(props: any) {
	const { count } = props
	useEffect(() => {
		console.log(`Component C32 useEffect.`)
		return () => {
			console.log(`Component C32 useEffect return-callback.`)
		}
	})
	return <div data-tag="C32">C32 - {count}</div>
}

/*
	[WrapperComponent Function]
	|
    A1
    |
    B1 —— B2 —— B3
    |     |     |
    C1    C2    C31( —— C32)

    effect do - mounted
        C1
        B1
		C2
        B2
        C31
        (C32)
        B3
        A1

    effect callback - unmounted
        C1
        B1
		C2
        B2
        C31
        (C32)
        B3
        A1
 */

export function Wrapper(props: any) {
	const [count, setCount] = useState(0)
	return (
		<div data-tag="wrapper">
			<button
				onClick={() => {
					setCount(count + 1)
				}}
			>
				Set Count
			</button>
			<span>{count}</span>
			{count <= 4 ? <A1 count={count} /> : null}
			{count >= 1 ? <div>大于等于 1</div> : <div>小于 1</div>}
		</div>
	)
}
