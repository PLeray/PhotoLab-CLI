﻿////////////////////////////// LES FONCTIONS OUTILS //////////////////////////////////////////////
#include PSDFonctionsDatas.js

function OuvrirFichierToTableauDeLigne(file) {
	var tabPlanchesLabo = [];
	if (file.open("r")){
		var leContenu = "";
		g_TabLigneOriginale.length = 0; // = [];
		while(!file.eof){
			leContenu = file.readln();
			//alert('API CONTENU : \n' + leContenu.substr(0,2));
			if (leContenu != ""){
				if (leContenu.substr(0,2) != "//"){
					g_TabLigneOriginale.push(leContenu);
					//alert('API CONTENU IN : \n' + leContenu);	
				}
			}			
		}
		file.close();
		//alert(TableauTOStr(g_TabLigneOriginale));
		var retourAPI = APIphotolab('?apiCMDLAB=' + file.name);
		//retourAPI.substr(0,2)
		//alert('retourAPI.substr(0,2) ' + retourAPI.substr(0,2));	
		if 	(retourAPI.substr(0,2) == "OK") {// tout va bien
			tabPlanchesLabo = retourAPI.substr(2,retourAPI.length-2).split(sepRetourLigne);
			//alert('API CONTENU : \n' + tabPlanchesLabo);
		}
		else {
			//alert (retourAPI, "APIphotolab Erreur !", true)
			MsgERREUR("APIphotolab Erreur !", retourAPI);
			
			tabPlanchesLabo.length = 0; // = [];
		}
	}
	//alert(TableauTOStr(tabPlanchesLabo));
	//return g_TabLigneOriginale;
	return tabPlanchesLabo;
}

function isDroitCompiler(fileName) {
	var monOrdi = '';
	var leCompilateur = '';
	var droitCompiler = false;
	if (isFichierExiste(fileName)){
		var file = new File(fileName);
		file.open("r"); // open file with write access
			leCompilateur = file.readln();
			//alert ('file.readln() : ' + leCompilateur + ' fileName : ' + fileName);
			leCompilateur = leCompilateur.substr(15,-1);
		file.close();
	
		if (leCompilateur == ''){
			file = new File(fileName);
			file.encoding='UTF-8';
			file.open("w");					
				leCompilateur = g_CeCalculateur;
				file.writeln('[Version : 2.0]%' + g_CeCalculateur + '%');
			file.close();				
		}
		droitCompiler = (leCompilateur == g_CeCalculateur) ? true : false;		
	}
	else{
		droitCompiler = true;		
	}
	//alert ('isDroitCompiler : ' + droitCompiler);	
	return droitCompiler;
}

function isCMDEnregistree(fileName) {
	// Code MD5 enregistrement serveur
	var monOrdi = '';
	var leCompilateur = '';
	var droitCompiler = false;
	/*if (isFichierExiste(fileName)){
		var file = new File(fileName);
		file.open("r"); // open file with write access
			leCompilateur = file.readln();
			//alert ('file.readln() : ' + leCompilateur + ' fileName : ' + fileName);
			leCompilateur = leCompilateur.substr(15,-1);
		file.close();
	
		if (leCompilateur == ''){			
			file = new File(fileName);
			file.encoding='UTF-8';
			file.open("w");					
				leCompilateur = g_CeCalculateur;
				file.writeln('[Version : 2.0]%' + g_CeCalculateur + '%');
			file.close();				
		}
		droitCompiler = (leCompilateur == g_CeCalculateur) ? true : false;		
	}
	else{
		droitCompiler = true;		
	}*/
	//alert ('isDroitCompiler : ' + droitCompiler);	
	droitCompiler = true;
	return droitCompiler;
}

function RecupNomOrdi() {	
	if (g_CeCalculateur == ''){
				
		var fileName = 'C:\\PhotoLab-Plugin.ini';
//alert ('g_CeCalculateur : ' + g_CeCalculateur);	
		if (isFichierExiste(fileName)){			
			var file = new File(fileName);
			file.open("r"); // open file with write access
				g_CeCalculateur = file.readln();
//alert ('PhotoLab Plugin utilise ' + g_CeCalculateur);
				//PHOTOLAB.text =  'PHOTOLAB PLUGIN ' + g_Version + ' [' + g_CeCalculateur + ']';
			file.close();
		}
		else{
			alert ('Pas de Calculateur !');
		}
	}
//alert ('g_CeCalculateur : ' + g_CeCalculateur);		
}	

function SauverFichierFromTableauDeLigne(fileName,numEtatCompil) {
	//Fchier etat/ lab1 ou lab2 ou web1 web2
	var fileName = fileName.substr(0,fileName.length-1); // lab0 >> lab1
	fileName = g_SelectFichierLab.path + '/' + fileName + numEtatCompil; // + '1' : Etat les planches de la commande sont EN COURS (16-11)
	
	var file = new File(fileName);
	file.encoding='UTF-8';
	file.open("w"); // open file with write access
		for (var n = 0; n < g_TabLigneOriginale.length; n++) {			
			switch(n) {
			case 0:
			//alert('case 0 :');
				file.writeln('[Version : 2.0]%' + g_CeCalculateur + '%');
				break;
			case 1:
				var recuRESUME = g_TabLigneOriginale[n];					
				if (numEtatCompil == 1) {
					file.writeln('{Etat 1 :' + g_CommandeAVANCEMENT + recuRESUME.substr(recuRESUME.indexOf('%%')));						
				}
				else{
					file.writeln('{Etat 2 : Création des planches terminées' + recuRESUME.substr(recuRESUME.indexOf('%%')));
					
				}
				break;
			default:
				file.writeln(g_TabLigneOriginale[n]);
			} 
		}		
	file.close();
	//if (numEtatCompil != 1) {alert (TableauTOStr(g_TabLigneOriginale));}
	//alert('PLANCHES PRETES !   Les commandes sont visionables dans le gestionnaire GO-PHOTOLAB\n');
	
	MsgINFO('PLANCHES PRETES !   Les commandes sont visionables dans le gestionnaire GO-PHOTOLAB');

	//return nbErreur;
	return true;
}
/*
function SauverEtatFichier(fileName, encoursFichier, totalFichier) {
	var fileName = fileName.substr(0,fileName.length-1); // lab0 >> lab1
	fileName = g_SelectFichierLab.path + '/' + fileName + '1'; // + '1' : Etat les planches de la commande sont créees
	var file = new File(fileName);
	file.encoding='UTF-8';
	file.open("w"); // open file with write access
		file.readln();
		file.writeln(encoursFichier + ' / ' + totalFichier);
		//file.writeln('{Etat : ' + encoursFichier + ' / ' + totalFichier);	
	file.close();
	return true;
}
*/
function EcrireBilan(fileName) {
	var nbErreur = g_BilanGeneration.length;
	//alert('EcrireBilan(fileName)' + fileName);
	if (nbErreur > 0){
		var fileName = fileName.substr(0, fileName.length-4); 
		fileName = g_SelectFichierLab.path + '/' + fileName + 'Erreur'; 
		var file = new File(fileName);
		file.encoding='UTF-8';
		file.open("w"); // open file with write access
			for (var n = 0; n < g_BilanGeneration.length; n++) {
				file.writeln(g_BilanGeneration[n]);
				MsgERREUR("ERREUR " + (n + 1), g_BilanGeneration[n]);
			}		
		file.close();
	}
	return nbErreur;	
}

