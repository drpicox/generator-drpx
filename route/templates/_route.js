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
				<% lists.forEach(function(list) { %>
				<%= list %>: <%= list %>ListResolver,
				<% }); %>
				<% gets.forEach(function(get) { %>
				<%= get %>: <%= get %>GetResolver,
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

		<% lists.forEach(function(list) { %>
		<%= list %>ListResolver.$inject = ['<%= list %>Service','$route'];
		function <%= list %>ListResolver  ( <%= list %>Service , $route ) {
			var list;

			// gets the list
			list = <%= list %>Service.query($route.current.params);

			// return it
			return list;
		}

		<% }) %>

		<% gets.forEach(function(get) { %>
		<%= get %>GetResolver.$inject = ['<%= get %>Service','$route'];
		function <%= get %>GetResolver  ( <%= get %>Service , $route ) {
			var value;

			// gets the value
			value = <%= get %>Service.get($route.current.params);

			// return it
			return value;
		}

		<% }) %>

	}

})(angular);
