var sepFinLigne = '§';

var g_IsTirage;

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction();};

//BasculeMode();BasculeMode();
document.getElementById("defaultOngletOuvert").click();

function EffacerChargement(){
   document.getElementById('MSGChargement').style.display='none';
   document.getElementById('site').style.display='block';
}

function BasculeAfficheSideBar() {
	var isAffiche = (document.getElementById("mySidenav").style.width == "350px");
	AfficheRechercheCMD(!isAffiche);
}

function AfficheRechercheCMD(isAffiche) {
	//isRECOmmandes = isAffiche;
	
	if (isAffiche){
		
		document.getElementById("mySidenav").style.width = "350px";
		//document.getElementById("mySidenav").style.z-index = 2;  
		document.getElementById("main").style.marginRight = "350px";
		document.getElementById("Entete").style.marginRight = "350px";	
		document.getElementById("btnRemonter").style.right = "380px";	
		document.getElementById("closeSidenav").textContent = "-";
		document.getElementById("closeSidenav").style.right = "351px";
		document.getElementsByClassName("SelectionToutePlanche")[0].style.display='block';;
		
		
	}
	else{
		document.getElementById("mySidenav").style.width = "0px";
		//document.getElementById("mySidenav").style.height = "0px";
		  //document.getElementById("mySidenav").style.z-index = -2;  
		document.getElementById("main").style.marginRight = "0px";
		document.getElementById("Entete").style.marginRight = "0px";
		document.getElementById("btnRemonter").style.right = "80px";	
		document.getElementById("closeSidenav").textContent = "+"; //= >>	
		document.getElementById("closeSidenav").style.right = "1px";
		document.getElementsByClassName("SelectionToutePlanche")[0].style.display='none';
					
	}
	//BasculeMode();
}
	
/***********************************************************************************/
/********************************/
window.onload = function (){ 
//alert('Onload :!!');
	//InitCommandes();
	EffacerChargement();
};

function AfficheGroupe() {
	listPhoto = document.getElementsByClassName('PlancheGroupe');
	
	//alert('AfficheGroupe : ' + listPhoto[0].getAttribute('id'));
	
    for (i = 0; i < listPhoto.length; i++) {	
		//listPhoto[i].style.display = "inline";
		listPhoto[i].style.display = (listPhoto[i].getAttribute('id').indexOf('FRATRIES')>-1)?"none":"inline";
    }	
	listPhoto = document.getElementsByClassName('PlancheIndiv');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "none";
    }	
	listPhoto = document.getElementsByClassName('IndivSELECTION');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "none";
    }		
	listPhoto = document.getElementsByClassName('ligne_classe');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "none";
    }		
	document.getElementById("idAfficheGroupe").style.display = "none";
	document.getElementById("idAfficheIndivs").style.display = "inline";
	document.getElementById("idAfficheTout").style.display = "inline";
}

function AfficheIndivs() {
	listPhoto = document.getElementsByClassName('PlancheGroupe');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "none";
    }	
	listPhoto = document.getElementsByClassName('PlancheIndiv');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "inline-block";
    }	
	listPhoto = document.getElementsByClassName('GroupeSELECTION');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "none";
    }		
	listPhoto = document.getElementsByClassName('ligne_classe');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "flex";
    }		
	document.getElementById("idAfficheGroupe").style.display = "inline";
	document.getElementById("idAfficheIndivs").style.display = "none";
	document.getElementById("idAfficheTout").style.display = "inline";	
}

function AfficheTout() {
	listPhoto = document.getElementsByClassName('PlancheIndiv');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "inline-block";
    }	
	listPhoto = document.getElementsByClassName('IndivSELECTION');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "inline-block";
    }	
	
	listPhoto = document.getElementsByClassName('PlancheGroupe');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "inline";
    }	
	listPhoto = document.getElementsByClassName('GroupeSELECTION');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "inline";
    }		
	listPhoto = document.getElementsByClassName('ligne_classe');
    for (i = 0; i < listPhoto.length; i++) {	
		listPhoto[i].style.display = "flex";
    }		
	
	document.getElementById("idAfficheGroupe").style.display = "inline";
	document.getElementById("idAfficheIndivs").style.display = "inline";
	document.getElementById("idAfficheTout").style.display = "none";	
}

