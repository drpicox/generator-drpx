'use strict';


var _ = require('lodash');
var DrpxBase = require('../tools/drpx-base.js');
var modelRegex = /^[A-Z][\w\d]+Model$/;


module.exports = DrpxBase.extend({

	constructor: function() {

		DrpxBase.apply(this, arguments);


		this.argument('model', { 
			desc: 'name of the model in capitalized camel case, ex: MyModel',
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
			desc: 'a comma separated list of injectios for the model',
			type: String,
		});

		this.option('methods', {
			desc: 'a comma separated list of methods for the model',
			type: String,
		});

		this.option('inherits', {
			desc: 'a comma separated list of models to be satisfied/inherited by the model',
			type: String,
		});

	},

	init: function () {

		if (!modelRegex.test(this.model)) {
			throw new Error('model format not valid, "'+modelRegex.toString()+'"');
		}

		this.configure({key: 'model'});
		this.ensureModule();

		this.model = this.changeEnd(this.model, 'Model', '');

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

		// parse inherits
		if (_.isString(this.options.inherits)) {
			this.inherits = this.options.injects.split(',');
		} else {
			this.inherits = [];
		}
		// and ask to inject them
		this.injects.push.apply(this.injects, this.inherits);
		// boolean if injects available
		this.hasInjects = this.injects.length > 0;

		
	},

	files: function () {

		var modelFile;

		modelFile = this.fileName({folder: 'models', name: this.model + 'Model', ext: 'js'});

		this.template('_model.js', 'src/'+modelFile);
		this.injectScript({name: this.model, file: modelFile});
	},

});