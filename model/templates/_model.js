/*
	<%= model %>:
		<% injects.forEach(function(inject) { %>
		.<%= inject %>
		<% }); %>
		<% methods.forEach(function(method) { %>
		.<%= method %>()
		<% }); %>

*/
(function(angular) {
	'use strict';

	angular
		.module('${package}.${module}')
		.factory('<%= model %>', <%= camel(model) %>Factory);

	<%= model %>Factory.$inject = [<%= injects.map(function(i){return '\''+i+'\'';}).join(',') %>];
	function <%= camel(model) %>Factory  (<%= injects.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		/* jshint validthis: true */

		function <%= model %>(data) {
			<% if (!hasInherits) { %>
				angular.extend(this, data);
			<% } %>
			<% inherits.forEach(function(inherit) { %>
			<%= inherit %>.call(this, data);
			<% }); %>
		}

		<% inherits.forEach(function(inherit) { %>
		angular.extend(<%= model %>.prototype, <%= inherit %>.prototype);
		<% }); %>			
		<% methods.forEach(function(method) { %>
		<%= model %>.prototype.<%= method %> = <%= method %>;
		<% }); %>


		<% methods.forEach(function(method) { %>
		function <%= method %>() {
			// TODO
		}

		<% }); %>

		return <%= model %>;
	}

})(angular);
