'use strict';

var _ = require('lodash');

var DrpxBase = require('../tools/drpx-base.js');


module.exports = DrpxBase.extend({

	constructor: function() {

		DrpxBase.apply(this, arguments);


		this.argument('app', { 
			desc: 'name of the application in capitalized camel case, ex: MyApp',
			type: String,
			required: true,
		});

		this.option('package', {
			alias: 'p',
			desc: 'package name, ex: com.david-rodenas',
			type: String,
		});

		this.option('module', {
			alias: 'm',
			desc: 'main module name, ex: ma',
			type: String,
		});


	},

	init: function() {

		// compute package name
		if (_.isString(this.options.package)) {
			// if defined no problem
			this.package = this.options.package;
		} else if (this.app.indexOf('.') !== -1) {
			// if inside appname, extract it, and rename app
			this.package = this.app.split('.').slice(0,-1).join('.');
		} else {
			throw new Error('No package defined, ex appname: com.david-rodenas.MyApp');
		}

		// compute the app name
		this.app = this.app.split('.').splice(-1)[0];

		// compute mainModule name
		if (_.isString(this.options.module)) {
			this.mainModule = this.options.module;
		} else {
			this.mainModule = this.app.replace(/[^A-Z]/g,'').toLowerCase();
		}
		if (this.mainModule.length < 2) {
			throw new Error('Module name should have at least two characters, ex appname: com.david-rodenas.MyApp');
		}

		// compute module name
		this.module = this.mainModule;

		// compute a random offset port for livereload and grunt (try first from config)
		this.portOffset = this.config.get('portOffset');
		this.portOffset = this.portOffset || Math.floor((Math.random() * 1000));

		// save configured values for future
		this.config.set('app', this.app);
		this.config.set('package', this.package);
		this.config.set('mainModule', this.mainModule);
		this.config.set('module', this.module);
		this.config.set('portOffset', this.portOffset);


		// install dependences at the end (if not skipped)
		//this.on('end', function () {
		//  if (!this.options['skip-install']) {
		//	this.installDependencies();
		//  }
		//});
	},

});