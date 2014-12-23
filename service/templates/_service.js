/*
	<%= service %>:
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
		.service('<%= service %>', <%= service %>);

	<%= service %>.$inject = [<%= injects.map(function(i){return '\''+i+'\'';}).join(',') %>];
	function <%= service %>  (<%= injects.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		var service = {
			<% injects.forEach(function(inject) { %>
			<%= inject %>: <%= inject %>,
			<% }); %>
			<% methods.forEach(function(method) { %>
			<%= method %>: <%= method %>,
			<% }); %>
		};


		<% methods.forEach(function(method) { %>
		function <%= method %>() {
			// TODO
		}

		<% }); %>


		return service;
	}

})();
