import React from 'react'
import { render as testingReactRender, screen } from '@testing-library/react'
import { render as enzymeRender, shallow } from 'enzyme'
import enzymeToJson from 'enzyme-to-json'

const App = () => {
	return (
		<section>
			<div>1</div>
			<div>2</div>
		</section>
	)
}

describe(`React App Test`, () => {
	it(`React DOM`, () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find('div').length).toBe(2)
	})
})
