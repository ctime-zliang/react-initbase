import mockjs from 'mockjs'
/* ... */
import recordList from './data/record.list'
import recordItem from './data/record.item'

mockjs.mock(/\/record\/fetchList/, `get`, (...args: any) => {
	return recordList
})
mockjs.mock(/\/record\/fetchItem/, `get`, (...args: any) => {
	return recordItem
})

export default mockjs
