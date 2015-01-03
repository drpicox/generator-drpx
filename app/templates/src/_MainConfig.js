(function(angular) {
	'use strict';

	angular.module('${package}.${module}')
	// GENERATOR_DRPX_INJECT(app.configs)
	;

	
	// - Helper functions
	
	// compute host based in query params
	function getHost() {
		var host = getQueryParam('host');
		if (host) {
			if (host.lastIndexOf('http',0) === -1) {
				host = 'http://'+host;
			}
		} else {
			host = ''; // production/default host
		}
		return host;
	}

	// Read query params function
	function getQueryParam(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (decodeURIComponent(pair[0]) === variable) {
				return decodeURIComponent(pair[1]);
			}
		}
	}

	// Check if stub is requested
	function isStub() {
		var stub = getQueryParam('stub') === 'true';
		return stub;
	}

	/* exported urlify */

	// Create an url form an address
	function urlify(url, stub) {
		if (!isStub()) { return getHost() + url;  }
		else           { return             stub; }
	}

})(angular);
