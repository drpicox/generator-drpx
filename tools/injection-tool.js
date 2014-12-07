'use strict';

/**
*  injectionTool:
*
*      -inject({into:,hook:,name:,snippet:})
*      -injectModule()                 # injects current module dependence
*      -injectScript({[name:],file:})  # injects a script with name, ex: MyController, and file pa/controllers/MyController.js
*      -injectStyle({[style:],file:})  # injects a script with style, ex: MyStyle, and file pa/styles/MyStyle.js
*/

var fs = require('fs');


var injectionTool = {

	// see: http://remy.bach.me.uk/blog/2013/10/updating-existing-files-with-yeoman/
	inject: function(options) {
		var body, into, hasHook, hasSnippet, hook, lines, name, path, result, snippet, i, l;
		//console.log(JSON.stringify(options, undefined, 2));

		into      = options.into;        // target file where to inject
		hook      = options.hook;        // part to inject
		name      = options.name;        // name of the injected thing, for logs
		snippet   = options.snippet;     // snippet to inject

		path = this.destinationRoot() + '/';
		hook = 'GENERATOR_DRPX_INJECT('+hook+')';

		// read the file
		body = fs.readFileSync(path+into, 'utf8');

		// check for the existence of the file
		if (body) {
			hasSnippet = body.indexOf(snippet) !== -1;
			hasHook = body.indexOf(hook) !== -1;

			if (hasSnippet) {
				result = 'identical';
			} else if (hasHook) {
				// split lines
				lines = body.split('\n');
				// search for the injection line
				for (i = 0, l = lines.length; i < l && lines[i].indexOf(hook) === -1; i++) {}
				// add the script tag before the injection line
				lines.splice(i, 0, snippet);
				// save new lines
				body = lines.join('\n');
				fs.writeFileSync(path+into, body);
				result = 'create';
			} else {
				result = 'conflict';
			}
		} else {
			result = 'conflict';
		}

		switch (result) {
			case 'create':
				this.log.create('registered "%s" in '+into, name); break;
			case 'identical':
				this.log.identical('"%s" already registered in '+into, name); break;
			case 'conflict':
				this.log.conflict('"%s" not registered in '+into, name); break;
		}
		return result;
	},


	// injects a module dependence into the src/my/MyModule.html
	injectModule: function() {
		var mainModule;

		// might not inject itslef
		if (this.module === this.mainModule) {
			return 'identical';
		}

		return this.inject({
			into: 'src/'+ this.mainModule +'/'+ this.capital(this.mainModule) + 'Module.js',
			hook: 'app.modules',
			name: this.module,
			snippet: '\t\''+this.package+'.'+this.module+'\',',
		});
	},


	// injects a script into the src/index.html
	injectScript: function(options) {
		var file, into, hook, module, name, script, snippet;

		into = options.into || 'src/index.html';
		hook = options.hook || 'minimized/app.js';
		name = options.name || this.name;
		file = options.file;

		snippet = '\t<script src="'+ file +'"></script>';

		return this.inject({
			into: into,
			hook: hook,
			name: name,
			snippet: snippet,
		});
	},


	// injects a less style into the src/styles.less
	injectStyle: function(options) {
		var file, into, hook, module, name, script, snippet;

		into = options.into  || 'src/styles.less';
		hook = options.hook  || 'minimized/styles.css';
		name = options.style || this.style;
		file = options.file;

		snippet = '@import "' +file+ '";';

		return this.inject({
			into: into,
			hook: hook,
			name: name,
			snippet: snippet,
		});
	},

};

module.exports = injectionTool;