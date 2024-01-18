let valeur = 0;
var resultat = 0;
var w_comp = document.getElementById("w_comp").value;
var h_comp = document.getElementById("h_comp").value;


//Clear text
function clearContents(element) {
	element.value = '';
}

//Verif Size
function verifierNumerique() {
	if (!isNaN(w_comp) && !isNaN(h_comp)) {
	} else {
		alert("Rentrez une taille de comp");
	}
}

//alertPaste
document.addEventListener("mousemove", PosAlertPaste);
var customAlert = document.getElementById('AlertPaste');
function PosAlertPaste(e) {
	customAlert.style.left = e.clientX + 5 + 'px';
	customAlert.style.top = e.clientY + 5 + 'px';
}

function ShowAlertPaste() {
	customAlert.style.opacity = '75%';
	setTimeout(function () {
		customAlert.style.opacity = '0%';
	}, 1000);
}


//ctrl+v automatique
document.addEventListener('DOMContentLoaded', function () {
	navigator.permissions.query({ name: 'clipboard-read' }).then(permissionStatus => {
		if (permissionStatus.state === 'granted') {
			console.log('Accès au presse-papiers autorisé.');
		} else {
			console.log('Demande d\'accès au presse-papiers.');
			navigator.clipboard.readText(); // Cette ligne peut déclencher la demande d'autorisation
		}
	});
});

document.getElementById('textArea').addEventListener('focus', function () {
	// Coller le contenu du presse-papiers dans la zone de texte
	navigator.clipboard.readText()
		.then((clipboardText) => {
			this.value += clipboardText;
		})
		.catch((err) => {
			console.error('Erreur lors de la lecture du presse-papiers : ', err);
		});
	ShowAlertPaste()
});
document.getElementById('textArea1').addEventListener('focus', function () {
	// Coller le contenu du presse-papiers dans la zone de texte
	navigator.clipboard.readText()
		.then((clipboardText) => {
			this.value += clipboardText;
		})
		.catch((err) => {
			console.error('Erreur lors de la lecture du presse-papiers : ', err);
		});
	ShowAlertPaste()
});
document.getElementById('textArea2').addEventListener('focus', function () {
	// Coller le contenu du presse-papiers dans la zone de texte
	navigator.clipboard.readText()
		.then((clipboardText) => {
			this.value += clipboardText;
		})
		.catch((err) => {
			console.error('Erreur lors de la lecture du presse-papiers : ', err);
		});
	ShowAlertPaste()
});

//InterpolationPos
function PosStep() {
	valeur = 2;
	w_comp = document.getElementById("w_comp").value;
	h_comp = document.getElementById("h_comp").value;
	verifierNumerique()
	resultat = ConvertionPos();
	copierResultatPos()
}

function PosLinear() {
	valeur = 1;
	w_comp = document.getElementById("w_comp").value;
	h_comp = document.getElementById("h_comp").value;
	verifierNumerique()
	resultat = ConvertionPos();
	copierResultatPos()
}

//InterpolationScale
function ScaleStep() {
	valeur = 2;
	resultat = ConvertionScale();
	copierResultatPos()
}

function ScaleLinear() {
	valeur = 1;
	resultat = ConvertionScale();
	copierResultatPos()
}

//InterpolationRotation
function RotaStep() {
	valeur = 2;
	resultat = ConvertionRotation();
	copierResultatPos()
}

function RotaLinear() {
	valeur = 1;
	resultat = ConvertionRotation();
	copierResultatPos()
}

//Copie dans press papier

function copierResultatPos() {
	// Créer un élément temporaire textarea pour stocker le résultat
	var textarea = document.createElement('textarea');
	textarea.value = resultat;
	document.body.appendChild(textarea);

	// Sélectionner le texte dans le textarea
	textarea.select();
	document.execCommand('copy');

	// Retirer l'élément textarea
	document.body.removeChild(textarea);

	// Afficher une alerte
	var modal = document.getElementById("alert");
	modal.style.display = "block";

	// Masquer la boîte modale après 3 secondes
	setTimeout(function () {
		modal.style.display = "none";
	}, 1500);
}

