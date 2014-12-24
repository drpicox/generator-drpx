/*
	This is the <%= handler %>.

	It executes automatically when the app starts and behaves as follows:
		<% if (hasOnChanges) { %>
		When any of the following states changes: <%= onChanges.join(', ') %>
		it updates as follows:
		<% } %>
		TODO

*/
(function(angular) {
	'use strict';

	angular
		.module('${package}.${module}')
		.run(<%= handler %>);

	<%= handler %>.$inject = [<%= injects.map(function(i){return '\''+i+'\'';}).join(',') %>];
	function <%= handler %>  (<%= injects.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {

		<% injects.forEach(function(inject) { %>
		console.log(<%= inject %>);
		<% }); %>

		<% if (hasOnChanges) { %>
		<% onChanges.forEach(function(change) { %>
		$rootScope.$on('${mainModule}.<%= changeEnd(change,'State','') %>Changed', update);
		<% }); %>

		function update() {
			// TODO
			console.log({changed: arguments});
		}
		<% } %>
	}

})(angular);
