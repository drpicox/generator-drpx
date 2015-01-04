/*
	<%= service %>:
		<% injects.forEach(function(inject) { %>
		-<%= inject %>
		<% }); %>
		<% methods.forEach(function(method) { %>
		-<%= method %>()
		<% }); %>

*/
(function(angular) {
	'use strict';

	angular
		.module('${package}.${module}')
		.factory('<%= service %>', <%= service %>);

	<%= service %>.$inject = [<%= injects.map(function(i){return '\''+i+'\'';}).join(',') %>];
	function <%= service %>  (<%= injects.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		var <% if (identity) { %>list, map, <% } %>service;

		service = {
			<% injects.forEach(function(inject) { %>
			<%= inject %>: <%= inject %>,
			<% }); %>
			<% methods.forEach(function(method) { %>
			<%= method %>: <%= method %>,
			<% }); %>
		};


		<% if (identity) { %>
		list = [];
		map = {};
		<% } %>


		<% methods.forEach(function(method) { %>
		function <%= method %>() {
			<%= indent(bodies[method], 3) %>
		}

		<% }); %>


		return service;
	}

})(angular);
