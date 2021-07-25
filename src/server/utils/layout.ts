/* ... */
export default ({ css, cssCommons, js, jsCommons, state, initialResult, content, styles, helmet }: any) => {
	initialResult = initialResult || JSON.stringify({})
	let _css: string[] = Array.from(new Set(css)) as string[]
	let _js: string[] = Array.from(new Set(js)) as string[]
	let _cssCommons: string[] = Array.from(new Set(cssCommons)) as string[]
	let _jsCommons: string[] = Array.from(new Set(jsCommons)) as string[]

	let cssString = ``
	let jsString = ``

	;[..._cssCommons, ..._css].forEach((item: string) => {
		cssString += `<link rel="stylesheet" href=${item} />\n`
	})
	;[..._jsCommons, ..._js].forEach((item: string) => {
		jsString += `<script src=${item}></script>\n`
	})
	return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                ${cssString}                
                ${helmet.title.toString() || 'React - Application'}
                ${helmet.base.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                ${helmet.script.toString()}
                ${styles}
                <script>
                    window.__PRELOADED_STATE__ = ${state}
                    window.__PRELOADED_RESULT__ = ${initialResult}
                </script>
            </head>
            <body>
                <div id="app" class="app">${content}</div>
                ${jsString}
            </body>
        </html>
    `
}
