const BASE_DEGREE = Math.PI / 180
const gClockProfile = {
	/* 画布尺寸 */
	canvasWidth: 200,
	canvasHeight: 200,
	/* 表盘半径 */
	clockRadius: 0,
	innerClockRadius: 0,
	/* 表盘标记 */
	distOfMark2Outline: 10,
	hourMarkStrokeColor: '#ffffff',
	hourMarkWidth: 3,
	hourMarkLength: 20,
	minMarkStrokeColor: '#536b7a',
	minMarkWidth: 2,
	minMarkLength: 10,
	/* 文本标记 */
	distOfTextMark2Outline: 50,
	timeTextMarkFillColor: '#58717e',
	timeTextMarkFont: '32px Microsoft yahei',
	/* 指针 */
	hourHandFillColor: '#ffffff',
	hourHandStrokeColor: '#ffffff',
	hourHandWidth: 10,
	hourHandLength: 0,
	minHandFillColor: '#ffffff',
	minHandStrokeColor: '#ffffff',
	minHandWidth: 6,
	minHandLength: 0,
	secHandFillColor: '#ffffff',
	secHandStrokeColor: '#ffffff',
	secHandWidth: 4,
	secHandLength: 0,
	secHandOverflowLength: 38,
	/* 中心圆/环 */
	centerCircleRadius: 15,
	centerCircleFillColor: '#ffffff',
	centerRingInnerRadius: 8,
	centerRingWidth: 1,
	centerRingFillColor: '#cdd2d5',
	/* 边框 */
	clockOutlineWidth: 8,
}

function initialProfile(options: any = {}) {
	const o = JSON.parse(JSON.stringify(gClockProfile))
	const profile = {
		...o,
		...options,
	}
	const baseSize = Math.min(profile.canvasWidth, profile.canvasHeight)
	if (!profile.clockRadius) {
		profile.clockRadius = baseSize * 0.5
	}
	profile.innerClockRadius = profile.clockRadius - profile.clockOutlineWidth
	if (!profile.hourHandLength) {
		profile.hourHandLength = profile.innerClockRadius - 45
	}
	if (!profile.minHandLength) {
		profile.minHandLength = profile.innerClockRadius - 15
	}
	if (!profile.secHandLength) {
		profile.secHandLength = profile.innerClockRadius - 10
	}
	return profile
}

