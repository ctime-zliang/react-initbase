export default ({ css, cssChunks, js, jsChunks, state, content, styles, helmet }: any) => {
	let _css: string[] = Array.from(new Set(css)) as string[]
	let _js: string[] = Array.from(new Set(js)) as string[]
    let _cssChunks: string[] = Array.from(new Set(cssChunks)) as string[]
	let _jsChunks: string[] = Array.from(new Set(jsChunks)) as string[]
	let _cssString = ``
	let _jsString = ``

    const _cssPaths = [..._cssChunks, ..._css]
    const _jsPaths = [..._jsChunks, ..._js]
	_cssPaths.forEach((item: string) => {
		_cssString += `<link rel="stylesheet" href=${item} />\n`
	})
	_jsPaths.forEach((item: string) => {
		_jsString += `<script src=${item}></script>\n`
	})
	return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                ${_cssString}                
                ${helmet.title.toString() || 'React - Application'}
                ${helmet.base.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                ${helmet.script.toString()}
                ${styles}
                <script>
                    window.__PRELOADED_STATE__ = ${state}
                </script>
            </head>
            <body>
                <div id="app" class="app">${content}</div>
                ${_jsString}
            </body>
        </html>
    `
}
