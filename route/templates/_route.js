/**
* Route <%= path %>
*/
(function(angular) {
	'use strict';

	// ROUTE <%= path %>
	angular
		.module('${package}.${module}')
		.config(<%= route %>);

	<%= route %>.$inject = ['$routeProvider'];
	function <%= route %>  ( $routeProvider ) {

		$routeProvider.when('<%= path %>', {
			
			// view template
			templateUrl: '${templateUrl}',

			// view required data
			resolve: {
				<% parts.forEach(function(part) { %>
				<%= part.index %>: <%= part.service %>ItemResolver,
				<% }); %>
			},

			// view controller
			<% if (hasController) { %>
			controller: '<%= controller %>',
			controllerAs: '<%= controllerAs %>',
			<% } %>
		});

		<% parts.forEach(function(part) { %>
		<%= part.service %>ItemResolver.$inject = ['<%= part.service %>','$route'];
		function <%= part.service %>ItemResolver  ( <%= part.service %> , $route ) {
			var index, <%= part.index %>;

			// get url restlike string param :<%= part.index %>
			index = $route.current.params.<%= part.index %>;

			// gets the current 
			<%= part.index %> = <%= part.service %>.get(index);

			// return it
			return <%= part.index %>;
		}
		<% }) %>

	}

})(angular);