/////////////// Pour Action sur BOUTON TEST ///////////////////////////////////////
function TEST() {
	//var myName = myInput ();
	//alert('myName : ' + myName);
	Init();

}
////////////////////////////////////////////////////////////////////////////////////

/////////////// Pour Action sur BOUTON Classes ///////////////////////////////////////
function Classes() {
	alert('TEST Indiv / Groupe : ' + TestIndivPhotoDeGroupe());
}
////////////////////////////////////////////////////////////////////////////////////

/////////////// Pour Action sur BOUTON Info ///////////////////////////////////////
function InfoAPI() {
	var retourAPI = APIphotolab('?apiCMDLAB=' + encodeURI(g_SelectFichierLab.name));
	alert('retourAPI.substr(2) : ' + retourAPI.substr(2));
	var tabPlanchesLabo = [];
	var isAPIOK = TestAPI();
	if 	(isAPIOK){
		if 	(retourAPI.substr(0,2) == "OK") {// tout va bien
			//alert('retourAPI.substr(2,retourAPI.length-2) : ' + retourAPI.substr(2,retourAPI.length-2));
			tabPlanchesLabo = retourAPI.substr(2,retourAPI.length-2).split(sepRetourLigne);
			//alert('API Connexion : ' + isAPIOK + '\n Retour API : \n' + TableauTOStr(tabPlanchesLabo));
		}
	}
}
////////////////////////////////////////////////////////////////////////////////////

function OuvrirPhotoSource(unFichierPhoto){
	//var leFichierPhotoOK = new File(g_RepSOURCE + "/" + unFichierPhoto); 
	var leFichierPhotoOK = g_RepSOURCE + "/" + unFichierPhoto; 	
	try {
		//if(leFichierPhotoOK.exists){
		if(isFichierExiste(leFichierPhotoOK)){ 
			var laPhoto = app.open(File(leFichierPhotoOK));
			return laPhoto;		
		} else {
			//alert ( "Le fichier exiterait pas : \n\n" + leFichierPhotoOK);			
			var theFolder = new Folder(g_RepSOURCE);
			//alert ( "TrouverFichierSource : \n\n" + leFichierPhotoOK);			
			leFichierPhotoOK = ChercherSourcePhoto(theFolder, '', unFichierPhoto);
			//alert ( "leFichierPhotoOK : \n\n" + leFichierPhotoOK);	
			var laPhoto = app.open(File(leFichierPhotoOK));
			return laPhoto;	
		}						
	}
	catch(err) {
		var msg = 'Ecole en cours : ' + g_CommandeECOLEEncours;
		AjoutBilanGeneration(msg);
		msg = '  Commande en cours : ' + g_CommandePDTEncours;
		AjoutBilanGeneration(msg);
		msg = '     PROBLEME : Ouverture de la photo : ' + unFichierPhoto;		
		AjoutBilanGeneration(msg);
		msg = "     SOLUTION PROBABLE : vérifier que le fichier : " + unFichierPhoto + " existe bien dans le repertoire SOURCE de l'ecole !";	
		AjoutBilanGeneration(msg);		
		AjoutBilanGeneration('');
		g_Erreur = msg;
		return null;
	}
}

//function ChercherSourcePhoto(theFolder, unObjFichierPhoto) {   
function ChercherSourcePhoto(theFolder, FichierTrouve, nomFichierATrouver) {    
   //var FichierRech = '';
   var theContent = theFolder.getFiles();
   for (var n = 0; n < theContent.length; n++) {
      var theObject = theContent[n];
      if (theObject.constructor.name == "Folder") {
	  //alert ( "nomFichierATrouver : " + nomFichierATrouver + "\n\n dansrep rep : " + theObject);
         FichierTrouve = ChercherSourcePhoto(theObject, FichierTrouve, nomFichierATrouver);
      }		
      if (theObject.name == encodeURI(nomFichierATrouver)) {
	  //alert ( "theObject.name : \n\n" + theObject.path + '/' + theObject.name + " \n\n    nomFichierATrouver : " + nomFichierATrouver );
         //alert ( "FichierTrouve !!!!!!!!!!!!!!!!! " + FichierTrouve);
		 FichierTrouve = theObject.path + '/' + theObject.name ;
		break;
      }
   }
   return FichierTrouve;
}

/*
function TrouverFichierSource(unFichierPhoto) {
	alert ( "TrouverFichierSource : \n\n" + leFichierPhotoOK);
	var FichierRech = '';
	var theFolder = new Folder(g_RepSOURCE);

	FichierRech = ChercherSourcePhoto(theFolder, unFichierPhoto);
	alert ( "Le fichier trouvé : \n\n" + FichierRech)
	return FichierRech ;
}
*/

/**/
/*
function ChercherSOURCESousRepertoire(theFolder, RepChercheRep, reference) {
   // if (!theFiles) {var theFiles = []};
    var theContent = theFolder.getFiles();
	//alert('ChercherRefRepertoire ' + theContent);
							var laProfondeur = Profondeur;
							theContent.sort();
    for (var n = 0; n < theContent.length; n++) {
        var theObject = theContent[n];
        if (theObject.constructor.name == "Folder") {
			// UI Affichage 
			UIRepertoireSource.text  = theObject.path + '/' + theObject.name;
			
			//alert('theObject.path +  theObject.name ' + theObject.path + '/' + theObject.name);
			UIText = theObject.path + '/' + theObject.name; //UIRepertoireSource.text + '.';
			//alert('TEst Rep ' + UIText);
			//g_UIWINRechercheSource.update();
			 //win.update();
			 $.sleep(20);
			 g_UIWINRechercheSource.update();
			// UI Affichage
            if (theObject.name.indexOf(reference) != -1){ 
                RepChercheRep = theObject.path + '/' + theObject.name ;
				g_ProfondeurMAX = laProfondeur;
                break;
            }
            //alert(' REP : ' + theObject.path + '/' + theObject.name);
			if (laProfondeur < g_ProfondeurMAX){
				//laProfondeur = laProfondeur + 1;
				RepChercheRep = ChercherRefRepertoire(theObject, RepChercheRep, reference, laProfondeur + 1);			
			}
         }
    }
	//alert('RepChercheRep ' + RepChercheRep);
   return RepChercheRep; 
}
*/

