'use strict';
/**
* A decorator of an engine to make copies without templating.
*/


module.exports = function plainCopyDecorator(generator) {
	var delegate = generator.copy;
	generator.copy = function(source, destination, process) {
		var result, backup;

		backup = generator.engine;
		generator.engine = plainEngine;
		result = delegate.call(generator, source, destination, process);
		generator.engine = backup;

		return result;
	};

	function plainEngine(body) {
		return body;
	}
}