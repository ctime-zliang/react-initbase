export default class ColorTool {
	public setHex2RGBA(hexString: string, opacity: string | number = 1): string {
		return (
			'rgba(' +
			parseInt('0x' + hexString.slice(1, 3)) +
			', ' +
			parseInt('0x' + hexString.slice(3, 5)) +
			', ' +
			parseInt('0x' + hexString.slice(5, 7)) +
			', ' +
			opacity +
			')'
		)
	}
}
