'use strict';

/*
	nameTool:
		-attr(name)                        # convert to data-attr-name or on-attr-name
		-camel(name)                       # converts to camelName
		-capital(name)                     # converts to CapitalName
		-changeEnd(name,expected,replace)  # (Aa1,a1,b2) = Ab2, (Aa,a1,b1) = Aa
		-dash(name)                        # converts to dash-name
		-under(name)                       # converts to under_name
		-short(name)                       # converts to shortname
*/

var _str = require('underscore.string');
var _ = require('lodash');

var nameTool = {

	attr: function(name) {
		name = nameTool.dash(name);
		if (name.slice(0,3) === 'on-') {
			return name;
		} else {
			return 'data-'+name;
		}
	},

	// text utility SomeName -> someName
	camel: function(name) {
		return (name[0] || '').toLowerCase() + name.slice(1);
	},

	capital: function(name) {
		return _str.capitalize(name);
	},

	// change the end if matches
	changeEnd: function(name, expected, replace) {
		if (_.endsWith(name, expected)) {
			name = name.slice(0, -expected.length) + replace;
		}
		return name;
	},

	// dash
	dash: function(name) {
		return _str.dasherize(nameTool.camel(name));
	},

	// shortname
	short: function(name) {
		return nameTool.dash(name).replace(/\-/g,'');
	},

	// undername
	under: function(name) {
		return nameTool.dash(name).replace(/\-/g,'_');
	},

};

module.exports = nameTool;