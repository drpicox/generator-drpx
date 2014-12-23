/*
	This is the <%= handler %>.

	It executes automatically when the app starts and behaves as follows:
		TODO

*/
(function(angular) {
	'use strict';

	angular
		.module('${package}.${module}')
		.handler(<%= handler %>);

	<%= handler %>.$inject = [<%= injects.map(function(i){return '\''+i+'\'';}).join(',') %>];
	function <%= handler %>  (<%= injects.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {

		<% injects.forEach(function(inject) { %>
		console.log(<%= inject %> = <%= inject %>);
		<% }); %>
	}

})();