function drawCanvas(canvasElement: HTMLCanvasElement, profile: any) {
	if (!canvasElement || canvasElement.nodeName.toUpperCase() != 'CANVAS') {
		return
	}
	const ctx: any = canvasElement.getContext('2d')
	const now = new Date()
	const sec = now.getSeconds()
	const min = now.getMinutes()
	const hour = now.getHours()
	const msec = now.getMilliseconds()

	/* 保存一份初始 ctx 状态 */
	ctx.save()
	/* 
        绘制表盘底色 
    */
	ctx.clearRect(0, 0, profile.canvasWidth, profile.canvasHeight)
	const lingrad = ctx.createLinearGradient(0, 0, profile.canvasWidth, profile.canvasHeight)
	lingrad.addColorStop(0, '#242f37')
	lingrad.addColorStop(1, '#48585c')
	ctx.fillStyle = lingrad
	ctx.arc(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5, profile.innerClockRadius, 0, Math.PI * 2, true)
	ctx.fill()
	ctx.restore()

	ctx.save()
	/* 
        小时刻度 
    */
	ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5)
	const hourMarkStartX = profile.innerClockRadius - profile.distOfMark2Outline
	for (let i = 0; i < 12; i++) {
		ctx.beginPath()
		ctx.strokeStyle = profile.hourMarkStrokeColor
		ctx.lineWidth = profile.hourMarkWidth
		ctx.rotate(30 * BASE_DEGREE)
		ctx.moveTo(hourMarkStartX, 0)
		ctx.lineTo(hourMarkStartX - profile.hourMarkLength, 0)
		ctx.stroke()
	}
	ctx.restore()

	ctx.save()
	/* 
        分钟刻度 
    */
	ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5)
	const minMarkStartX = profile.innerClockRadius - profile.distOfMark2Outline
	for (let i = 1; i <= 60; i++) {
		if (i % 5 !== 0) {
			ctx.beginPath()
			ctx.strokeStyle = profile.minMarkStrokeColor
			ctx.lineWidth = profile.minMarkWidth
			ctx.rotate(6 * BASE_DEGREE)
			ctx.moveTo(minMarkStartX, 0)
			ctx.lineTo(minMarkStartX - profile.minMarkLength, 0)
			ctx.stroke()
			continue
		}
		ctx.rotate(6 * BASE_DEGREE)
	}
	ctx.restore()

	ctx.save()
	/* 
        文本标记 
    */
	ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5)
	const textMarkStatRelativeX = profile.innerClockRadius - profile.distOfTextMark2Outline
	ctx.fillStyle = profile.timeTextMarkFillColor
	ctx.font = profile.timeTextMarkFont
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.fillText('3', textMarkStatRelativeX, 4)
	ctx.fillText('6', 0, textMarkStatRelativeX)
	ctx.fillText('9', -textMarkStatRelativeX, 4)
	ctx.fillText('12', 0, -textMarkStatRelativeX)
	ctx.restore()

	ctx.save()
	/* 
        秒针 
    */
	ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5)
	ctx.rotate(-90 * BASE_DEGREE)
	ctx.lineWidth = profile.secHandWidth
	ctx.strokeStyle = profile.secHandStrokeColor
	ctx.rotate(((360 * (sec * 1000 + msec)) / 60000) * BASE_DEGREE)
	ctx.beginPath()
	ctx.moveTo(0, 0)
	ctx.lineTo(profile.secHandLength, 0)
	ctx.stroke()
	ctx.closePath()
	ctx.restore()

	ctx.save()
	/* 
        分针 
    */
	ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5)
	ctx.rotate(-90 * BASE_DEGREE)
	ctx.lineWidth = profile.minHandWidth
	ctx.strokeStyle = profile.minHandStrokeColor
	ctx.rotate(6 * min * BASE_DEGREE + ((6 * sec) / 60) * BASE_DEGREE)
	ctx.beginPath()
	ctx.moveTo(0, 0)
	ctx.lineTo(profile.minHandLength, 0)
	ctx.stroke()
	ctx.closePath()
	ctx.restore()

	ctx.save()
	/* 
        时针 
    */
	ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5)
	ctx.rotate(-90 * BASE_DEGREE)
	ctx.lineWidth = profile.hourHandWidth
	ctx.strokeStyle = profile.hourHandStrokeColor
	ctx.rotate(30 * (hour % 12) * BASE_DEGREE + ((30 * min) / 60) * BASE_DEGREE)
	ctx.beginPath()
	ctx.moveTo(0, 0)
	ctx.lineTo(profile.hourHandLength, 0)
	ctx.stroke()
	ctx.closePath()
	ctx.restore()

	ctx.save()
	/* 
        针中心环 
    */
	ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5)
	ctx.beginPath()
	ctx.fillStyle = profile.centerCircleFillColor
	ctx.arc(0, 0, profile.centerCircleRadius, 0, Math.PI * 2, true)
	ctx.fill()
	ctx.closePath()
	/* 针中心圆 */
	ctx.beginPath()
	ctx.strokeStyle = profile.centerRingFillColor
	ctx.lineWidth = profile.centerRingWidth
	ctx.arc(0, 0, profile.centerRingInnerRadius, 0, Math.PI * 2, true)
	ctx.stroke()
	ctx.closePath()
	ctx.restore()

	ctx.save()
	/* 
        秒针针尾 
    */
	ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5)
	ctx.rotate(-90 * BASE_DEGREE)
	ctx.beginPath()
	ctx.lineWidth = profile.secHandWidth
	ctx.strokeStyle = profile.secHandStrokeColor
	ctx.rotate(((360 * (sec * 1000 + msec)) / 60000) * BASE_DEGREE)
	ctx.moveTo(0, 0)
	ctx.lineTo(-profile.secHandOverflowLength, 0)
	ctx.stroke()
	ctx.closePath()
	ctx.restore()

	ctx.save()
	/* 
        表面边框 
    */
	ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5)
	const lingradOutline = ctx.createLinearGradient(profile.innerClockRadius, 0, -profile.innerClockRadius, 0)
	ctx.beginPath()
	ctx.lineWidth = profile.clockOutlineWidth
	lingradOutline.addColorStop(0, '#adb9c5')
	lingradOutline.addColorStop(1, '#e9eced')
	ctx.strokeStyle = lingradOutline
	ctx.arc(0, 0, profile.innerClockRadius, 0, Math.PI * 2, true)
	ctx.stroke()
	ctx.closePath()
	ctx.restore()
}

export default class Clock {
	rAFHandle: any = null
	canvasElement: HTMLCanvasElement
	profile: { [key: string]: any }

	constructor(canvasElement: HTMLCanvasElement, profile: any) {
		this.canvasElement = canvasElement
		this.profile = initialProfile(profile)
	}

	render() {
		const r = () => {
			drawCanvas(this.canvasElement, this.profile)
			this.rAFHandle = window.requestAnimationFrame(r)
		}
		r()
	}

	cancel() {
		window.cancelAnimationFrame(this.rAFHandle)
	}
}
