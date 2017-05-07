$include["../node_modules/jquery/dist/jquery.js"];
$include["../node_modules/bootstrap/dist/js/bootstrap.js"];
$include["../node_modules/fullpage.js/dist/jquery.fullpage.js"];
(function ($) {
	$(document).ready(function () {
		var container = $('#flowpp-container');
		container.fullpage({
			anchors: ['flow-index', 'flow-flowpp', 'flow-flowai', 'flow-about'],
			menu: '#flow-menu'
		});
	});
})(jQuery);