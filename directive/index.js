'use strict';


var _ = require('lodash');
var DrpxBase = require('../tools/drpx-base.js');
var scopeRegex = /^(\w[\w\d]*)([=@&])(\w[\w\d]*)?$/;
var directiveRegex = /^[a-z][\w\d]*Directive$/;


module.exports = DrpxBase.extend({

	constructor: function() {

		DrpxBase.apply(this, arguments);


		this.argument('directive', { 
			desc: 'name of the directive in camel case, ex: myDirective',
			type: String,
			required: true,
		});

		this.option('module', {
			alias: 'm',
			desc: 'module name',
			type: String,
		});

		this.option('scope', {
			alias: 's',
			desc: 'comma separated list of scopes, with @,=,& and attr optionally (note use \\& in your shell)',
			type: String,
		});

		this.option('controller', {
			alias: 'c',
			desc: 'the controller for this directive, if any, and optionally MyController=myCtrl',
			type: String,
		});

		this.option('view', {
			alias: 'v',
			desc: 'optional viewname, default directive name replacing Directive by View',
			type: String,
		});

		this.option('style', {
			desc: 'optional stylename, default directive name replacing Directive by Style',
			type: String,
		});

	},

	init: function () {

		if (!directiveRegex.test(this.directive)) {
			throw new Error('directive format not valid, "'+directiveRegex.toString()+'"');
		}

		this.configure({key: 'directive'});
		this.ensureModule();

		// parse options for scope
		this.hasScope = !!this.options.scope;
		if (_.isString(this.options.scope)) {
			this.scopes = this.options.scope.split(',').map(function(scope) {
				var match = scope.match(scopeRegex);
				if (!match) {
					throw new Error('Invalid scope "'+scope+'"');
				}
				return {
					field: match[1],
					attribute: match[2] + (match[3] || ''),
				};
			});
		} else {
			this.scopes = [];
		}

		// get view name
		if (_.isString(this.options.view)) {
			this.view = this.options.view;
		} else {
			this.view = this.changeEnd(this.directive, 'Directive', 'View');
		}

		// get style name
		if (_.isString(this.options.style)) {
			this.style = this.options.style;
		} else {
			this.style = this.changeEnd(this.directive, 'Directive', 'Style');
		}

		// get controller name
		if (_.isString(this.options.controller)) {
			this.controller = this.options.controller;
		} else if (this.options.controller) {
			this.controller = this.changeEnd(this.directive, 'Directive', 'Controller');
		}

		// compute controller as
		this.hasController = !!this.controller;
		if (this.controller) {
			if (this.controller.indexOf('=') !== -1) {
				this.controllerAs = this.controller.split('=')[1];
				this.controller = this.controller.split('=')[0];
			} else {
				this.controllerAs = this.camel(this.changeEnd(this.controller, 'Controller', 'Ctrl'));
			}
		}
	},

	files: function () {

		var directiveFile, viewFile, styleFile;

		directiveFile = this.fileName({folder: 'directives', name: this.directive, ext: 'js'});
		viewFile =      this.fileName({folder: 'directives', name: this.view,      ext: 'html'});
		styleFile =     this.fileName({folder: 'directives', name: this.style,     ext: 'less'});

		this.templateUrl = viewFile;
		this.template('_directive.js', 'src/'+directiveFile);
		this.injectScript({name: this.directive, file: directiveFile});

		this.template('_view.html', 'src/'+viewFile);

		this.template('_style.less', 'src/'+styleFile);
		this.injectStyle({file: styleFile});
	},

});