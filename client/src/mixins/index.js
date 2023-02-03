
export const filterJSN = function (list) {
	
	let new_list = []
	let keys = Object.keys(list [0]);
	let filtered_keys = keys.filter(key => key != 'usr' && key != 'shared');
		//key === 'text' || key === 'createdate' || key === 'updatedate'
	//console.log("filtered_keys ", filtered_keys);
	
	for (const element of list) {
		
		let new_jsn = {}
		let _keys = Object.keys(element);
		
		for (const key of _keys) {
			
			if (filtered_keys.indexOf(key) != -1) {
				
				if (key === 'createdate' || key === 'updatedate') {
					
					//let unixTime = Date.parse(element[key]);
					let dateObj = new Date(element[key])
					let dateFormat = dateObj.toLocaleString() 
					new_jsn [key] = dateFormat;
				
				} else {
					new_jsn [key] = element [key];
				}
			}
		}
		
		new_list.push (new_jsn);
	}
	
	return new_list;
}