function Action_Script_PhotoshopPSP(N_action){
	try {
		/**/
        if( N_action != ""){
			var idPly = charIDToTypeID( "Ply " );
			var desc63 = new ActionDescriptor();
			var idnull = charIDToTypeID( "null" );
			var ref8 = new ActionReference();

			var idActn = charIDToTypeID( "Actn" );
			ref8.putName( idActn, N_action );

			var idASet = charIDToTypeID( "ASet" );
			ref8.putName( idASet, g_RepSCRIPTSPhotoshop);

			desc63.putReference( idnull, ref8 );
			executeAction( idPly, desc63, DialogModes.NO );
            //alert("N_action.sortie  : " + N_action);
		}
		return true;
	}
	catch(err) {
		var msg = 'Ecole en cours : ' + g_CommandeECOLEEncours;
		AjoutBilanGeneration(msg);
		msg = '  Commande en cours : ' + g_CommandePDTEncours;
		AjoutBilanGeneration(msg);
		msg = "     PROBLEME : Pas de script Photoshop (Action) nommé : " + N_action + " dans : '" + g_RepSCRIPTSPhotoshop + "'";
		AjoutBilanGeneration(msg);
		msg = "     SOLUTION PROBABLE : Ajouter un script Photoshop (Action) nommé : " + N_action + " dans : '" + g_RepSCRIPTSPhotoshop + "'";	
		AjoutBilanGeneration(msg);
		AjoutBilanGeneration('');		
		g_Erreur = msg;
		return false;			
	}
}

function Miniature_Reduction(pourcent){
	// =================Reduction à 10 % ======================================
	var idImgS = charIDToTypeID( "ImgS" );
	var desc10 = new ActionDescriptor();
	var idWdth = charIDToTypeID( "Wdth" );
	var idPrc = charIDToTypeID( "#Prc" );
	desc10.putUnitDouble( idWdth, idPrc, pourcent );
	var idscaleStyles = stringIDToTypeID( "scaleStyles" );
	desc10.putBoolean( idscaleStyles, true );
	var idCnsP = charIDToTypeID( "CnsP" );
	desc10.putBoolean( idCnsP, true );
	var idIntr = charIDToTypeID( "Intr" );
	var idIntp = charIDToTypeID( "Intp" );
	var idBcbc = charIDToTypeID( "Bcbc" );
	desc10.putEnumerated( idIntr, idIntp, idBcbc );
	executeAction( idImgS, desc10, DialogModes.NO );
}

function ImporterAutrePhoto(PathNomAutrePhoto){
// ==============Importation Deuxieme image ======================================	
	var idPlc = charIDToTypeID( "Plc " );
	var desc2 = new ActionDescriptor();
	var idnull = charIDToTypeID( "null" );
	desc2.putPath( idnull, new File(PathNomAutrePhoto) );
	var idFTcs = charIDToTypeID( "FTcs" );
	var idQCSt = charIDToTypeID( "QCSt" );
	var idQcsa = charIDToTypeID( "Qcsa" );
	desc2.putEnumerated( idFTcs, idQCSt, idQcsa );
	var idOfst = charIDToTypeID( "Ofst" );
	var desc3 = new ActionDescriptor();
	var idHrzn = charIDToTypeID( "Hrzn" );
	var idRlt = charIDToTypeID( "#Rlt" );
	desc3.putUnitDouble( idHrzn, idRlt, 0.000000 );
	var idVrtc = charIDToTypeID( "Vrtc" );
	var idRlt = charIDToTypeID( "#Rlt" );
	desc3.putUnitDouble( idVrtc, idRlt, 0.000000 );
	var idOfst = charIDToTypeID( "Ofst" );
	desc2.putObject( idOfst, idOfst, desc3 );
	executeAction( idPlc, desc2, DialogModes.NO );
}

function AjoutBilanGeneration(msg){
	if (g_BilanGeneration.length == 0){
		//alert ('msg_Erreur ' + msg);
		PHOTOLAB.graphics.backgroundColor = PHOTOLAB.graphics.newBrush(PHOTOLAB.graphics.BrushType.SOLID_COLOR, [1, 0.2, 0.2]);	
	}
	g_BilanGeneration.push(msg);
	//EcrireBilan(decodeURI(g_SelectFichierLab.name));
	//SuiteERREURGenerer();	
}

/**/
function SuiteERREURGenerer() { 
	g_IsGenerationEnPause = !g_IsGenerationEnPause;	
	SetBoutonGenerer();
	if (!g_IsGenerationEnCours){ //  On n'est pas en cours de generation !!!
		GenererFichiers();
		g_IsGenerationEnPause = false;	
	}		
}

