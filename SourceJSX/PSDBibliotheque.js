﻿/*var g_Rep_PHOTOLAB = Folder($.fileName).parent.parent + "/";



//var picked = AfficheListeSOURCE();
//alert ('picked : ' + g_FichierSource);

AfficheListeSOURCE();*/

var g_LesSources = [];

function LireFichierSource() {	
	var file = new File(g_FichierSource);
	if (file.exists){	
		file.open("r"); // open file with write access
			file.readln(); // On Passe les entetes du csv
			while(!file.eof){
				var uneSource = new objSourceCSV(file.readln()); 
				g_LesSources.push(uneSource);
				//g_LesSourcesListe.push(uneSource.Affiche());
			}
		file.close();
		/**/
	}
	else{
		alert ('Pas de SOURCE : ' + g_FichierSource);
	}
	return g_FichierSource.length;
}

function TRIERSource() {
	g_LesSources.sort(function compareNomProjet(a, b) {
	  if (a.NomProjet < b.NomProjet)
		 return -1;
	  if (a.NomProjet > b.NomProjet )
		 return 1;
	  return 0;
	});
	/*g_LesSources.sort(function compareAnnee(a, b) {
	  if (a.Annee < b.Annee)
		 return -1;
	  if (a.Annee > b.Annee )
		 return 1;
	  return 0;
	});		*/
	g_LesSources.reverse();		
}

function MAJFichierSource() {	
	//var test ='';
	file = new File(g_FichierSource);
	file.open("w");	
        file.writeln('Code;NomProjet;Annee;Rep Scripts PS;Repertoire'); // On Ecrit les entetes du csv	
		for (var n = 0; n < g_LesSources.length; n++) {
			//test = test + g_LesSources[n].LigneCSV();
			file.writeln(g_LesSources[n].LigneCSV());
		}	
		//alert (test);
	file.close();			
}

function RecupSourceDepuisCode(leCode) {
    var laSource = null;
	for (var n = 0; n < g_LesSources.length; n++) {
		if (g_LesSources[n].CodeEcole == leCode){	
            laSource = g_LesSources[n];  
			break;            
		}
	}	
	return laSource;	
}

function TrouverRepSOURCEdansBibliotheque(leCode) {
	var repSource = '';
	LireFichierSource();
	var laSource = RecupSourceDepuisCode(leCode)
	if (laSource){
		repSource = laSource.Repertoire;
	}
	return repSource;
	g_LesSources = [];
}

function TrouverRepScriptPSdansBibliotheque(leCode) {
	var repSource = '';
	LireFichierSource();
	var laSource = RecupSourceDepuisCode(leCode)
	if (laSource){
		repSource = laSource.RepScriptPS;
	}
	return repSource;
	g_LesSources = [];
}

function objSourceCSV(uneLigne) {
	this.TableauInfo = uneLigne?uneLigne.split(';'):[];
    
    this.CodeEcole = this.TableauInfo[0] || "";
	this.NomProjet = this.TableauInfo[1] || "";
	this.Annee = this.TableauInfo[2] || "";
	this.RepScriptPS = this.TableauInfo[3] || "PHOTOLAB-Studio²";	
	this.Repertoire = this.TableauInfo[4] || "";
	
	this.LigneCSV = function(){return this.CodeEcole + ';'	+ this.NomProjet + ';' + this.Annee  + ';' + this.RepScriptPS + ';' + this.Repertoire;};
	this.isValide = function(){
		return (this.CodeEcole != '')&&(this.NomProjet != '')&&(this.Annee != '')&&(Folder(this.Repertoire).exists);
		//alert("Folder(this.Repertoire).exists  : " + Folder(this.Repertoire).exists);	
	};

}

