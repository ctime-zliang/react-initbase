import Mock from 'mockjs'
/* ... */
import recordList from './data/record.list'
import recordItem from './data/record.item'

Mock.mock(/\/record\/fetchList/, `get`, (...args: any) => {
	return recordList
})
Mock.mock(/\/record\/fetchItem/, `get`, (...args: any) => {
	return recordItem
})

export default Mock
