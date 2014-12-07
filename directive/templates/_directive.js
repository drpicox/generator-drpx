/*
	<%= '<' + dash(view) %><% scopes.forEach(function(scope) { %>
			<%= attr(scope.field) %>="${scope.attribute}"
			<% }); %><%= '></' + dash(view) + '>' %>

	<% if (hasController) { %>
	Controller ${controller} as scope.${controllerAs}
	<% } %>

*/
(function(angular) {
	'use strict';

	angular
		.module('${package}.${module}')
		.directive('<%= camel(view) %>', <%= camel(view) %>);


	<%= camel(view) %>.$inject = [];
	function <%= camel(view) %>  () {

		var directive = {
			restrict: 'E',

			<% if (hasScope) { %>
			scope: {
				<% scopes.forEach(function(scope) { %>
				${scope.field}: '${scope.attribute}',
				<% }); %>
			},
			<% } %>

			templateUrl: '${templateUrl}',

			<% if (hasController) { %>
			controller: '${controller}',
			controllerAs: '${controllerAs}',
			<% } %>
		};


		return directive;
	}

})(angular);

