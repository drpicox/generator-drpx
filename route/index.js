'use strict';


var _ = require('lodash');
var DrpxBase = require('../tools/drpx-base.js');

var pathRegex = /^\/[\w\d-_:\/]*$/;
var partRegex = /:[\w][\w\d_]*/g;


module.exports = DrpxBase.extend({

	constructor: function() {

		DrpxBase.apply(this, arguments);


		this.argument('path', { 
			desc: 'path of the route including parameters, ex: /users/:user',
			type: String,
			required: true,
		});

		this.option('module', {
			alias: 'm',
			desc: 'module name',
			type: String,
		});

		this.option('route', {
			alias: 'r',
			desc: 'route name',
			type: String,
		});

		this.option('controller', {
			alias: 'c',
			desc: 'optional controller name to use in the view',
			type: String,
		});

		this.option('view', {
			alias: 'v',
			desc: 'view name',
			type: String,
		});

		this.option('style', {
			desc: 'optional stylename, default directive name replacing Directive by Style',
			type: String,
		});

	},

	init: function () {
		var parts;

		// validate path enforce path
		if (!pathRegex.test(this.path)) {
			throw new Error('Route path does not looks as a valid path, ex: /users/:user');
		}

		// get path parts
		parts = this.path.split('/').slice(1);
		if (parts.length === 1 && parts[0] === '') {
			parts[0] = 'root';
		}

		// define a default module if not defined
		if (!_.isString(this.options.module)) {
			this.options.module = this.config.get('mainModule') + '.pages.' + this.short(parts[0]);
		}

		if (_.isString(this.options.route)) {
			this.route = this.options.route;
		} else {
			this.route = parts[0] + parts.slice(1).map(function(p) { return p.replace(/:/g, ''); }).map(this.capital).join('') + 'Route';
		}

		this.configure({key: 'route'});
		this.ensureModule();

		if (_.isString(this.options.view)) {
			this.view = this.options.view;
		} else {
			this.view = this.changeEnd(this.route, 'Route', 'View');
		}

		if (_.isString(this.options.style)) {
			this.style = this.options.style;
		} else {
			this.style = this.changeEnd(this.view, 'View', 'Style');
		}

		if (_.isString(this.options.controller)) {
			this.controller = this.options.controller;
		} else if (this.options.controller) {
			this.buildController = true;
			this.controller = this.capital(this.changeEnd(this.route, 'Route', 'Controller'));
		}

		if (this.controller) {
			this.hasController = true;
			if (this.controller.indexOf('=') !== -1) {
				this.controllerAs = this.controller.split('=')[1];
				this.controller = this.controller.split('=')[0];
			} else {
				this.controllerAs = this.camel(this.changeEnd(this.controller, 'Controller', 'Ctrl'));
			}
		} else {
			this.hasController = false;
		}

		// look for variables to induce
		this.parts = parts.filter(function(p) { return p[0] === ':'; }).map(function(index) {
			return {
				index: index.slice(1),
				service: index.slice(1) + 'sService',
			};
		});
		
	},

	files: function () {

		var routeFile, viewFile, styleFile;

		routeFile = this.fileName({folder: 'routes', name: this.route, ext: 'js'});
		viewFile = this.fileName({folder: 'routes', name: this.view, ext: 'html'});
		styleFile = this.fileName({folder: 'routes', name: this.style, ext: 'less'});

		this.templateUrl = viewFile;
		this.template('_route.js', 'src/'+routeFile);
		this.injectScript({name: this.route, file: routeFile});

		this.template('_view.html', 'src/'+viewFile);

		this.template('_style.less', 'src/'+styleFile);
		this.injectStyle({file: styleFile});

		if (this.buildController) {
			this.invoke('drpx:controller', {
				args: [ this.controller ], 
				options: { 
					injects: this.parts.map(function(part){return part.index;}).join(','),
				},
			});			
		}
	},

});