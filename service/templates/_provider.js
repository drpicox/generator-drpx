/*
	<%= service %>:
		<% injects.forEach(function(inject) { %>
		.<%= inject %>
		<% }); %>
		<% methods.forEach(function(method) { %>
		.<%= method %>()
		<% }); %>

	Config:
		<% configs.forEach(function(config) { %>
		<%= config %>: '<%= config %>'
		<% }); %>

*/
(function(angular) {
	'use strict';

	angular
		.module('${package}.${module}')
		.provider('<%= service %>', <%= service %>Provider);

	function <%= service %>Provider() {
		/* jshint validthis: true */
		
		var config = this.config = {
			<% configs.forEach(function(config) { %>
			<%= config %>: '<%= config %>',
			<% }); %>
		};

		this.$get = <%= service %>;

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
	}

})(angular);
