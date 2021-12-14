export const BaseConfig: { [key: string]: any } = {
	remoteRequestUrlPrefix(): string {
		if (process.env.CLIENT_ONLY) {
			return `http://127.0.0.1:12001`
		}
		return `http://127.0.0.1:12101/api`
	},
}
