import React, { useState } from 'react'

let count = 0
function TestsRoot(props: any) {
	const [list, setList] = useState<any[]>([])
	const clickAction = () => {
		// count++
		// const a: any[] = []
		// for (let i = 0; i < 10000; i++) {
		// 	a.push(count)
		// }
		// setList(a)
	}
	return (
		<>
			<div onClick={clickAction}>Test</div>
			<ul>
				{list.map((item: any, index: number) => {
					return <li key={index}>{item}</li>
				})}
			</ul>
		</>
	)
}

export default React.memo(TestsRoot)