///////Convertions

//Convertion Pos

function ConvertionPos() {
	var content = document.getElementById('textArea');
	var tab = content.value.split('\n');
	var sortie = "";
	var FRAME = 0;
	var VALUE = 0;

	var header = '{"keyCopy": {"position.x": [';
	let header_y = '"position.y": [';
	var footer = ']},"resourceType": "cavalry.keydata.copy"}';
	var f = '},';

	sortie += header;

	for (var i = 10; tab[i].length > 6; i++) {
		var val = tab[i].split('\t');
		FRAME = val[1];
		VALUE = (parseFloat(val[2]) - (w_comp / 2)).toFixed(3);

		sortie += '{"data": {"interpolation" : ' + valeur + ',"numValue":' + VALUE + '},"frame": ' + FRAME + '';
		sortie += f;
	}

	sortie = sortie.substring(0, sortie.length - 1);
	sortie += '],'
	sortie += header_y;

	for (var i = 10; tab[i].length > 6; i++) {
		var val = tab[i].split('\t');
		FRAME = val[1];
		VALUE = ((h_comp / 2) - parseFloat(val[3])).toFixed(3);

		sortie += '{"data": {"interpolation" : ' + valeur + ',"numValue":' + VALUE + '},"frame": ' + FRAME + '';
		sortie += f;
	}

	sortie = sortie.substring(0, sortie.length - 1);
	sortie += footer;
	return sortie;

}

//Convertion Scale

function ConvertionScale() {
	var content = document.getElementById('textArea1');
	var tab = content.value.split('\n');
	var sortie = "";
	var FRAME = 0;
	var VALUE = 0;

	var header = '{"keyCopy": {"scale.x": [';
	let header_y = '"scale.y": [';
	var footer = ']},"resourceType": "cavalry.keydata.copy"}';
	var f = '},';

	sortie += header;

	for (var i = 10; tab[i].length > 6; i++) {
		var val = tab[i].split('\t');
		FRAME = val[1];
		VALUE = (parseFloat(val[2]) / 100).toFixed(3);

		sortie += '{"data": {"interpolation" : ' + valeur + ',"numValue":' + VALUE + '},"frame": ' + FRAME + '';
		sortie += f;
	}

	sortie = sortie.substring(0, sortie.length - 1);
	sortie += '],'
	sortie += header_y;

	for (var i = 10; tab[i].length > 6; i++) {
		var val = tab[i].split('\t');
		FRAME = val[1];
		VALUE = (parseFloat(val[3]) / 100).toFixed(3);

		sortie += '{"data": {"interpolation" : ' + valeur + ',"numValue":' + VALUE + '},"frame": ' + FRAME + '';
		sortie += f;
	}

	sortie = sortie.substring(0, sortie.length - 1);
	sortie += footer;
	return sortie;

}

//Convertion Rotation

function ConvertionRotation() {
	var content = document.getElementById('textArea2');
	var tab = content.value.split('\n');
	var sortie = "";
	var FRAME = 0;
	var VALUE = 0;

	var header = '{"keyCopy": {"rotation": [';
	var footer = ']},"resourceType": "cavalry.keydata.copy"}';
	var f = '},';

	sortie += header;

	for (var i = 10; tab[i].length > 3; i++) {
		var val = tab[i].split('\t');
		FRAME = val[1];
		VALUE = (parseFloat(val[2]) * -1).toFixed(3);
		sortie += '{"data": {"interpolation" : ' + valeur + ',"numValue":' + VALUE + '},"frame": ' + FRAME + '';
		sortie += f;

	}
	sortie = sortie.substring(0, sortie.length - 1);
	sortie += footer;

	return sortie;

}



