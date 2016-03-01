module.exports = function() {
	let template = `
		<div class="header">
			header
		</div>
	`;

	return {
		restrict: 'E',
		template: template
	};
};