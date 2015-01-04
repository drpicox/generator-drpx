'use strict';


var _ = require('lodash');
var DrpxBase = require('../tools/drpx-base.js');
var serviceRegex = /^[a-z][\w\d]*Service$/;


module.exports = DrpxBase.extend({

	constructor: function() {

		DrpxBase.apply(this, arguments);


		this.argument('service', { 
			desc: 'name of the service in capitalized camel case, ex: myService',
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
			desc: 'a comma separated list of injectios for the service',
			type: String,
		});

		this.option('methods', {
			desc: 'a comma separated list of methods for the service',
			type: String,
		});

		this.option('configs', {
			desc: 'a comma separated list of configurable properties for the service provider',
			type: String,
		});

		this.option('identity', {
			desc: 'creates an identity map and a cache',
			type: String,
		});

		this.option('model', { 
			desc: 'a model used for this service, ex: My',
			type: String,
		});

	},

	init: function () {

		this.configure({key: 'service'});
		this.ensureModule();

		if (!serviceRegex.test(this.service)) {
			throw new Error('service format not valid, "'+serviceRegex.toString()+'"');
		}

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

		this.bodies = {};
		this.methods.forEach(function(method) {
			this.bodies[method] = '// TODO';
		}, this);
		
		// parse configs
		if (_.isString(this.options.configs)) {
			this.configs = this.options.configs.split(',');
		} else {
			this.configs = [];
		}

		// model
		if (_.isString(this.options.model)) {
			this.model = this.options.model;
		} else if (this.options.model || this.options.identity) {
			this.model = thid.changeEnd(this.service, 'sService', '');
		} else {
			this.model = false;
		}

		if (this.identity && this.injects.indexOf(this.model) === -1) {
			this.injects.push(this.model);
		}

		// identity (if applies)
		if (_.isString(this.options.identity)) {
			this.identity = this.options.identity;
		} else if (this.options.identity) {
			this.identity = 'id';
		} else {
			this.identity = false;
		}

		if (this.identity) {
			generateIdentityBodies.call(this);
		}

		if (!this.identity && this.model) {
			throw new Error('Do not specify model if no identity map is in use');
		}

	},

	files: function () {

		var serviceFile;

		serviceFile = this.fileName({folder: 'services', name: this.service, ext: 'js'});

		if (this.configs.length === 0) {
			this.template('_service.js', 'src/'+serviceFile);
		} else {
			this.template('_provider.js', 'src/'+serviceFile);
			this.injectConfig({name: this.service, configs: this.configs});
		}
		this.injectScript({name: this.service, file: serviceFile});
	},

});

function generateBodies() {

	this.methods.forEach(function(method) {
		this.method = method;
		this.bodies[method] = this.partial('__method_todo.js');
	});

}

function generateIdentityBodies() {

	if (this.injects.indexOf('$q') === -1) {
		this.injects.push('$q');
	}

	['query','get','save','remove'].forEach(function(method) {
		if (!_.contains(this.methods, method)) {
			this.methods.push(method);
		}

		this.method = method;
		this.bodies[method] = this.partial('__identity_'+method+'.js');
	}, this);

}