function AfficheListeSOURCE() {
	var valRetour = 0; // Rien
	if (LireFichierSource()){ // il y a au moins une source
		//var dlgListeSOURCE = new Window ('palette {text: "Bibliotheque des sources photos PhotoLab", alignChildren: "fill"}');
    var dlgListeSOURCE = new Window ('dialog',"Bibliotheque des sources photos PhotoLab");
        dlgListeSOURCE.alignChildren = ["left","top"]; 
                //dlgListeSOURCE.frameLocation = [ -4, -4 ];
        dlgListeSOURCE.graphics.backgroundColor = dlgListeSOURCE.graphics.newBrush (dlgListeSOURCE.graphics.BrushType.SOLID_COLOR, [0.3, 0.3, 0.3]);
        dlgListeSOURCE.graphics.foregroundColor = dlgListeSOURCE.graphics.newPen(dlgListeSOURCE.graphics.PenType.SOLID_COLOR, [1, 1, 1], 1);
        
		// GROUP1
		var group1 = dlgListeSOURCE.add("group", undefined, {name: "group1"}); 
			group1.orientation = "row"; 
			group1.alignChildren = ["left","center"]; 
			group1.spacing = 10; 
			group1.margins = 0; 
			
            var btnNewProjet = group1.add ('button', undefined, 'Ajouter un Projet', {name: 'btnNewProjet'});
			
            var statictext1 = group1.add("statictext", undefined, undefined, {name: "statictext1"}); 
                    statictext1.text = "Recherche par Nom de projet :"; 

            var rechTxtProjet = group1.add('edittext {properties: {name: "editNomProjet"}}'); 		
                rechTxtProjet.preferredSize.width = 300; 	
                
		// GROUP2
	var group2 = dlgListeSOURCE.add ("group");
		var listSOURCE = group2.add ('listbox', [0, 0, 800, 250]," ",{numberOfColumns: 5, showHeaders: true, columnTitles: ["Code", "Année", "Nom du projet", "Dossier Script PS", "Répertoire source"]});
		
		Init = function () {//INIT	
			TRIERSource();
			listSOURCE.removeAll ();
			for (var i = 0; i < g_LesSources.length; i++) {
				with (listSOURCE.add ('item', g_LesSources[i].CodeEcole)){
					subItems[0].text = g_LesSources[i].Annee;            
					subItems[1].text = g_LesSources[i].NomProjet;
					subItems[2].text = g_LesSources[i].RepScriptPS; 
					subItems[3].text = decodeURI(g_LesSources[i].Repertoire);
				}
			}    
		}
		
		btnNewProjet.onClick = function () {
			var uneNouvelleSource = new objSourceCSV(); 
			valRetour = AfficheEditionSOURCE(uneNouvelleSource);	
			if(valRetour > 0 ){
				//alert('uneNouvelleSource : ' + uneNouvelleSource.NomProjet);
				g_LesSources.push(uneNouvelleSource);
				MAJFichierSource();
				Init();
				if(valRetour == 3 ){
					//alert('valRetour : ' + valRetour);
					dlgListeSOURCE.close();
					//return valRetour;
				}		
			}
			listSOURCE.selection = null;
			//Pour compil Web :
			//dlgListeSOURCE.close () ;
		}			
		
		rechTxtProjet.onChanging = function () {
			var temp = this.text.toLowerCase();
			listSOURCE.removeAll ();
			for (var i = 0; i < g_LesSources.length; i++) {
				if (g_LesSources[i].NomProjet.toLowerCase().indexOf(temp) > -1) {
					with (listSOURCE.add ('item', g_LesSources[i].CodeEcole)){
					subItems[0].text = g_LesSources[i].Annee;            
					subItems[1].text = g_LesSources[i].NomProjet;
					subItems[2].text = g_LesSources[i].RepScriptPS; 
					subItems[3].text = decodeURI(g_LesSources[i].Repertoire);
					}
				}
			}
			if (listSOURCE.items.length > 0){
				listSOURCE.selection = null;
			}
		}
		//listSOURCE.numberOfColumns= 6;
		//rechTxtProjet.onChanging();
		listSOURCE.onChange = function(){
			if(listSOURCE.selection != null){
				valRetour = AfficheEditionSOURCE(RecupSourceDepuisCode(listSOURCE.selection.text));	
				if(valRetour > 0 ){				
					MAJFichierSource();
					Init(); 
					
					if(valRetour == 3 ){
						//alert('valRetour : ' + valRetour);
						dlgListeSOURCE.close();
						//return valRetour;
					}						
					
				}
				listSOURCE.selection = null;	
			}	
		}	
		Init();
		listSOURCE.selection = null;
		

		// We need the button to catch the Return/Enter key (CC and later)
		//dlgListeSOURCE.add ('button', undefined, 'Ok', {name: 'ok'});
        //dlgListeSOURCE.show () ;
		
		if (dlgListeSOURCE.show () != 2){			//return listSOURCE.selection.text;
			return valRetour;
		}
		//dlgListeSOURCE.close();
        g_LesSources = [];
	}
}

