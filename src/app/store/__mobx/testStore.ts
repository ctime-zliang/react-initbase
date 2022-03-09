import { action, computed, observable, makeObservable } from 'mobx'

export type TTestMobxStoreClass = {
	baseData: TTestMobxStoreBaseData
	count: number
	getStamp: () => number
	modifyStamp: (value: number) => void
}
export type TTestMobxStoreBaseData = {
	index: number
	stamp: number
}

class TestMobxStoreClass {
	constructor() {
		makeObservable(this)
	}

	@observable baseData: TTestMobxStoreBaseData = {
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
