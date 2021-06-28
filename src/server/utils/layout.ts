export default ({ css, js, state, content, styles, helmet }: any) => {
	const _css: string[] = Array.from(new Set(css))
	const _js: string[] = Array.from(new Set(js))
	let _cssString = ``
	let _jsString = ``

	_css.forEach((item: string) => {
		_cssString += `<link rel="stylesheet" href=${item} />\n`
	})
	_js.forEach((item: string) => {
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