function CreerUnProduitPourLeLaboratoire(unProduit){
	var nomFichierPhoto = unProduit.FichierPhoto;
	var unNomdePlanche = NomPlancheLabo(unProduit, nomFichierPhoto);
	var valRetour = unNomdePlanche;
	var unPathPlanche = g_RepTIRAGES_DateEcole + "/" + unProduit.Taille + " (1ex de chaque)/" + unNomdePlanche;
	var unPathMiniature = g_RepMINIATURES_DateEcole + "/" + unProduit.Taille + " (1ex de chaque)/" + unNomdePlanche;
	if(!isFichierExiste(unPathPlanche)){
		try {
			//alert('CreerUnProduitPourLeLaboratoire \n Code de unProduit ' + unProduit.Code);

			//alert('DEBUT CreerUnProduitPour : ' + nomFichierPhoto ); //////////////////////////////////////////////
			if (unProduit.Code){
				if (unProduit.FichierPhoto.length && unProduit.isNeedGroupeClasse()){//Ouvrir la bonne photo ? Groupe
					//alert('sdsdsdsdur : ' + nomFichierPhoto ); //////////////////////////////////////////////
					nomFichierPhoto = GroupeClassePourIndiv(unProduit);
					//alert('nomFichierPhoto : ' + nomFichierPhoto);
				}
				if (unProduit.Type.indexOf('QUATTRO') > -1){ //Produit QUATTRO Besoin du fichier Quatro !!
					//alert('Pour CADRE-QUATTRO : ' + nomFichierPhoto + ' Sera ' + NextQuattro(nomFichierPhoto) ); 
					nomFichierPhoto = NextQuattro(nomFichierPhoto);										
				}	
				
				if (unProduit.Type.indexOf('IDENTITE') > -1){ //Produit IDENTITE Besoin du fichier Identite !!
					nomFichierPhoto = FichierIdentite(nomFichierPhoto);										
				}					
				
				//alert('Avant OUverture CreerUnProduitPour : ' + nomFichierPhoto ); //////////////////////////////////////////////
				var laPhoto = OuvrirPhotoSource(nomFichierPhoto); 	
				var reussiteTraitement = (laPhoto != null);	
				if (reussiteTraitement) {
					var docName = laPhoto.name;
					//var basename = docName.match(/(.*)\.[^\.]+$/)[1];
					//var docPath = laPhoto.path;		SUPRESSION 17/11/2020 ??!!						
					////////  Cas des fratrie ou Indiv en paysage =>> Portrait /////////
					var isFratrie = false;
					var myDocument = app.activeDocument; 
					if (unProduit.isFichierIndiv() && !unProduit.isProduitGroupe()) {
						if (myDocument.width > myDocument.height) { 
							alert('rotateCanvas' ); 						
							isFratrie = true;
							myDocument.rotateCanvas(90)  
						}  
					}	
					//alert('TRANSFORMATIONS teinte ; ") ' + unProduit.Teinte );
					//////////////// VERIF-DPI //////////////////////
					reussiteTraitement = reussiteTraitement && Action_Script_PhotoshopPSP('300DPI');				
					//////////////// TRANSFORMATIONS //////////////////////
					// 1 : LA TEINTE  DE L'IMAGE /////////////////////////
					if (unProduit.Teinte != "Couleur" && !unProduit.isSansNB()){
						reussiteTraitement = reussiteTraitement && Action_Script_PhotoshopPSP(unProduit.Teinte);
						//Raffraichir();  AVOIR new 27-08
					}
					
					// CADRE-CARRE-ID !!!!!!!!!
					if (unProduit.Type.indexOf('CADRE-CARRE-ID') > -1){ //Produit CARRE-ID Besoin du fichier ID !!							
						//reussiteTraitement = reussiteTraitement && 
						ImporterAutrePhoto(g_RepSOURCE + "/" + FichierIdentite(nomFichierPhoto));					
					}	
					// INSITU-CARRE-ID !!!!!!!!!
					if (unProduit.Type.indexOf('INSITU-CARRE-ID') > -1){ //Produit CARRE-ID Besoin du fichier ID !!							
						//reussiteTraitement = reussiteTraitement && 
						ImporterAutrePhoto(g_RepSOURCE + "/" + FichierIdentite(nomFichierPhoto));					
					}								
					
					// 3 : LE TYPE DE PRODUIT / IMAGE ////////////////////
					if (unProduit.Type != "PORTRAIT" 
						&& unProduit.Type != "PANO" 
						&& unProduit.Type != "TRAD" 
						&& unProduit.Type != "CUBE" 
						&& unProduit.Type != "RUCH"						
						&& unProduit.Type != "CADRE-GP" // utilité ???
						&& unProduit.Type != "INSITU-GP"){
						reussiteTraitement = reussiteTraitement && Action_Script_PhotoshopPSP(unProduit.Type);
						//Raffraichir(); AVOIR new 27-08
					}
					/*if (unProduit.Type != "PORTRAIT" 
						&& unProduit.isTypeGroupe() == false){
						reussiteTraitement = reussiteTraitement && Action_Script_PhotoshopPSP(unProduit.Type);
						Raffraichir(); 
					}*/					
					// 2 : Si Portait LA TAILLE DE L'IMAGE FINALE ///////////////////
					if (g_RepSCRIPTSPhotoshop == "PHOTOLAB-Studio²"){ // QQue pour Studio² !!!						
						reussiteTraitement = reussiteTraitement && Action_Script_PhotoshopPSP('POINCON-S²');
						reussiteTraitement = reussiteTraitement && Action_Script_PhotoshopPSP(unProduit.Taille);
					}
					else{ // Sinon !!!		
						// A REVOIR !!!!!!!		
						if ((unProduit.Type.lastIndexOf("PORTRAIT") > -1)||(unProduit.Type.lastIndexOf("TRAD") > -1)){ 
							//alert('lastIndexOf("Agrandissements") ');
							reussiteTraitement = reussiteTraitement && Action_Script_PhotoshopPSP(unProduit.Taille);		
						}
					}	
					
					reussiteTraitement = reussiteTraitement && CreerRepertoire(g_RepTIRAGES_DateEcole + "/"+ unProduit.Taille + " (1ex de chaque)");
					reussiteTraitement = reussiteTraitement && CreerRepertoire(g_RepMINIATURES_DateEcole + "/"+ unProduit.Taille + " (1ex de chaque)");
					
					if (reussiteTraitement){
						// Pour avoir des planches homogenes dans le viewer de commandes					
						myDocument = app.activeDocument; 
						if (unProduit.isFichierIndiv() && !unProduit.isProduitGroupe()) {  
							if (myDocument.width > myDocument.height) { myDocument.rotateCanvas(-90);}  
						} 
						//La sauvegarde ...						
						SauvegardeJPEG(laPhoto, unPathPlanche);
						
						// Ici Faire 10%
						Miniature_Reduction(10.000000); // Soit 10 %
						SauvegardeJPEG(laPhoto, unPathMiniature);

						laPhoto.close(SaveOptions.DONOTSAVECHANGES);						

						valRetour = unNomdePlanche;
					}
					else {
						laPhoto.close(SaveOptions.DONOTSAVECHANGES);
						valRetour = "KO";
					}
				}
				else { valRetour = "KO";}
			}
			return valRetour;
		}
		catch(err) {
			g_Erreur = "Commande  : " + g_CommandePDTEncours + " ERREUR ds CreerUnProduitPourLeLaboratoire pour : " + nomFichierPhoto;
			laPhoto.close(SaveOptions.DONOTSAVECHANGES);
			return "KO";
		}
	}
	return valRetour;
}

function CreerUnProduitPourLeSiteWEB(unProduit){
	var nomFichierPhoto = unProduit.FichierPhoto;
	var unNomdePlanche = NomPlancheLabo(unProduit, nomFichierPhoto);
	var valRetour = unNomdePlanche;
	var unPathPlanche = g_RepTIRAGES_DateEcole + "/" + unProduit.Taille + " (1ex de chaque)/" + unNomdePlanche;
	if(!isFichierExiste(unPathPlanche)){	
		try {
			//alert('CreerUnProduitPourLe Site WEB \n Code de unProduit ' + unProduit.Code);
			var extTeinte = '';
			var nomFichierPhoto = unProduit.FichierPhoto;
			if (unProduit.Code){
				
				if (unProduit.FichierPhoto.length && unProduit.isNeedGroupeClasse()){//Ouvrir la bonne photo ? Groupe
					nomFichierPhoto = GroupeClassePourIndiv(unProduit);
					
				}
				var laPhoto = OuvrirPhotoSource(nomFichierPhoto); 	
				var reussiteTraitement = (laPhoto != null);	
				if (reussiteTraitement) {
					var docName = laPhoto.name;
					//var basename = docName.match(/(.*)\.[^\.]+$/)[1];
					var docPath = laPhoto.path;								
					////////  Cas des fratrie ou Indiv en paysage =>> Portrait /////////
					var isFratrie = false;
					var myDocument = app.activeDocument; 	
					//////////////// TRANSFORMATIONS //////////////////////
					// 1 : LA TEINTE  DE L'IMAGE /////////////////////////
					if (unProduit.Teinte != "Couleur"){
						reussiteTraitement = reussiteTraitement && Action_Script_PhotoshopPSP(unProduit.Teinte);
						Raffraichir(); 
						//extTeinte = ExtensionTeinte(unProduit.Teinte); //SEP / SEPIA NB / Noir et blanc
						}
					reussiteTraitement = reussiteTraitement && CreerRepertoire(g_RepTIRAGES_DateEcole + "/"+ unProduit.Taille );
					if (reussiteTraitement){
						// Pour avoir des planches homogenes dans le viewer de commandes					
						myDocument = app.activeDocument; 
						//La sauvegarde ...
						var unNomdePlanche = NomPlancheSiteWEB(unProduit, nomFichierPhoto);
						
						SauvegardeJPEG(laPhoto, g_RepTIRAGES_DateEcole + "/" + unProduit.Taille + "/" + unNomdePlanche);

						laPhoto.close(SaveOptions.DONOTSAVECHANGES);
						valRetour = unNomdePlanche;
					}
					else {
						laPhoto.close(SaveOptions.DONOTSAVECHANGES);
						valRetour =  "KO";
					}
				}
				else {valRetour =  "KO";}
			}
		}
		catch(err) {
			g_Erreur = "Commande  : " + g_CommandePDTEncours + " ERREUR CreerUnProduitPourLeSiteWEB pour : " + nomFichierPhoto;
			laPhoto.close(SaveOptions.DONOTSAVECHANGES);
			return "KO";
		}
	}
	return valRetour;	
}