//function EditionSOURCE(leCode , lAnnee , leNomProjet , leRepertoire ) {
function AfficheEditionSOURCE(uneSource) {
	//var isNEW = (uneSource == null);	
	//alert('uneSourceisNEW : ' + isNEW);
	var isMAJ = 0; // Rien
	// DIALOG
	var dlgEditPOURCE = new Window("dialog"); 
        //dlgEditPOURCE.frameLocation = [ -4, -4 ];
        dlgEditPOURCE.graphics.backgroundColor = dlgEditPOURCE.graphics.newBrush (dlgEditPOURCE.graphics.BrushType.SOLID_COLOR, [0.3, 0.3, 0.3]);
        dlgEditPOURCE.graphics.foregroundColor = dlgEditPOURCE.graphics.newPen(dlgEditPOURCE.graphics.PenType.SOLID_COLOR, [1, 1, 1], 1);
        
		dlgEditPOURCE.text = "Edition d'une source PhotoLab"; 
		dlgEditPOURCE.orientation = "column"; 
		dlgEditPOURCE.alignChildren = ["left","top"]; 
		dlgEditPOURCE.spacing = 10; 
		dlgEditPOURCE.margins = 16; 

	// GROUP1
	var group1 = dlgEditPOURCE.add("group", undefined, {name: "group1"}); 
		group1.orientation = "row"; 
		group1.alignChildren = ["left","center"]; 
		group1.spacing = 10; 
		group1.margins = 0; 

		var statictext1 = group1.add("statictext", undefined, undefined, {name: "statictext1"}); 
			statictext1.text = "Nom Projet :"; 

		var editNomProjet = group1.add('edittext {properties: {name: "editNomProjet"}}'); 
			//editNomProjet.text = leNomProjet; 
			editNomProjet.text = uneSource.NomProjet; 		
			editNomProjet.preferredSize.width = 300; 

	// GROUP2
	var group2 = dlgEditPOURCE.add("group", undefined, {name: "group2"}); 
		group2.orientation = "row"; 
		group2.alignChildren = ["left","center"]; 
		group2.spacing = 10; 
		group2.margins = 0; 

		var dropdownAnnee_array = ["2019-2020", "2020-2021","2021-2022","2022-2023", "2023-2024","2024-2025"]; 
		var dropdownAnnee = group2.add("dropdownlist", undefined, undefined, {name: "dropdownAnnee", items: dropdownAnnee_array}); 
		dropdownAnnee.selection = 1; 
		for (var i = 0; i < dropdownAnnee.items.length; i++) {if (dropdownAnnee.items[i].text == uneSource.Annee ){dropdownAnnee.selection = i;}}

		var statictext2 = group2.add("statictext", undefined, undefined, {name: "statictext2"}); 
			statictext2.text = "Code Projet :"; 

		var editCodeEcole = group2.add('edittext {properties: {name: "editCodeEcole"}}'); 
			//editCodeEcole.text = leCode; 
			editCodeEcole.text = uneSource.CodeEcole; 
			editCodeEcole.preferredSize.width = 120; 
			
	// GROUP3
	var group3 = dlgEditPOURCE.add("group", undefined, {name: "group2"}); 
		group3.orientation = "row"; 
		group3.alignChildren = ["left","center"]; 
		group3.spacing = 10; 
		group3.margins = 0; 
		
		var statictext3 = group3.add("statictext", undefined, undefined, {name: "statictext3"}); 
			statictext3.text = "Nom du dossier de Sripts (Actions) dans Photoshop à utiliser :"; 

		var editRepScriptPS = group3.add('edittext {properties: {name: "editRepScriptPS"}}'); 
			//editCodeEcole.text = leCode; 
			editRepScriptPS.text = uneSource.RepScriptPS; 
			editRepScriptPS.preferredSize.width = 150; 			
	
	var staticRepertoire = dlgEditPOURCE.add('edittext {properties: {name: "edittext1", readonly: true, borderless: true}}'); 
	//staticRepertoire.graphics.font = ScriptUI.newFont ('', '', 10);
    staticRepertoire.text = decodeURI(uneSource.Repertoire);
    staticRepertoire.preferredSize.width = 500;
		
	var btnRepertoire = dlgEditPOURCE.add("button", undefined, undefined, {name: "btnRepertoire"}); 
	btnRepertoire.text = "Sélection du repertoire Source"; 
	btnRepertoire.helpTip = "Sélection du repertoire contenant les photos Source";
	
	btnRepertoire.onClick = function () {	
		var leRepSOURCE = Folder.selectDialog("Sélectionnez un dossier de Photos pour: " + editNomProjet.text);
		//alert('leRepSOURCE : ' + leRepSOURCE);
		if(leRepSOURCE){
			var leChemin = leRepSOURCE.path + '/' + leRepSOURCE.name;
			//var leChemin = leRepSOURCE.fsName.toString();
			//alert('leChemin : ' + leChemin);
			uneSource.Repertoire = leChemin;
			staticRepertoire.text = decodeURI(uneSource.Repertoire);
		}
	}
	
	var btnArboWeb = dlgEditPOURCE.add("button", undefined, undefined, {name: "btnArboWeb"}); 
	btnArboWeb.text = "Création des fichiers WEB";
	btnArboWeb.helpTip = "Création du repertoire structuré pour transférer sur l'interface Lumys"; 
	
	btnArboWeb.onClick = function () {	
		if (uneSource.isValide()){
			if(AfficheClassesAvantArboWeb(editNomProjet.text, staticRepertoire.text)){
				isMAJ = 3; // MAJ Source + Arrbo WEB
				dlgEditPOURCE.close();
			}								
		}else{alert('Tout les champs doivent être remplis !');}	
	}	

	// GROUP4
	var group4 = dlgEditPOURCE.add("group", undefined, {name: "group4"}); 
		group4.orientation = "row"; 
		group4.alignChildren = ["right","center"]; 
		group4.spacing = 10; 
		group4.margins = [0,20,0,0]; 
		group4.alignment = ["right","top"]; 

		var btnAnnuler = group4.add("button", undefined, undefined, {name: "btnAnnuler"}); 
			btnAnnuler.text = "Annuler"; 
			
		btnAnnuler.onClick = function () {	
			dlgEditPOURCE.close();
		}	

		var btnOK = group4.add("button", undefined, undefined, {name: "btnOK"}); 
			btnOK.text = "OK"; 
		
		btnOK.onClick = function () {	
			uneSource.CodeEcole = editCodeEcole.text;
			uneSource.NomProjet = editNomProjet.text;
			uneSource.Annee = dropdownAnnee.selection.text;
			uneSource.RepScriptPS = editRepScriptPS.text;
			uneSource.Repertoire = encodeURI(staticRepertoire.text);
			if (uneSource.isValide()){
				//MAJFichierSource();
				isMAJ = 1; // MAJ Source
				dlgEditPOURCE.close();								
			}else{alert('Tout les champs doivent être remplis !');}
		}		

	dlgEditPOURCE.show();
	return isMAJ;
}

