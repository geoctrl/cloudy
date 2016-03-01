module.exports = function() {
	let template = `
		<div class="header">
			<div class="header__logo">
				<icon icon="cloudy"></icon>
			</div>
			<div class="header__app-name">
				Cloudy
			</div>
		</div>
	`;

	return {
		restrict: 'E',
		template: template
	};
};