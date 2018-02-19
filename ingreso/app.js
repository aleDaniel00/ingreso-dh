addEvent(window,'DOMContentLoaded',paginaCargada);
function paginaCargada(){
	traerData();
	var calcular = $('calcular');
	var importe = $('importe');
	var interes = $('interes');
	var cuota = $('cuota');
	var total = $('total');
	var borrar = $('borrar');
	var select = $('provincia');
	if(calcular){
		addEvent(calcular,'click',function(){
			if((importe.value && importe.value > 0) && (interes.value && interes.value > 0)){
				var totalImporte = calcularInteres(importe.value,interes.value);
				total.textContent = totalImporte;
				total.value = totalImporte;
				var coutaMensual = calcularCoutasMensuales(totalImporte);
				cuota.textContent = coutaMensual;
				cuota.value = coutaMensual;
			}
		});	
	}

	if(borrar){
		addEvent(borrar,'click',function () {
			importe.value = '';
			importe.textContent = '';
			interes.value = '';
			interes.textContent = '';
			cuota.value = '';
			cuota.textContent = '';
			total.value = '';
			total.textContent = '';
			select.selectedIndex = 'Capital Federal'
		});	
	}

	function traerData(){
		ajaxRequest({
			url: 'https://raw.githubusercontent.com/dariosus/jsonProvincias/master/provincias.json',
			success: function(rta) {
				var rta = JSON.parse(rta);
				rta.forEach(element => {
					var option = crear('option');
					option.value = element.state;
					option.textContent = element.state;
					select.appendChild(option);
				});
			}
		});
	}	
	
	function calcularInteres(importe, interes){
		return parseInt(importe) + (parseInt(importe) * parseInt(interes)/100);
	}

	function calcularCoutasMensuales(totalImporte){
		return parseInt(totalImporte) / 12;
	}
}

