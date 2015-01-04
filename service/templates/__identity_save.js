function save(newModel) {
	var model;

	model = map[newModel.<%= identity %>];
	if (model && newModel !== model) {
		if (angular.isFunction(model.update)) {
			model.update(newModel);
		} else {
			throw new Error('instances does not match');
		}
	} else {
		map[model.<%= identity %>] = model;
		list.push(model);
	}
}
