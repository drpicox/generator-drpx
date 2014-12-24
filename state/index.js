'use strict';


var _ = require('lodash');
var DrpxBase = require('../tools/drpx-base.js');
var stateRegex = /^[a-z][\w\d]*State$/;


module.exports = DrpxBase.extend({

	constructor: function() {

		DrpxBase.apply(this, arguments);


		this.argument('state', { 
			desc: 'name of the state in capitalized camel case, ex: myState',
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
			desc: 'a comma separated list of injectios for the state',
			type: String,
		});

		this.option('methods', {
			desc: 'a comma separated list of methods for the state',
			type: String,
		});

		this.option('notify-actions', {
			desc: 'use it to notify actions performed through broadcast',
			type: Boolean,
		});

		this.option('notify-changed', {
			desc: 'use it to notify changes happen through broadcast in nextTick',
			type: Boolean,
		});

	},

	init: function () {

		if (!stateRegex.test(this.state)) {
			throw new Error('state format not valid, "'+stateRegex.toString()+'"');
		}

		this.configure({key: 'state'});
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

		// notify actions
		this.notifyActions = this.options['notify-actions'];

		// if methods, then inject should include $rootScope
		if (this.notifyActions && this.injects.indexOf('$rootScope') === -1) {
			this.injects.push('$rootScope');
		}

		// notify changed
		this.notifyChanged = this.options['notify-changed'];

		// if notifyChanged, then inject should include $rootScope
		if (this.notifyChanged && this.injects.indexOf('$rootScope') === -1) {
			this.injects.push('$rootScope');
		}

		// if notifyChanged, then inject should include $timeout
		if (this.notifyChanged && this.injects.indexOf('$timeout') === -1) {
			this.injects.push('$timeout');
		}
		
	},

	files: function () {

		var stateFile;

		stateFile = this.fileName({folder: 'states', name: this.state, ext: 'js'});

		this.template('_state.js', 'src/'+stateFile);
		this.injectScript({name: this.state, file: stateFile});
	},

});