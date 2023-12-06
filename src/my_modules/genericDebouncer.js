export default function debouncer(delay, func) { //the order I received these args is reverse the order setTimeout collects
	//gon place the timeout in the closure of the function to be returned
	let theTimeout;
	
	return function(...args) {
		clearTimeout(theTimeout);
		theTimeout = setTimeout(() => func(...args), delay)
	}
}