function OrdreTirageIndex(unProduit){
////////// A CHANGER POUR ORDRE DE TIRAGE INVERSE ///////////
	var Index = 0;
	if (g_OrdreInversePlanche){		
		Index = (g_TabLigneOriginale.length - unProduit.indexOriginal);	
	}
	else{
		Index = unProduit.indexOriginal;
	}
	//pad(Index, 4)
	return "P" + FormatSTR(Index, 4,'0',true);
}

function FormatSTR(chaine, length, motif, gauche) {   
    var str = '' + chaine;
    while (str.length < length) {
        if (gauche){ str = motif + str;}
		else{ str = str + motif;}
    }
    return str;
}

function NomPlancheLabo(unProduit, fichierName){
	//alert('NomPlancheLabo');
	var leNomFichier = fichierName.substr(0,fichierName.length-4);
	//alert('NomPlancheLabo2');
	leNomFichier = (unProduit.isFichierGroupe())? leNomFichier.substring(4) : leNomFichier;
	var leNomPlanche = (unProduit.Teinte)? '.' + unProduit.Teinte : '';
	leNomPlanche = OrdreTirageIndex(unProduit) + "." + leNomFichier + "." + unProduit.Type + "." + unProduit.Taille + leNomPlanche + ".JPG";  
	//alert('AVANT g_TabLigneOriginale[' + unProduit.indexOriginal + '] : ' + g_TabLigneOriginale[unProduit.indexOriginal]);
	g_TabLigneOriginale[unProduit.indexOriginal] = leNomPlanche;
	//alert('APRES g_TabLigneOriginale[' + unProduit.indexOriginal + '] : ' + g_TabLigneOriginale[unProduit.indexOriginal]);
	return leNomPlanche;
}

function NomPlancheSiteWEB(unProduit, fichierName){
	//alert('NomPlancheLabo');
	var leNomFichier = fichierName.substr(0,fichierName.length-4);
	//alert('NomPlancheLabo2');
	//leNomFichier = (unProduit.isFichierGroupe())? leNomFichier.substring(4) : leNomFichier;
	//var leNomPlanche = (unProduit.Teinte)? '.' + unProduit.Teinte : '';
	var leNomPlanche = leNomFichier + ExtensionTeinte(unProduit.Teinte) + ".JPG";  
	//alert('AVANT g_TabLigneOriginale[' + unProduit.indexOriginal + '] : ' + g_TabLigneOriginale[unProduit.indexOriginal]);
	g_TabLigneOriginale[unProduit.indexOriginal] = leNomPlanche;
	//alert('APRES g_TabLigneOriginale[' + unProduit.indexOriginal + '] : ' + g_TabLigneOriginale[unProduit.indexOriginal]);
	return leNomPlanche;
}

function UrlPlancheLabo(unProduit, fichierName){
	//Chemin Complet
	urlPlanche = g_RepTIRAGES_DateEcole + "/" + unProduit.Taille + "/" + NomPlancheLabo(unProduit, fichierName);
	return urlPlanche;
}

function SauvegardeJPEG(unDocument, unNomdeFichier){
// jpg options;
	  //alert("SauvegardeJPEG : " + unNomdeFichier);
      var jpegOptions = new JPEGSaveOptions();
      jpegOptions.quality = 12;
      jpegOptions.embedColorProfile = true;
//save jpg;
      unDocument.saveAs((new File(unNomdeFichier)),jpegOptions,true);
      // Fit apres l'appel : unDocument.close(SaveOptions.DONOTSAVECHANGES);
	  //return unNomdeFichier;
}	

function VerifNomRep(unNomdeRepertoire){
  	// A REVOIR !!!!!!!!!
    //alert("verif " +unNomdeRepertoire);
	var regex = new RegExp('^[a-zA-Z0-9]+([\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z0-9]{2,6}$', 'i'); 
	if (regex.test (unNomdeRepertoire)) {
        //alert ('Nom de dossier incorrect');
		MsgERREUR('Erreur','Nom de dossier incorrect');
        return false;
	 }
	 else {
         return true;
     }
    //return true;
}

function CreerRepertoire(unNomdeRepertoire){
	try {
		var repOK = true;
		var folder = new Folder(unNomdeRepertoire); 	 
		if (!folder.exists) {  
			repOK = folder.create();
			return repOK;
		}	
		return repOK;
	}
	catch(err) {
		//alert ("Impossible de creer le repertore : \n\n" + unNomdeRepertoire + "\n\n" + err.message, "ERREUR : CreerRepertoire()", true);
		MsgERREUR("ERREUR : CreerRepertoire()", "Impossible de creer le repertore : \n\n" + unNomdeRepertoire + "\n\n" + err.message);
		return false;
	}
}

function isRepertoireExiste(unNomdeRepertoire){
	var folder = new Folder(unNomdeRepertoire); 	 
	return folder.exists;
}

function isFichierExiste(unNomdeFichier){
	//alert ("isFichierExiste : " + unNomdeFichier)
	var fichier = new File(unNomdeFichier); 	 
	return fichier.exists;
}

function NbFichiersRepertoire(theFolderPath) {
	var leRep = Folder(theFolderPath)
	var theContent = leRep.getFiles();
	var nb=0;
	for (var n = 0; n < theContent.length; n++) {
	  var theObject = theContent[n];
	  if (theObject.constructor.name != "Folder") {
		 nb = nb + 1;
		 }
	}
	return nb;
}

function NbJPGArborescence(theFolder, theNombre) {
   //if (!theFiles) {var theFiles = []};
   var theContent = theFolder.getFiles();
   
   for (var n = 0; n < theContent.length; n++) {
      var theObject = theContent[n];
      if (theObject.constructor.name == "Folder") {
         theNombre = NbJPGArborescence(theObject, theNombre)
         }
	  else {
		  if (theObject.name.slice(-4) == ".JPG" && theObject.name.substr(0, 2) != "._" ) {
			 theNombre = theNombre + 1;
		  }
	  }
   }
   return theNombre
}

function TestIndivPhotoDeGroupe(){
	var msgTest = '';
	var nomFichierGroupe = '';
	for (var m = 0; m < g_CommandeLabo.NbPlanchesACreer() ; m++) {
		var unProduit = new Produit (g_CommandeLabo.ListePlanches[m]);
		if (unProduit.FichierPhoto.length && unProduit.isNeedGroupeClasse()){//Ouvrir la bonne photo ? Groupe
			nomFichierGroupe = GroupeClassePourIndiv(unProduit);
			//msgTest = msgTest + "\n" + unProduit.FichierPhoto + " => " + g_GroupeIndiv[unProduit.FichierPhoto];
			msgTest = msgTest + "\n" + unProduit.FichierPhoto + " => " + nomFichierGroupe;			
		}
	}	
	return msgTest;
}

