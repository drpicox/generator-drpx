/*
	<%= controller %>:
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
		.controller('<%= controller %>', <%= controller %>);

	<%= controller %>.$inject = [<%= injects.map(function(i){return '\''+i+'\'';}).join(',') %>];
	function <%= controller %>  (<%= injects.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		var self;

		self = this;

		<% injects.forEach(function(inject) { %>
		self.<%= inject %> = <%= inject %>;
		<% }); %>
		<% methods.forEach(function(method) { %>
		self.<%= method %> = <%= method %>;
		<% }); %>


		<% methods.forEach(function(method) { %>
		function <%= method %>() {
			// TODO
		}

		<% }); %>
	}

})();
