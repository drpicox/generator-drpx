'use strict';


var _ = require('lodash');
var DrpxBase = require('../tools/drpx-base.js');
var scopeRegex = /^(\w[\w\d]*)([=@&])(\w[\w\d]*)?$/;
var moduleRegex = /^[a-z]+\.[\w\d\.]+[\w\d]$/;


module.exports = DrpxBase.extend({

	constructor: function() {

		DrpxBase.apply(this, arguments);


		this.argument('module', { type: String, required: true });

	},

	init: function () {

		var module, name, parts;

		if (!moduleRegex.test(this.module)) {
			throw new Error('module format not valid, "'+moduleRegex.toString()+'"');
		}

		module = this.module;
		parts = module.split('.');
		name = parts[0] + parts.slice(1).map(this.capital).join('') + 'Module';

		this.configure({name: name});
	},

	files: function () {

		var moduleFile;

		moduleFile = this.fileName({folder: '.', name: this.name, ext: 'js'});

		this.template('_module.js', 'src/'+moduleFile);
		this.injectScript({name: this.name, file: moduleFile});
		this.injectModule();
	},

});