function GroupeClassePourIndiv(unProduit){
	var nomGroupe = 'aucun';
   // On recupere le(s) groupe(s) de l'indiv
   //alert('g_GroupeIndiv[unProduit.FichierPhoto]' + unProduit.FichierPhoto + " => " + g_GroupeIndiv[unProduit.FichierPhoto]);
    if (g_GroupeIndiv[unProduit.FichierPhoto]){
        var TableauListeGroupe = g_GroupeIndiv[unProduit.FichierPhoto].split('_'); 
		//alert('TableauListeGroupe: ' + TableauListeGroupe);		
		var unFichierGroupe ='';
		for (var n = 0; n < TableauListeGroupe.length; n++) {
			unFichierGroupe = TableauListeGroupe[n];
			if (unFichierGroupe.indexOf(unProduit.Type.slice(-4)) > -1){
				//alert(unProduit.FichierPhoto + ' => fichier groupe de remplacement :  ' + unFichierGroupe);
				//On renvoie celui qui correspond au produit de groupe demandé
				unProduit.FichierPhoto = decodeURI(unFichierGroupe);
				//alert('unProduit.FichierPhoto => ' + unProduit.FichierPhoto );
				nomGroupe = decodeURI(unFichierGroupe);
				break;
			}
		}		
	}
	return nomGroupe;
}

function InitGroupesClasseIndiv(leRepSOURCE, theFiles) {
	try {
		//alert("InitClasseIndiv START sur " + leRepSOURCE);
		if (!theFiles) {var theFiles = []};
		var leContenuRep = leRepSOURCE.getFiles();
		
		var strNUMEROClasse = '';
		var StrLesGroupesClasse = '';
		var TabLesGroupesClasse = [];
		//OK alert("boucle sur : " + leContenuRep.length + " fichiers : ");
		leContenuRep.sort();
		for (var n = 0; n < leContenuRep.length; n++){
			var theObject = leContenuRep[n];
			if (theObject.constructor.name == "Folder") {
				theFiles = InitGroupesClasseIndiv(theObject, theFiles);
			}
			if (theObject.name.slice(-4) == ".JPG" || theObject.name.slice(-4) == ".jpg") {
				//ok alert("boucle : " + theObject.name + " taille : " + theObject.name.length);
				if (theObject.name.length >= g_MinimuNomClasse) { // C'est un petit nom de groupe !
					//On ajoute le groupe à TabLesGroupesClasse
					//alert("theObject.name : " + theObject.name + "    strNUMEROClasse :  " + strNUMEROClasse);
					if ((strNUMEROClasse != "") && (strNUMEROClasse != NumeroClasseDepuisNomGroupe(theObject.name))){
							TabLesGroupesClasse.length = 0; // = [];
							strNUMEROClasse = "";
					}					
					TabLesGroupesClasse = TabLesGroupesClasse.concat(theObject.name);	
					strNUMEROClasse = NumeroClasseDepuisNomGroupe(theObject.name);
						
				}
				else {
					StrLesGroupesClasse = RecupPhotoDeGroupe(TabLesGroupesClasse, StrLesGroupesClasse);
					//alert("g_GroupeIndiv[theObject.name] : " + theObject.name + " [  " + StrLesGroupesClasse);
					TabLesGroupesClasse.length = 0; // = [];
					g_GroupeIndiv[theObject.name] = StrLesGroupesClasse;
					strNUMEROClasse = "";
					
				}
			}
		}
		//alert("FIN InitClasseIndiv START sur " + leRepSOURCE);
		return theFiles;
	}
	catch(err) {
		//alert ("Impossible de creer le repertore : \n\n" + unNomdeRepertoire + "\n\n" + err.message, "ERREUR : CreerRepertoire()", true);
		MsgERREUR("Commande  : " + g_CommandePDTEncours + " ERREUR : InitGroupesClasseIndiv()", ErreurInfoMSG(err));
		return '';
	}		
}

function NumeroClasseDepuisNomGroupe(strNOMdeClasse){
	var retour = '';
	if ( strNOMdeClasse.toLowerCase().indexOf('fratrie') > -1) { // c'est une classe fratrie 
		retour = strNOMdeClasse.substr(0, 4);
	}
	else{
		//alert('isProduitGroupe ' + g_PdtGROUPE[1] );
		for (var i = 0; i < g_TypeGROUPE.length; i++) {
			if ( strNOMdeClasse.indexOf(g_TypeGROUPE[i]) > -1) { // c'est un groupe repertorié
				retour = strNOMdeClasse.substr(0, 4);
			}
		} 
	}
	return retour;
}

function NomClasseDepuisNomGroupe(strNOMdeClasse){
	var retour = '';
	if ( strNOMdeClasse.toLowerCase().indexOf('fratrie') > -1) { // c'est une classe fratrie 
			retour = 'Fratries';
	}
	else{
		retour = strNOMdeClasse.slice(10,-4);		
	}
	return retour;
}

function RecupPhotoDeGroupe(TabLesGroupesClasse, StrLesGroupesClasse){
	if (TabLesGroupesClasse.length) { // il y a au moins 1 groupe
		var StrLesGroupesClasse = '';
		for (var n = 0; n < TabLesGroupesClasse.length; n++) {
			StrLesGroupesClasse = StrLesGroupesClasse + TabLesGroupesClasse[n] + "_";
		}		
		//StrLesGroupesClasse=leGroupe;
	}	
	return StrLesGroupesClasse;
}

//////  jpg-files from folder and subfolders //////
function ChercherFichierJPGRepertoire(theFolder, theFiles) {
   if (!theFiles) {var theFiles = []};
   var theContent = theFolder.getFiles();
   
   for (var n = 0; n < theContent.length; n++) {
      var theObject = theContent[n];
      if (theObject.constructor.name == "Folder") {
         theFiles = ChercherFichierJPGRepertoire(theObject, theFiles)
         }
      if (theObject.name.slice(-4) == ".JPG" || theObject.name.slice(-4) == ".jpg") {
         theFiles = theFiles.concat(theObject);
      }
   }
   return theFiles
}
//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
function ChercherRefRepertoire(theFolder, RepChercheRep, reference, Profondeur) {
    var theContent = theFolder.getFiles();
	//alert('ChercherRefRepertoire ' + theContent);
	var laProfondeur = Profondeur;
	theContent.sort();
    for (var n = 0; n < theContent.length; n++) {
        var theObject = theContent[n];
        if (theObject.constructor.name == "Folder") {
			// UI Affichage 
			UIRepertoireSource.text  = theObject.path + '/' + theObject.name;
			UIText = theObject.path + '/' + theObject.name; //UIRepertoireSource.text + '.';

			// UI Affichage
			//g_UIWINRechercheSource.update();
			app.refresh();
			$.sleep(1);
			
            if (theObject.name.indexOf(reference) != -1){ 
                RepChercheRep = theObject.path + '/' + theObject.name ;
//alert(' g_ProfondeurMAX : ' + g_ProfondeurMAX + ' laProfondeur : ' + laProfondeur);				
				g_ProfondeurMAX = laProfondeur;
                break;
            }
            //alert(' REP : ' + theObject.path + '/' + theObject.name);
			if (laProfondeur < g_ProfondeurMAX){
				RepChercheRep = ChercherRefRepertoire(theObject, RepChercheRep, reference, laProfondeur + 1);			
			}
         }
    }
   return RepChercheRep; /**/
}

