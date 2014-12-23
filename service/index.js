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

	},

	init: function () {

		if (!serviceRegex.test(this.service)) {
			throw new Error('service format not valid, "'+serviceRegex.toString()+'"');
		}

		this.configure({key: 'service'});
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
		
		// parse configs
		if (_.isString(this.options.configs)) {
			this.configs = this.options.configs.split(',');
		} else {
			this.configs = [];
		}
		
	},

	files: function () {

		var serviceFile;

		serviceFile = this.fileName({folder: 'services', name: this.service, ext: 'js'});

		if (this.configs.length === 0) {
			this.template('_service.js', 'src/'+serviceFile);
		} else {
			this.template('_provider.js', 'src/'+serviceFile);
		}
		this.injectScript({name: this.service, file: serviceFile});
	},

});