function AfficheClassesAvantArboWeb(NomProjet, leRertoireSource){
	var valRetour = false;
	// DIALOG
	// ======
	var dlgArboWEB = new Window("dialog", 'WEB : ' + NomProjet); 
		//dlgArboWEB.text = "Validation des noms de classes"; 
		dlgArboWEB.orientation = "column"; 
		dlgArboWEB.alignChildren = ["center","top"]; 
		dlgArboWEB.spacing = 10; 
		dlgArboWEB.margins = 16; 
		
		//dlgArboWEB.frameLocation = [ 0, 20 ];
		dlgArboWEB.graphics.backgroundColor = dlgArboWEB.graphics.newBrush (dlgArboWEB.graphics.BrushType.SOLID_COLOR, [0.3, 0.3, 0.3]);

		dlgArboWEB.graphics.foregroundColor =UIRepertoireSource.graphics.newPen (UIRepertoireSource.graphics.PenType.SOLID_COLOR, [0.9, 0.9, 0.9], 1);			
	
	// GROUPEINFO2
	// ===========
	var GroupeInfo2 = dlgArboWEB.add("group", undefined, {name: "GroupeInfo2"}); 
		GroupeInfo2.orientation = "column"; 
		GroupeInfo2.alignChildren = ["center","top"]; 
		GroupeInfo2.spacing = 10; 
		GroupeInfo2.margins = 0; 	
	
	var statictext3 = GroupeInfo2.add("statictext", undefined, undefined, {name: "dsfsdf", justify: "center"}); 
	statictext3.text = "Noms des classes trouvés :"; 
	statictext3.preferredSize.width = 300; 
		
	var listtext3 = GroupeInfo2.add ("edittext", [0, 0, 300, 400], " ", {name: "Noms des classes :", multiline: true});
	listtext3.text = "Aucune ..."; 
		
////////A VOIR POSITION

	g_RepSOURCE  = leRertoireSource ;

	g_TabListeNomsClasses = [];
	//alert('Avant initialisation');
	InitialisationSourcePourLewEB(Folder(g_RepSOURCE), []);
	var nbclasses = 0;	
	var isfratrie = false;
	var refClasse = '';
	var nomClasse = '';
	for(var valeur in g_TabListeNomsClasses){
		 refClasse = (refClasse == '')? valeur : (refClasse + "\n" + valeur);
		 nomClasse = (nomClasse == '')? g_TabListeNomsClasses[valeur] : (nomClasse + "\n" + g_TabListeNomsClasses[valeur]);
		 if ( nomClasse.toLowerCase().indexOf('fratrie') > -1){
			 isfratrie = true;
		}else{
			nbclasses = nbclasses + 1;	
		}

	}	
	listtext3.text = decodeURIComponent(nomClasse);
	statictext3.text =  nbclasses + " classes trouvés" + (isfratrie?" et des fratries":"") + " : "; 


/////////


	// GROUPEINFO4
	// ===========
	var GroupeInfo4 = dlgArboWEB.add("group", undefined, {name: "GroupeInfo4"}); 
		GroupeInfo4.orientation = "row"; 
		GroupeInfo4.alignChildren = ["left","center"]; 
		GroupeInfo4.spacing = 10; 
		GroupeInfo4.margins = 0; 
		GroupeInfo4.alignment = ["right","top"]; 	

	var buttonGenerererArboWEB = GroupeInfo4.add("button", undefined, undefined, {name: "buttonGenerererArboWEB"}); 
		buttonGenerererArboWEB.text = "Générer Arborescence WEB"; 
		
		
	buttonGenerererArboWEB.onClick = function () {	
			g_RepTIRAGES_DateEcole = g_Rep_PHOTOLAB + 'SOURCESWEB/LUMYS-' + NomProjet;
			valRetour = true;
			//return valRetour;	
			dlgArboWEB.close();	
	}		

	//dlgArboWEB.show();
	
	if (dlgArboWEB.show () != 2){			
		return valRetour;	
	}
}
