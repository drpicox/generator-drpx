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
		
		// parse configs
		if (_.isString(this.options.configs)) {
			this.configs = this.options.configs.split(',');
		} else {
			this.configs = [];
		}

		// identity (if applies)
		if (_.isString(this.options.identity)) {
			this.identity = this.options.identity;
		} else if (this.options.identity) {
			this.identity = 'id';
		} else {
			this.identity = false;
		}

		//if (this.identity && this.injects.indexOf('$cacheFactory') === -1) {
		//	this.injects.push('$cacheFactory');
		//}

		// model
		if (_.isString(this.options.model)) {
			this.model = this.options.model;
		} else if (this.options.model) {
			this.model = thid.changeEnd(this.service, 'sService', '');
		} else {
			this.model = false;
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