import * as colors from 'colors'

/**
 * See https://www.npmjs.com/package/tracer for full configuration info.
 */
export default require('tracer').colorConsole({
	filters: [
		colors.bgBlack,
		colors.white,
		{
			warn: colors.yellow,
			error: [colors.red, colors.bold],
			info: [colors.bgCyan, colors.black]
		}
	],
	format: '[{{file}}]:{{line}} [{{title}}] {{message}}',
	dateformat: 'HH:MM:ss.L'
})