function scrollFunction() {
	//alert('scrollFunction');
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("btnRemonter").style.display = "block";
	} else {
		document.getElementById("btnRemonter").style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

function openNav() {
	AfficheRechercheCMD(true);	
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {  
	AfficheRechercheCMD(false);
}

function CopierCommandes(x) {
	//alert('ZZ 06 document.getElementById("lesPhotoSelection").value  : ' + document.getElementById("lesPhotoSelection").value);
	x.querySelector("#ZlesPhotoSelection").value = document.getElementById("lesPhotoSelection").value;
	x.querySelector("#ZlesCmdesLibres").value = document.getElementById("lesCmdesLibres").value;
	x.querySelector("#ZlesFichiersBoutique").value = document.getElementById("lesFichiersBoutique").value;
}

function SelectionnerCliquePhoto(x) {
	if(g_IsTirage){
		var nbPhotos = parseInt(x.getAttribute('Nb'));
		if (nbPhotos < 1){
			CopierCommandes(x);
			if (!(x.getAttribute('id').indexOf('FRATRIES')>-1)) {
				SelectionSurPhoto(x);
			}
			openNav();
		}		
	}else{
		//
		//CopierCommandes(x);
		AjoutFichierBoutique(x);
		openNav();
	}
}

function SelectionSurPhoto(x) {
	var nbPhotos = parseInt(x.getAttribute('Nb'));
	if (nbPhotos == 0){
		x.setAttribute('Nb',  ' 1 ');
	}else{
		x.setAttribute('Nb',  ' 0 ');
	}		
	RemplacementClassSelection(x);
	MAJEnregistrementSelectionPhotos();
}

function RemplacementClassSelection(x) {
	if(x.classList.contains("PlancheIndiv")){x.classList.replace("PlancheIndiv", "IndivSELECTION");}
	else if(x.classList.contains("IndivSELECTION")){x.classList.replace("IndivSELECTION", "PlancheIndiv");}
	else if(x.classList.contains("PlancheGroupe")){x.classList.replace("PlancheGroupe", "GroupeSELECTION");
	}else if(x.classList.contains("GroupeSELECTION")){x.classList.replace("GroupeSELECTION", "PlancheGroupe");}  	
}

function SelectionnerCommandeTiragesAffiche() {
	var ToutSelectionner = (document.getElementById("CaseSelectionnerTiragesAffiche").className == 'caseCheckVide');
	if (ToutSelectionner){
		// INDIV  
		var mesPlanches = document.getElementsByClassName("PlancheIndiv");
		while(mesPlanches.length >0){
			if ( mesPlanches[0].offsetHeight > 0 ) {
				SelectionSurPhoto(mesPlanches[0]);
			}
			else{
				mesPlanches[0].classList.replace("PlancheIndiv", "plancheNONVisibleIndiv");
			}			
		}	
		var mesPlanches = document.getElementsByClassName("plancheNONVisibleIndiv");
		while(mesPlanches.length > 0){
			mesPlanches[0].classList.replace("plancheNONVisibleIndiv", "PlancheIndiv");
		}
		// GROUPE
		var mesPlanches = document.getElementsByClassName("PlancheGroupe");
		while(mesPlanches.length > 0){
			if ( mesPlanches[0].offsetHeight > 0 ) {
				if (!(mesPlanches[0].getAttribute('id').indexOf('FRATRIES')>-1)) {
					SelectionSurPhoto(mesPlanches[0]);
				}else{
					mesPlanches[0].classList.replace("PlancheGroupe", "plancheNONVisibleGroupe");
				}
			}	
			else{
				mesPlanches[0].classList.replace("PlancheGroupe", "plancheNONVisibleGroupe");
			}			
		}
		var mesPlanches = document.getElementsByClassName("plancheNONVisibleGroupe");
		while(mesPlanches.length > 0){
			mesPlanches[0].classList.replace("plancheNONVisibleGroupe", "PlancheGroupe");
		}		
		openNav();
	}else{
		// INDIV
		var mesPlanches = document.getElementsByClassName("IndivSELECTION");
		while(mesPlanches.length >0){
			//mesPlanches[0].classList.replace("IndivSELECTION", "PlancheIndiv");	
			SelectionSurPhoto(mesPlanches[0]);
		}
		// GROUPE
		var mesPlanches = document.getElementsByClassName("GroupeSELECTION");
		while(mesPlanches.length >0){
			//mesPlanches[0].classList.replace("GroupeSELECTION", "PlancheGroupe");	
			SelectionSurPhoto(mesPlanches[0]);
		}		
	}
	document.getElementById("CaseSelectionnerTiragesAffiche").className = (ToutSelectionner?'caseCheckCoche':'caseCheckVide');
	//mesRecommandes();
}	

function SelectionnerCommandesBoutiquesAffiche() {
	var ToutSelectionner = (document.getElementById("CaseSelectionnerBoutiqueAffiche").className == 'caseCheckVide');
	if (ToutSelectionner){
		// INDIV  
		var mesPlanches = document.getElementsByClassName("PlancheIndiv");
		while(mesPlanches.length >0){
			if ( mesPlanches[0].offsetHeight > 0 ) {
				SelectionSurPhoto(mesPlanches[0]);
			}
			else{
				mesPlanches[0].classList.replace("PlancheIndiv", "plancheNONVisibleIndiv");
			}			
		}	
		var mesPlanches = document.getElementsByClassName("plancheNONVisibleIndiv");
		while(mesPlanches.length > 0){
			mesPlanches[0].classList.replace("plancheNONVisibleIndiv", "PlancheIndiv");
		}
		// GROUPE
		var mesPlanches = document.getElementsByClassName("PlancheGroupe");
		while(mesPlanches.length > 0){
			if ( mesPlanches[0].offsetHeight > 0 ) {
				if (!(mesPlanches[0].getAttribute('id').indexOf('FRATRIES')>-1)) {
					SelectionSurPhoto(mesPlanches[0]);
				}else{
					mesPlanches[0].classList.replace("PlancheGroupe", "plancheNONVisibleGroupe");
				}
			}	
			else{
				mesPlanches[0].classList.replace("PlancheGroupe", "plancheNONVisibleGroupe");
			}			
		}
		var mesPlanches = document.getElementsByClassName("plancheNONVisibleGroupe");
		while(mesPlanches.length > 0){
			mesPlanches[0].classList.replace("plancheNONVisibleGroupe", "PlancheGroupe");
		}		
		openNav();
	}else{
		// INDIV
		var mesPlanches = document.getElementsByClassName("IndivSELECTION");
		while(mesPlanches.length >0){
			//mesPlanches[0].classList.replace("IndivSELECTION", "PlancheIndiv");	
			SelectionSurPhoto(mesPlanches[0]);
		}
		// GROUPE
		var mesPlanches = document.getElementsByClassName("GroupeSELECTION");
		while(mesPlanches.length >0){
			//mesPlanches[0].classList.replace("GroupeSELECTION", "PlancheGroupe");	
			SelectionSurPhoto(mesPlanches[0]);
		}		
	}
	document.getElementById("CaseSelectionnerBoutiqueAffiche").className = (ToutSelectionner?'caseCheckCoche':'caseCheckVide');
	//mesRecommandes();
}	

/*
function BasculeMode() {
	//alert('isTirage ' + isTirage);
	if (document.getElementById("ZoneCommandesFichierBoutiques").style.display == "inline-block") {
		document.getElementById("ZoneCommandesTirages").style.display = "inline-block";
		document.getElementById("ZoneCommandesFichierBoutiques").style.display = "none";
		
		g_IsTirage = true;
		//document.getElementById("maBascule").innerHTML = "aller à la Création fichiers boutique";	
		document.getElementById("CMDTirages").className = "myclass";	
	  } else {
		document.getElementById("ZoneCommandesTirages").style.display = "none";
		document.getElementById("ZoneCommandesFichierBoutiques").style.display = "inline-block";		
		
		g_IsTirage = false;
		//document.getElementById("maBascule").innerHTML = "aller aux commandes de tirages";
		document.getElementById("CMDFichiers").className = "myclass";		
	  }
}		
*/

function BasculeOnglet(evt, cityName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";

	g_IsTirage = (document.getElementById("ZoneCommandesFichierBoutiques").style.display == "none"); 
}

function VoirPhotoSelection(x) {
	var mesPlanches = document.getElementsByClassName("planche");
	for (i = 0; i < mesPlanches.length; i++) {
	  if (mesPlanches[i].style.display === "none") {
		mesPlanches[i].style.display = "inline-block";
	  } else {
		mesPlanches[i].style.display = "none";
	  }
	}	
}	

function MAJEnregistrementSelectionPhotos() {
	//alert('qsd');
	var mesRecoInfo ='';
	var mesPlanches = document.getElementsByClassName("GroupeSELECTION");
	//console.log(' Nombre Page : ' + BoutonPage.length );	
	for (i = 0; i < mesPlanches.length; i++) {
		mesRecoInfo = mesRecoInfo  + mesPlanches[i].getAttribute('id') + '____'
								+ mesPlanches[i].getAttribute('Nb').trim() + sepFinLigne;
	}	
	var mesPlanches = document.getElementsByClassName("IndivSELECTION");
	//console.log(' Nombre Page : ' + BoutonPage.length );	
	for (i = 0; i < mesPlanches.length; i++) {
	  mesRecoInfo = mesRecoInfo  + mesPlanches[i].getAttribute('id') + '____'
	 							 + mesPlanches[i].getAttribute('Nb').trim() + sepFinLigne;
	}	

	//alert('mesRecoInfo : ' + mesRecoInfo + '    ' + sepFinLigne);
	var mesPlanches = mesRecoInfo.split(sepFinLigne);
	mesPlanches.sort();
	mesRecoInfo ='';
	for (i = 0; i < mesPlanches.length; i++) {
		mesRecoInfo = mesRecoInfo  + mesPlanches[i] + sepFinLigne;
	  }	
	  //alert('mesRecoInfo : ' + mesRecoInfo);

	/*	  */
	document.getElementById('lesPhotoSelection').value =  mesRecoInfo;

	var maListePhotos = document.getElementById("myListePhoto");
	maListePhotos.innerHTML =  AfficherResumePhotoSelection(mesRecoInfo);

	document.getElementById("btnAjouterTirages").disabled = ((maListePhotos.innerHTML === "")
								||(document.getElementById("btnAjouterTirages").textContent === ""));
	MAJAffichageSelectionPhotos();
}	

function MAJAffichageSelectionPhotos(chargement = false) {
	var TableauSelectionPhotos = document.getElementById('lesPhotoSelection').value.split(sepFinLigne);
	//alert('ZZ 05 TableauSelectionPhotos ' + TableauSelectionPhotos);
	for (i = 0; i < TableauSelectionPhotos.length  ; i++) {
		//alert('TableauSelectionPhotos : "'  + TableauSelectionPhotos[i] + '"');	
		if(TableauSelectionPhotos[i].trim()!=''){
			var CMDSelectionPhoto = TableauSelectionPhotos[i].split('____');
			var maPhoto = document.getElementById(CMDSelectionPhoto[0]);
			if (chargement) {
				RemplacementClassSelection(maPhoto);
				maPhoto.setAttribute('Nb', CMDSelectionPhoto[1].trim());
			}
			maPhoto.getElementsByClassName("NombrePhoto")[0].textContent = CMDSelectionPhoto[1];
		}
	}
	var TableauFichierBoutique = document.getElementById('lesFichiersBoutique').value.split(sepFinLigne);
	//alert('TableauFichierBoutique ' + TableauFichierBoutique);
	for (i = 0; i < TableauFichierBoutique.length  ; i++) {
		if(TableauFichierBoutique[i].trim()!=''){
			var maPhoto = document.getElementById(TableauFichierBoutique[i]);
			//alert('ImageFichierWeb : "'  + maPhoto.getElementsByClassName("ImageFichierWeb")[0].textContent + '"');	
			maPhoto.getElementsByClassName("ImageFichierWeb")[0].style.display = "inline-block";			
		}
	}	
}

function AjoutFichierBoutique(element) {
	//alert('xcvxcvxcv.id : ' + element.getAttribute('id')); 
	var leFichier = element.getAttribute('id');
	var cmdfichierBoutique = document.getElementById("lesFichiersBoutique").value;	
	if(cmdfichierBoutique.indexOf(leFichier)>-1){//On l'enleve		
		document.getElementById("lesFichiersBoutique").value = cmdfichierBoutique.replaceAll(leFichier + sepFinLigne, '');
		element.getElementsByClassName("ImageFichierWeb")[0].style.display = "none";
	}else{//On l'ajoute
		document.getElementById("lesFichiersBoutique").value = cmdfichierBoutique + leFichier + sepFinLigne;
		element.getElementsByClassName("ImageFichierWeb")[0].style.display = "inline-block";	
	}
	var maListeFichiersBoutique = document.getElementById("myListeFichiersBoutique");
	maListeFichiersBoutique.innerHTML = AfficherResumeFichierBoutiqueSelection( document.getElementById("lesFichiersBoutique").value); 
	
	document.getElementById("btnFichiersBoutique").disabled = (maListeFichiersBoutique.innerHTML === "");
}

function AfficherResumePhotoSelection(str) {
	var strAffichage = '';
	var CMDSelectionPhoto = str.split(sepFinLigne);

	for (i = 0; i < CMDSelectionPhoto.length  ; i++) {
		if ( CMDSelectionPhoto[i] !=''){
			var CMDInfoPhoto = CMDSelectionPhoto[i].split('____');
			strAffichage += CMDInfoPhoto[1] + 'ex ' + CMDInfoPhoto[0] + '<br>';
		}
	}
	return strAffichage;	
}
function AfficherResumeFichierBoutiqueSelection(str) {
	str = str.trim();
	return str.replaceAll(sepFinLigne, '<br>');
}
/* 
function AfficherCMDparLigne(str) {
	str = str.trim();
	return str.replaceAll(sepFinLigne, '<br>');
}

function MAJCommandes() {
	document.getElementById("myListeCommandes").innerHTML = 'jghkjhhj'; //AfficherCMDUnderscore(document.getElementById("lesCmdesLibres").value); 
	document.getElementById("myListeFichiersBoutique").innerHTML = 'jghkjhhj'; //AfficherCMDUnderscore(document.getElementById("lesFichiersBoutique").value); 
}
*/
function NbPlancheMOINS(element) {
	//alert('NbPlancheMOINS');
	var nombre = parseInt( element.parentElement.getAttribute('Nb'));
	nombre = nombre -1;
	
	//if (nombre < 1) {SelectionSurPhoto(element.parentElement.parentElement);}

	if ((nombre < 1)&&(!element.classList.contains("ZoneMoinsPlusZoom"))) {RemplacementClassSelection(element.parentElement);}


	element.parentElement.setAttribute('Nb',  ' ' + nombre +  ' ');
	MAJEnregistrementSelectionPhotos();
	//alert('Moins : ' + element.parentElement.parentElement.getAttribute('id') +  '  x' + element.parentElement.parentElement.getAttribute('Nb')); 

}
function NbPlanchePLUS(element) {
	//alert('NbPlanchePLUS');
	var nombre = parseInt( element.parentElement.getAttribute('Nb'));
	nombre = nombre + 1;
	element.parentElement.setAttribute('Nb', ' ' + nombre +  ' ');	
	MAJEnregistrementSelectionPhotos();
	//alert('PLUS : ' + element.parentElement.parentElement.getAttribute('id') +  '  x' + element.parentElement.parentElement.getAttribute('Nb')); 
}

function CreationCommandeProduitDepuisPhoto() {
	
	var TableauSelectionPhotos = document.getElementById('lesPhotoSelection').value.split(sepFinLigne);
	if (TableauSelectionPhotos.length > 1 ) {
		//alert('TableauSelectionPhotos ' + TableauSelectionPhotos);
		for (i = 0; i < TableauSelectionPhotos.length  ; i++) {
			
			if(TableauSelectionPhotos[i].trim()!=''){
				var CMDSelectionPhoto = TableauSelectionPhotos[i].split('____');
				var maPhoto = document.getElementById(CMDSelectionPhoto[0]);
				RemplacementClassSelection(maPhoto);
				maPhoto.setAttribute('Nb', '0');
			}
		}
		var maListePhotos = document.getElementById('lesPhotoSelection').value;
		
		document.getElementById('lesPhotoSelection').value =  '';

		document.getElementById("myListeCommandes").innerHTML += VisuRecupPhotosProduits(maListePhotos,  document.getElementById('btnAjouterTirages').textContent);				
		
		document.getElementById('lesCmdesLibres').value += EnregistreCMDPhotosProduits(maListePhotos,  document.getElementById('btnAjouterTirages'));	
													
		document.getElementById("btnCmdesLibres").disabled = (document.getElementById("myListeCommandes").innerHTML === "");	
	}
}

function EnregistreCMDPhotosProduits(ListedePhoto, elementSelection) {
	var maCMDPhotosProduits = '<' + elementSelection.textContent + '>' + sepFinLigne;
	var CMDSelectionPhoto = ListedePhoto.split(sepFinLigne);
	
	for (i = 0; i < CMDSelectionPhoto.length  ; i++) {
		if ( CMDSelectionPhoto[i] !=''){
			var CMDInfoPhoto = CMDSelectionPhoto[i].split('____');
			
			for (n = 0; n < parseInt(CMDInfoPhoto[1])  ; n++) {
								
				maCMDPhotosProduits += CodePhotoProduit(CMDInfoPhoto[0], elementSelection.getAttribute('Code')) + '_1'+ sepFinLigne;
			}
		}
	}
	return maCMDPhotosProduits.trim();

}

function CodePhotoProduit(laPhoto, Produits) {
	CMDInfoPhoto = Produits.split('_');
	var CMDInfoPhoto = Produits.split('_');

		//alert("nom  Produit " +  Produits);

	var depart = Produits.indexOf('Portrait-');
	if(depart > -1){
		//alert("potr " + Produits.substr(depart,10));
		laPhoto = ModifNomFichierQuattro(laPhoto, Produits.substr(depart,10));	
	}

	Produits =   (CMDInfoPhoto[0] || "") + '_' + (CMDInfoPhoto[1] || "") + '_' + (CMDInfoPhoto[2] || "");

	return laPhoto + '_' + Produits;
}

function ModifNomFichierQuattro(nomPhoto, leQuoin) {
	leQuoin = leQuoin.replace('Portrait-', '-QCoin');
	var extension = nomPhoto.split(".").pop();
	nomPhoto = nomPhoto.substring(0,nomPhoto.indexOf(extension)-1) + leQuoin + '.' + extension;
	return nomPhoto;
}



function VisuRecupPhotosProduits(ListedePhoto, LeProduitSelection) {
	var strAffichage = '';
	var CMDSelectionPhoto = ListedePhoto.split(sepFinLigne);

	for (i = 0; i < CMDSelectionPhoto.length  ; i++) {
		if ( CMDSelectionPhoto[i] !=''){
			var CMDInfoPhoto = CMDSelectionPhoto[i].split('____');
			strAffichage += CMDInfoPhoto[1] + 'ex ' +  CMDInfoPhoto[0] + ' : ' + LeProduitSelection + '<br>';

			// Ajouter ici si LeProduitSelection contient portrait A alors renommer fichier photo avec -QCoinA
		}
	} 
	return strAffichage;
}


function SelectionProduitInitialisation() {
/* */
	//document.getElementById("SelectProduit").innerText = "";
	document.getElementById("btnAjouterTirages").textContent = "";
	document.getElementById("btnAjouterTirages").disabled = true;
	document.getElementById("ZoneSaisie").value = "";
	filterProduits();
	SelectionProduit();
}

function SelectionProduit() {
	document.getElementById("myDropdown").classList.toggle("show");
}  
function filterProduits() {
	var input, filter, ul, li, a, i;
	input = document.getElementById("ZoneSaisie");
	filter = input.value.toUpperCase();
	div = document.getElementById("myDropdown");
	a = div.getElementsByTagName("a");
	for (i = 0; i < a.length; i++) {
		txtValue = a[i].textContent || a[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		a[i].style.display = "";
		} else {
		a[i].style.display = "none";
		}
	}
}

function CliqueDropDown(element) {
	document.getElementById("ZoneSaisie").value = element.innerText;
	//document.getElementById("SelectProduit").innerText = element.innerText;

	document.getElementById("btnAjouterTirages").textContent = element.innerText;
	document.getElementById("btnAjouterTirages").setAttribute('Code', element.getAttribute('Code'));
	
	document.getElementById("btnAjouterTirages").disabled = ((document.getElementById("myListePhoto").innerHTML === "")
								||(document.getElementById("btnAjouterTirages").textContent === ""));
	SelectionProduit();
}

function ZoomPhoto(element,y)
{
	/**/
	SelectionnerCliquePhoto(y);

	var idElement = element.substring(1+element.lastIndexOf('/'));
	var x = document.getElementById(idElement).getElementsByClassName("ZoneMoinsPlus")[0];	
	if(x.classList.contains("ZoneMoinsPlus")){x.classList.replace("ZoneMoinsPlus", "ZoneMoinsPlusZoom");}

	
	var str = '<img class="imageZoom" src="' + element + '" >';
	//alert(str);
	var maZone = document.getElementsByClassName("ZoneZoomPhoto")[0];
	maZone.innerHTML = str;
	maZone.style.display= "inline-block";
	maZone.id = 'Zoom'+idElement;
}
function FermerZoom()
{
	var maZone = document.getElementsByClassName("ZoneZoomPhoto")[0];
	maZone.style.display= "none";

	// Changer le Plus Moins:
	var x = document.getElementById(maZone.id.substring(4)).getElementsByClassName("ZoneMoinsPlusZoom")[0];	
	if(x.classList.contains("ZoneMoinsPlusZoom")){x.classList.replace("ZoneMoinsPlusZoom", "ZoneMoinsPlus");}
}

function VoirPannier() {
	var ele = document.getElementById('monDetailPannier');
	if(ele.style.display == "none") {
		ele.style.display = "block";		
	}
	else {
		ele.style.display = "none";

	}
}

