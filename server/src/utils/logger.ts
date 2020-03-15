import colors from 'colors'

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