/*	
function TrouverSOURCE(refEcole) {
	var repRech = '';
	g_UIWINRechercheSource.show();
	
	var repDepart = g_RepBASESOURCE;
	UIRepertoireSource.text = 'Recherche de Sources... ';

	var theFolder = new Folder(repDepart);	
	repRech = ChercherRefRepertoire(theFolder, '', refEcole, 0);
	UIRepertoireSource.text = repRech;

	g_UIWINRechercheSource.onClose = function() {return repRech ;}
	g_UIWINRechercheSource.close();
	//alert('repRech ' + repRech);
	return repRech ;
}
*/

function ErreurInfoMSG(err){
	var msg = "     Fichier : " + err.fileName +  "   Ligne n° " + err.lineNumber + "    msg : " + err.message;
	return msg;
}

function TableauTOStr(unTableau){
	var strTableau = 'Le tableau : ';
	for (var n = 0; n < unTableau.length; n++) {
		strTableau = strTableau + "\n" + unTableau[n] ;
	}	
	//alert('unTableau[5] ' + unTableau[5] );
	return strTableau;
}

function TableauAssociatifTOStr(unTableau){
	var strTableau = 'Le tableau : ' ;
	
	for(var valeur in unTableau){
		 //document.write('<strong>'+valeur + ' : </strong>' + monTab[valeur] + '</br>');
		 strTableau = strTableau + "\n" + ' valeur : '+ valeur + ' unTableau[valeur] : ' + unTableau[valeur] ;
	   }	
	return strTableau;	
}

function ExtensionTeinte(uneTeinte){
	var extTeinte;
	//alert('uneTeinte : ' + uneTeinte);
	switch(uneTeinte) {
		case 'NOIR-ET-BLANC':
			extTeinte = '_nb';
			break;
		case 'SEPIA':
			extTeinte = 'SEP';
			break;
		default:
			extTeinte = '';
	} 
	return extTeinte;
}
/////////////// NEW JUILLET 2020 ///////////////////////////////////////
function InitialisationSourcePourLewEB(leRepSOURCE, theFiles) {
	try {
		if (!theFiles) {var theFiles = []};
		var leContenuRep = leRepSOURCE.getFiles();

		var strNOMClasse = '';
		var strNUMEROClasse = '';
		var StrLesGroupesClasse = '';
		leContenuRep.sort();
		for (var n = 0; n < leContenuRep.length; n++){
			var theObject = leContenuRep[n];
			if (theObject.constructor.name == "Folder") {
				theFiles = InitialisationSourcePourLewEB(theObject, theFiles);
			}
			if (theObject.name.slice(-4) == ".JPG" || theObject.name.slice(-4) == ".jpg") {
				if (theObject.name.length >= g_MinimuNomClasse) { 
					// C'est un Groupe  :: 000PANOgs(.jpg)// C'est un petit nom de groupe !
					//On ajoute le groupe à TabLesGroupesClasse
					if (strNUMEROClasse != NumeroClasseDepuisNomGroupe(theObject.name)){
							//TabLesGroupesClasse.length = 0; // = [];
							strNUMEROClasse = NumeroClasseDepuisNomGroupe(theObject.name);							
							strNOMClasse = NomClasseDepuisNomGroupe(theObject.name);
							//alert("strNOMClasse.name : " + strNOMClasse);
							g_TabListeNomsClasses[strNUMEROClasse] = strNOMClasse;	
					}					
					// Même pour les groupe classes
					g_GroupeIndiv[theObject.name] = strNOMClasse;
				}
				else {
					g_GroupeIndiv[theObject.name] = strNOMClasse;
				}
			}
		}
		return theFiles;
	}
	catch(err) {
		MsgERREUR("Commande  : " + g_CommandePDTEncours + " ERREUR : CreationSOURCEWEB()", ErreurInfoMSG(err));
		return '';
	}	
}

function CreerFichiersPresentationWEB(unfichier, extension, repertoire ){
	var nomFichierPhoto = unfichier;
	//var unNomdePlanche = unfichier.slice(0,-4) + extension + '.jpg';
	var unNomdePlancheWEB = unfichier.slice(0,-4) + '-WEB.jpg';
	var unNomdePlancheWEBVariante = unfichier.slice(0,-4) + '-WEB' + extension + '.jpg'; // nb ou Quattro
	var unNomdePlancheWEBFiche = unfichier.slice(0,-4) + '-Fiche_nb.jpg';
	//var valRetour = unNomdePlanche;
	var valRetour = unNomdePlancheWEB;		
	var unPathPlanche = g_RepTIRAGES_DateEcole + "/" + repertoire;
	//alert('g_RepTIRAGES_DateEcole + "/" + repertoire : ' + g_RepTIRAGES_DateEcole + "/" + repertoire);
	try {
		var copiefichierOriginal = TypeTraitement(unfichier, repertoire, false);
		//ON FAIT LA COPIE NORMALE !! (Ou pas si 0 - 5 sur Quattro !)	
		if (copiefichierOriginal != 'KO') {
			if(	(!isFichierExiste(unPathPlanche + "/" + unNomdePlancheWEB)) || (!isFichierExiste(unPathPlanche + "/" + unNomdePlancheWEBVariante)) ||  (isFichierIdentite(nomFichierPhoto) && (!isFichierExiste(unPathPlanche + "/" + unNomdePlancheWEBFiche)))  ){		
				var laPhoto = OuvrirPhotoSource(nomFichierPhoto); 	
				var reussiteTraitement = (laPhoto != null);
				reussiteTraitement = reussiteTraitement && CreerRepertoire(unPathPlanche);
				if (reussiteTraitement){
					// Pour avoir des planches homogenes dans le viewer de commandes					
					var myDocument = app.activeDocument; 
					//La sauvegarde ...	
					//SauvegardeJPEG(laPhoto, unPathPlanche + "/" + nomFichierPhoto);
					SauvegardeJPEG(laPhoto, unPathPlanche + "/" + unNomdePlancheWEB);
					
					// traitement de la variante =>N&B, Quattro, autres ?
					//var copiefichierVariante = TypeTraitement(unfichier, repertoire, true);
					var copiefichierVariante = TypeTraitement(unfichier, repertoire, true);					
					//alert ('copiefichierVariante ' + copiefichierVariante);
					if (copiefichierVariante != 'KO') {
						if (copiefichierVariante == 'WEB-QUATTRO'){
							//alert ('NextQuattro(nomFichierPhoto) ' + NextQuattro(nomFichierPhoto));
							laPhoto.close(SaveOptions.DONOTSAVECHANGES);
							
							laPhoto = OuvrirPhotoSource(NextQuattro(nomFichierPhoto)); 	
							reussiteTraitement = (laPhoto != null);								
						}
						if (reussiteTraitement){	
							myDocument = app.activeDocument; 	
							//////////////// TRANSFORMATIONS //////////////////////
							//alert ('g_RepSCRIPTSPhotoshop ' + g_RepSCRIPTSPhotoshop);
							reussiteTraitement = reussiteTraitement && Action_Script_PhotoshopPSP(copiefichierVariante);
							//alert ('copiefichierVariante ' + copiefichierVariante);
							//SauvegardeJPEG(laPhoto, unPathPlanche + "/" + unNomdePlanche);
							SauvegardeJPEG(laPhoto, unPathPlanche + "/" + unNomdePlancheWEBVariante);
							
							//WEB-PRESENTATION-FICHE	
							// if 1 ou 6
							if (isFichierIdentite(nomFichierPhoto) && (copiefichierVariante == 'WEB-QUATTRO'))
							{
								laPhoto.close(SaveOptions.DONOTSAVECHANGES);							
								laPhoto = OuvrirPhotoSource(NextQuattro(nomFichierPhoto)); 	
								reussiteTraitement = (laPhoto != null);
								if (reussiteTraitement){	
									myDocument = app.activeDocument; 	
									//////////////// TRANSFORMATIONS //////////////////////
									reussiteTraitement = reussiteTraitement && Action_Script_PhotoshopPSP('WEB-PRESENTATION-FICHE');
									SauvegardeJPEG(laPhoto, unPathPlanche + "/" + unNomdePlancheWEBFiche);
								}															
							}
						}	
					}
					laPhoto.close(SaveOptions.DONOTSAVECHANGES);
				}
				else {
					laPhoto.close(SaveOptions.DONOTSAVECHANGES);
				}			
			}					

		}
		
	}
	catch(err) {
		g_Erreur = "Commande  : " + g_CommandePDTEncours + " ERREUR CreerFichiersPresentationWEB pour : " + nomFichierPhoto;
		laPhoto.close(SaveOptions.DONOTSAVECHANGES);
		return "KO";
	}

	return valRetour;	
}

