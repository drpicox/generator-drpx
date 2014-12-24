/*
	<%= state %>:
		<% injects.forEach(function(inject) { if (inject[0] !== '$') { %>
		.<%= inject %>
		<% } }); %>
		<% methods.forEach(function(method) { %>
		.<%= method %>()
		<% }); %>

	<% if (notifyActions || notifyChanged) { %>
	Broadcasts:
	<% } %>
		<% if (notifyActions) { methods.forEach(function(method) { %>
		'${mainModule}.<%= changeEnd(state,'State','') %>.${method}'
		<% }); } %>
		<% if (notifyChanged) { %>
		'${mainModule}.<%= changeEnd(state,'State','') %>Changed'
		<% } %>
*/
(function(angular) {
	'use strict';

	angular
		.module('${package}.${module}')
		.factory('<%= state %>', <%= state %>);

	<%= state %>.$inject = [<%= injects.map(function(i){return '\''+i+'\'';}).join(',') %>];
	function <%= state %>  (<%= injects.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		var state<% if (notifyChanged) { %>, notifying<% } %>;

		state = {
			<% injects.forEach(function(inject) { if (inject[0] !== '$') { %>
			<%= inject %>: <%= inject %>,
			<% } }); %>
			<% methods.forEach(function(method) { %>
			<%= method %>: <%= method %>,
			<% }); %>
		};


		<% methods.forEach(function(method) { %>
		function <%= method %>() {
			// TODO
			<% if (notifyActions) { %>
			$rootScope.$broadcast.bind($rootScope, '${mainModule}.<%= changeEnd(state,'State','') %>.${method}').apply(null, arguments);
			<% } %>
			<% if (notifyChanged) { %>
			notifyChanged();
			<% } %>
		}

		<% }); %>

		<% if (notifyChanged) { %>
		function notifyChanged() {
			if (notifying) { return; }

			notifying = $timeout(function() {
				notifying = null;
				$rootScope.$broadcast('${mainModule}.<%= changeEnd(state,'State','') %>Changed');
			});
		}
		<% } %>


		return state;
	}

})(angular);
