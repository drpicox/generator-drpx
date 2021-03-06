'use strict';

/**
* Base class generator inherits from yeoman.Base generator class.
*
* Some extra things included and examples of values:
*
*    app: 'GreatDrpx',
*    mainModule: 'gd'
*    module: 'gd.pages.root' 
*    package: 'com.david-rodenas'
*    portOffset: 834
*    name: /defaultComponentName 'MyView'
*    controller: 'MyController'
*    directive: 'MyDirective'
*    style: 'MyStyle'
*    view: 'MyView'
*
* Can use:
*
*    .configure({[key:]})  # which is the component key, ex: 'directive' | 'view' | ...
*    
*/

var generators = require('yeoman-generator');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var prettierEngineDecorator = require('./prettier-engine-decorator.js');
var plainCopyDecorator = require('./plain-copy-decorator.js');
var namingTool = require('./name-tool.js');
var injectionTool = require('./injection-tool.js');

var DrpxBase = generators.Base.extend({

	constructor: function () {
		generators.Base.apply(this, arguments);

		prettierEngineDecorator(this);
		plainCopyDecorator(this);
		_.extend(this, namingTool);
		_.extend(this, injectionTool);
	},

	configure: function(options) {
		var name, key, module, packg, rootPackage;

		if (options.key) {
			this.name = this[options.key] || this.options[options.key];
		}

		this.app =        options.app        || this.app        || this.config.get('app');
		this.package =    options.package    || this.package    || this.config.get('package');
		this.mainModule = options.mainModule || this.mainModule || this.config.get('mainModule');
		this.name =       options.name       || this.name;
		this.portOffset = options.portOffset || this.portOffset || this.config.get('portOffset');

		if (_.isString(this.options.module)) {
			this.module = this.options.module;
		} else if (_.isString(this.module)) {
			// this.module = this.module;
		} else if (this.name.indexOf('.') !== -1) {
			this.module = this.name.split('.').slice(0,-1).join('.');
			this.name = this.name.split('.').slice(-1)[0];
		} else {
			this.module = this.mainModule;
		}

		if (options.key) {
			this[options.key] = this.name;
		}
	},

	ensureModule: function() {
		if (!this.existsModule()) {
			throw new Error('Module "'+this.module+'" not found, exec: yo drpx:module '+this.module);
		}
	},

	existsModule: function() {
		var body, mainJs, path, snippet;

		if (this.module === this.mainModule) {
			return true;
		}

		path = this.destinationRoot() + '/';
		mainJs = 'src/'+ this.mainModule +'/'+ this.mainModule + 'Module.js'

		body = fs.readFileSync(path+mainJs, 'utf8');
		snippet = '\'' + this.package + '.' + this.module + '\'';

		return body.indexOf(snippet) !== -1;
	},

	fileName: function(options) {
		var module, folder, name, ext, result;

		module = options.module || this.module;
		folder = options.folder;
		name =   options.name   || this.name;
		ext =    options.ext;

		result = module +'/'+ folder +'/'+ name +'.'+ ext;
		return result;
	},

	partial: function(source, destination, data, options) {
		if (!destination || !this.isPathAbsolute(destination)) {
			destination = path.join(
				this.destinationRoot(),
				this.engine(destination || source, data || this, options)
			);
		}

		if (!this.isPathAbsolute(source)) {
			source = path.join(
				this.sourceRoot(),
				this.engine(source, data || this, options)
			);
		}

		var body = this.engine(this.fs.read(source), data || this, options);
		
		return body;	
	},


});


module.exports = DrpxBase;