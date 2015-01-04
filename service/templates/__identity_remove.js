function remove(id) {
	var idx, model;

	if (id && angular.isDefined(id.<%= identity %>)) {
		model = id;
		id = model.<%= identity %>;
	} else {
		model = map[id];
	}

	idx = list.indexOf(model);
	if (idx !== -1) {
		delete map[id];
		list.splice(idx, 1);
	}	
}
