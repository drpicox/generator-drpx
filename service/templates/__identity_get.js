function get(id) {
	var model;

	model = map[id];
	if (!model) {
		model = new <%= model %>({<%= identity %>: id});
		map[id] = model;
		list.push(model);
	}

	return model;		
}
