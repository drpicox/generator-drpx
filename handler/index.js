'use strict';


var _ = require('lodash');
var DrpxBase = require('../tools/drpx-base.js');
var handlerRegex = /^[a-z][\w\d]*Handler$/;


module.exports = DrpxBase.extend({

	constructor: function() {

		DrpxBase.apply(this, arguments);


		this.argument('handler', { 
			desc: 'name of the handler in capitalized camel case, ex: myHandler',
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
			desc: 'a comma separated list of injectios for the handler',
			type: String,
		});

	},

	init: function () {

		if (!handlerRegex.test(this.handler)) {
			throw new Error('handler format not valid, "'+handlerRegex.toString()+'"');
		}

		this.configure({key: 'handler'});
		this.ensureModule();

		// parse injectioins
		if (_.isString(this.options.injects)) {
			this.injects = this.options.injects.split(',');
		} else {
			this.injects = [];
		}
		
	},

	files: function () {

		var handlerFile;

		handlerFile = this.fileName({folder: 'handlers', name: this.handler, ext: 'js'});

		this.template('_handler.js', 'src/'+handlerFile);
		this.injectScript({name: this.handler, file: handlerFile});
	},

});