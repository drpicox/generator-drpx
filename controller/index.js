'use strict';


var _ = require('lodash');
var DrpxBase = require('../tools/drpx-base.js');
var controllerRegex = /^[A-Z][\w\d]*Controller$/;


module.exports = DrpxBase.extend({

	constructor: function() {

		DrpxBase.apply(this, arguments);


		this.argument('controller', { 
			desc: 'name of the controller in capitalized camel case, ex: MyController',
			type: String,
			required: true,
		});

		this.option('module', {
			alias: 'm',
			desc: 'module name',
			type: String,
		});

		this.option('injects', {
			alias: 'i',
			desc: 'a comma separated list of injectios for the controller',
			type: String,
		});

		this.option('methods', {
			desc: 'a comma separated list of methods for the controller',
			type: String,
		});

	},

	init: function () {

		if (!controllerRegex.test(this.controller)) {
			throw new Error('controller format not valid, "'+controllerRegex.toString()+'"');
		}

		this.configure({key: 'controller'});
		this.ensureModule();

		// parse injectioins
		if (_.isString(this.options.injects)) {
			this.injects = this.options.injects.split(',');
		} else {
			this.injects = [];
		}

		// parse methods
		if (_.isString(this.options.methods)) {
			this.methods = this.options.methods.split(',');
		} else {
			this.methods = [];
		}
		
	},

	files: function () {

		var controllerFile;

		controllerFile = this.fileName({folder: 'controllers', name: this.controller, ext: 'js'});

		this.template('_controller.js', 'src/'+controllerFile);
		this.injectScript({name: this.controller, file: controllerFile});
	},

});