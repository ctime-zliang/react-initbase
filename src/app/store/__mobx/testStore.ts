import { action, computed, observable, makeObservable } from 'mobx'

export interface ITestMobxStoreClass {
	baseData: ITestMobxStoreBaseData
	count: number
	getStamp: () => number
	modifyStamp: (value: number) => void
}
export interface ITestMobxStoreBaseData {
	index: number
	stamp: number
}

class TestMobxStoreClass {
	constructor() {
		makeObservable(this)
	}

	@observable baseData: ITestMobxStoreBaseData = {
		index: 0,
		stamp: new Date().getTime(),
	}

	@computed get getStamp(): number {
		return this.baseData.stamp
	}

	@action modifyStamp(value: number): void {
		this.baseData.stamp = value
	}
}
export const testMobxStore = new TestMobxStoreClass()
