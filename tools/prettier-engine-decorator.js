'use strict';
/**
* A decorator of an engine to prettify the output.
*
* - removes lines with only spaces
* - removes empty lines when there are at least two empty lines before
*/



var lineWithBlanksRegex = /\n([ \t\r]+\n)+/g;
var doubleEmptyLineRegex = /\n\n+/g;


module.exports = function prettierEngineDecorator(generator) {
	var delegate = generator.engine;
	generator.engine = function(body, data, options) {
		body = delegate.call(generator, body, data, options);
		body = body.replace(lineWithBlanksRegex, '\n');
		body = body.replace(doubleEmptyLineRegex, '\n\n');
		return body;
	};
}