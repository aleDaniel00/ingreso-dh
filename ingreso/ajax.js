

function removeEvent(elemento, evento, funcion) {
	if (elemento.removeEventListener)
		elemento.removeEventListener(evento, funcion, false);
	if (elemento.detachEvent)
		elemento.detachEvent('on' + evento, funcion);
}

function addEvent(elemento, evento, funcion) {
	if (elemento.addEventListener) {
		elemento.addEventListener(evento, funcion);
	} else if (elemento.attachEvent) {
		elemento.attachEvent('on' + evento, funcion);
	}
}
function insertAfter(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function $(id) {
	return document.getElementById(id);
}

//otras funciones 
function c(str) { return console.log(str); }
//
function crear(str) { return document.createElement(str); }
//_______________________________________


function ajaxRequest(options) {

	var defaults = {
		'metodo': 'get',
		'success': function () { },
		'error': function () { }
	};

	options = objectMerge(defaults, options);

	// Instanciamos XHR
	var xhr = new XMLHttpRequest(),
		urlData = '',
		sendData = null;

	// Paso el método a minúsculas
	options.metodo = options.metodo.toLowerCase();

	if (options.metodo == "get") {
		urlData = '?' + options.data;
	} else if (options.metodo == "post" || options.metodo == "put") {
		sendData = options.data;
	}

	// Configuramos la petición
	xhr.open(options.metodo, options.url + urlData);

	// Agregás una imagen de carga

	if (options.metodo == "post" || options.metodo == "put") {
		// Agrego el header para que PHP capture los datos del form automágicamente.
		xhr.setRequestHeader('Content-Type',
			'application/x-www-form-urlencoded');
	}

	// Configurar el callback
	xhr.addEventListener('readystatechange', function () {
		//console.log(xhr.readyState);
		if (xhr.readyState == 4) {
			// Quitás la imagen de carga
			if (xhr.status == 200) {
				options.success(xhr.responseText);
			} else {
				options.error();
			}
		}
	});

	// Enviamos la petición
	xhr.send(sendData);
}


function $(id) {
	return document.getElementById(id);
}

/**
 * Mezcla el segundo objeto en el primero.
 */
function objectMerge(obj1, obj2) {
	for (var i in obj2) {
		obj1[i] = obj2[i];
	}
	return obj1;
}
