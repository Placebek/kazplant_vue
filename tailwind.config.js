module.exports = {
	content: ['./src/**/*.{vue,js,jsx}'],
	theme: {
		extend: {
			boxShadow: {
				'custom-top': '0px -3px 19px 0px rgba(0, 0, 0, 0.2);',
				'button-menu': '0px 0px 17px 28px rgba(208, 235, 231, 0.2);',
			},
			backgroundImage: {
				'custom-gradient':
					'linear-gradient(0deg, rgb(251, 251, 251), rgb(231, 255, 238))',
			},
		},
	},
}
