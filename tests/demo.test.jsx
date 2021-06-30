import React from 'react'
import { render, screen } from '@testing-library/react'

const Main = () => {
	return (
		<>
			<div className="demo-jest-test">Demo Jest Test</div>
		</>
	)
}

describe(`Test React Component`, () => {
	test('DOM Operation', () => {
		render(<Main />)
		screen.debug()
		const element = document.querySelector(`.demo-jest-test`)
		expect(element).toBeTruthy()
		expect(element.textContent).toBe(`Demo Jest Test`)
	})
})
