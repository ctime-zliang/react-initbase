export const BaseConfig: { [key: string]: any } = {
	remoteRequestUrlPrefix(): string {
		if (process.env.__CLIENT_ONLY__) {
			return `http://127.0.0.1:12001`
		}
		return `http://127.0.0.1:12101/api`
	},
}