function TypeTraitement(unFichier, unRepertoire, isVariante){
	var retourval = g_CONFIGtypeConfigWeb;
	var numFichierIndiv = 0;
	
	if (g_CONFIGtypeConfigWeb == 'Rien') {retourval = 'KO';}
	else{
		if ((unFichier.length >= g_MinimuNomClasse) && !g_CONFIGisPhotosGroupes && isVariante) { 
		// Pas sur Groupe
				retourval = 'KO';
		}
		if ((unRepertoire.indexOf('Fratrie') > -1) && !g_CONFIGisPhotosFratrie && isVariante) { // Pas sur les Fratries ?
				retourval = 'KO';
		}
		else{
			//if ((unFichier.length <= g_MinimuNomClasse) && (g_CONFIGtypeConfigWeb != 'Rien')) { // Pas sur Groupe
			if ((unFichier.length <= g_MinimuNomClasse) && (g_CONFIGtypeConfigWeb == 'WEB-QUATTRO')) { // Pas sur Groupe
				numFichierIndiv = parseFloat(unFichier.slice(0,-4));	
				if (numFichierIndiv != NaN){				
					if (((numFichierIndiv % 5) == 0) && !((unRepertoire.indexOf('Fratrie') > -1) && !g_CONFIGisPhotosFratrie)){
						retourval = 'KO'; // on ne fait pas les 0 et 5 car ce sont des Quattrod !
					}					
				}				
			}
		}
	}	

	/*alert('numFichierIndiv ' + numFichierIndiv 
	+ ' isLesGroupe ' 	+ g_CONFIGisPhotosGroupes 
	+ ' isLesfratrie ' 	+ g_CONFIGisPhotosFratrie 
	+ ' unFichier ' + unFichier 
	+ ' isQuattro ' + isQuattro);*/
	return retourval;
}

function TypeTraitementOLD(unFichier, unRepertoire, isPlancheWEBVariante){
	//var pasLesGroupe = (traitement.substr(0,1) == 'I');
	//var pasLesFratries = (traitement.substr(1,1) != 'F');
	var retourval = g_CONFIGtypeConfigWeb;
	//var isQuattro = (g_CONFIGtypeConfigWeb == 'WEB-QUATTRO');
	var numFichierIndiv = 0;
	
	
	if ((unFichier.length >= g_MinimuNomClasse) && !g_CONFIGisPhotosGroupes && isPlancheWEBVariante) { 
	// Pas sur Groupe
			retourval = 'KO';
	}
	if ((unRepertoire.indexOf('Fratrie') > -1) && !g_CONFIGisPhotosFratrie && isPlancheWEBVariante) { // Pas sur les Fratries ?
			retourval = 'KO';
	}
	else{
		if ((unFichier.length <= g_MinimuNomClasse) && (g_CONFIGtypeConfigWeb != 'Rien')) { // Pas sur Groupe
			numFichierIndiv = parseFloat(unFichier.slice(0,-4));	
			if (numFichierIndiv != NaN){				
				if (((numFichierIndiv % 5) == 0) && !((unRepertoire.indexOf('Fratrie') > -1) && !g_CONFIGisPhotosFratrie)){
					retourval = 'KO';
				}					
			}				
		}
	}

	/*alert('numFichierIndiv ' + numFichierIndiv 
	+ ' isLesGroupe ' 	+ g_CONFIGisPhotosGroupes 
	+ ' isLesfratrie ' 	+ g_CONFIGisPhotosFratrie 
	+ ' unFichier ' + unFichier 
	+ ' isQuattro ' + isQuattro);*/
	return retourval;
}

function NextQuattro(unFichier){
	var retourval = '';
	var numFichierIndiv = 0;
	//alert ('unFichier  ' + unFichier);
	if ((unFichier.length <= g_MinimuNomClasse)) { // Pas sur Groupe
		numFichierIndiv = parseFloat(unFichier.slice(0,-4));	
		while ((numFichierIndiv % 5) != 0) {
			numFichierIndiv++;
		}			
	}
	retourval = ("0000" + numFichierIndiv).slice(-4) + '.jpg';
	//alert ( 'unFichier  ' + unFichier + ' Quattro ' + retourval);
	return retourval;
}

function isFichierIdentite(unfichier){
	var retourval = false;
	var numFichierIndiv = 0;
	//alert ('unfichier  ' + unfichier);
	if ((unfichier.length <= g_MinimuNomClasse)) { // Pas sur Groupe
		numFichierIndiv = parseFloat(unfichier.slice(0,-4));
		if ((numFichierIndiv % 5) == 1) {retourval = true;}	
	}
	return retourval;
}


function FichierIdentite(unfichier){
	var retourval = '';
	var numFichierIndiv = 0;
	//alert ('unfichier  ' + unfichier);
	if ((unfichier.length <= g_MinimuNomClasse)) { // Pas sur Groupe
		numFichierIndiv = parseFloat(unfichier.slice(0,-4));	
		while ((numFichierIndiv % 5) != 0) {
			numFichierIndiv++;
		}			
	}
	numFichierIndiv = numFichierIndiv - 4;
	retourval = ("0000" + numFichierIndiv).slice(-4) + '.jpg';
	//alert ( 'unfichier  ' + unfichier + ' Quattro ' + retourval);
	return retourval;
}

function twoDigit(n) {
  return (n < 10 ? '0' : '') + n
}

