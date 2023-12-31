<?php
//include 'CConnexionLOCAL.php';
include_once 'APIConnexion.php';
include_once 'CATFonctions.php';
//AMP ?
$codeMembre = false;
if (isset($_POST['codeMembre']) ){
	$codeMembre = $_POST['codeMembre'];
}
if (isset($_GET['codeMembre'])) { // Test connexion l'API
	$codeMembre = $_GET['codeMembre'];
}
//DEBUG ?NBPlanchesFichierLab

$isDebug = file_exists ('../debug.txt');
if ($isDebug) echo 'MODE DEBUG';
//else echo 'MODE NORMAL'; 

if (isset($_POST['isDebug']) ){
	$isDebug = ($_POST['isDebug'] == 'Debug');
}
if (isset($_GET['isDebug'])) { // Test connexion l'API
	$isDebug = ($_GET['isDebug'] == 'Debug');
}
$CodeEcole = '';
$AnneeScolaire = '';

if (isset($_GET['CodeEcole'])) { $CodeEcole = $_GET['CodeEcole'];}
if (isset($_GET['AnneeScolaire'])) { $AnneeScolaire = $_GET['AnneeScolaire'];}

$PDTNumeroLigne = 0;
$PDTDenomination = $InviteNomProduit;


if (isset($_GET['PDTDenomination'])) { $PDTDenomination = $_GET['PDTDenomination'];}
if (isset($_POST['PDTDenomination'])) { $PDTDenomination = $_POST['PDTDenomination'];}
if (isset($_GET['PDTNumeroLigne'])) { $PDTNumeroLigne = $_GET['PDTNumeroLigne'];}
if (isset($_POST['PDTNumeroLigne'])) { $PDTNumeroLigne = $_POST['PDTNumeroLigne'];}

$PDTCodeScripts = '(facultatif)_(facultatif)_facultatif)_(facultatif)';
if (isset($_GET['PDTCodeScripts'])) { $PDTCodeScripts = $_GET['PDTCodeScripts'];}
if (isset($_POST['PDTCodeScripts'])) { $PDTCodeScripts = $_POST['PDTCodeScripts'];}
$PDTCodeScripts = str_replace('(facultatif)','', $PDTCodeScripts) ;

$monProjetSource = new CProjetSource($CodeEcole, $AnneeScolaire); 

//MAJFichierCatalogue
if (!isset($_GET['isImport'])) { // 15-10 Sauf dans le cas d'un IMPORT !!
	if ((isset($_GET['PDTNumeroLigne'])) || (isset($_POST['PDTNumeroLigne']))) { 
		MAJFichierCatalogue($monProjetSource,$PDTNumeroLigne,$PDTDenomination,$PDTCodeScripts);
		header('Location: CMDCatalogueProduits.php'. ArgumentURL() .'&CodeEcole='.$CodeEcole.'&AnneeScolaire='.$AnneeScolaire );
	}	
} 



$maConnexionAPI = new CConnexionAPI($codeMembre, $isDebug, 'CATPhotolab');

$EnteteHTML = 
    '<!DOCTYPE html>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <html>
    <head>
	<title id="PHOTOLAB">PhotoLab étape suivante ...</title>
	<link rel="stylesheet" type="text/css" href="'. strMini('css/Couleurs'.($isDebug?'DEBUG':'PROD').'.css') . '">
    <link rel="stylesheet" type="text/css" href="'. strMini("css/APIDialogue.css") . '">
	<link rel="shortcut icon" type="image/png" href="img/favicon.png"/>
    </head>
    <body>
	';
	
$BotomHTML = '
    </body>
    </html>';

$DebutMessageBox = // N'est utilisé que pour API_UIConfirmation ??
'<div id="apiReponse" class="modal">
	<div class="modal-content animate" >
		<div class="imgcontainer">
			<a href="CATPhotolab.php' . ArgumentURL() .'" class="close" title="Annuler et retour écran général des commandes">&times;</a>
			<img src="img/Logo.png" alt="Image de fichier" class="apiReponseIMG">
		</div>';
		

	
if (isset($_GET['apiTEST'])) { // Test connexion l'API
    echo API_TEST($_GET['apiTEST']);
} 
elseif (isset($_GET['apiCMDLAB'])) { // Renvoie les planches à générer du fichier lab en parametre
    echo API_GetCMDLAB($_GET['apiCMDLAB']);
} 
elseif (isset($_GET['apiFILELAB'])) { // Renvoie un fichier lab (De .lab a lab0)????
    echo API_GetFILELAB($_GET['apiFILELAB']);
} 
elseif (isset($_GET['apiUI_SELECTFILELAB'])) { // Formulaire de selection d'un fichier lab a enregistrer
	echo $EnteteHTML . API_UISelectFILELAB($_GET['apiUI_SELECTFILELAB']) . $BotomHTML;	
}
elseif (isset($_GET['apiUI_CONFIRMEtat']) && isset($_GET['apiEtat'])) {       
	echo $EnteteHTML . API_UIConfirmation($_GET['apiUI_CONFIRMEtat'], $_GET['apiEtat']) . $BotomHTML;	
}
elseif (isset($_GET['apiFichierChgEtat']) && isset($_GET['apiEtat'])) { 
	ChangeEtat($_GET['apiFichierChgEtat'], $_GET['apiEtat']);
} 
elseif (isset($_GET['apiCMDEnCours'])) { 
	$isImport = false;
	if (isset($_GET['isImport'])) { $isImport = ($_GET['isImport']=='true');} 	
	echo $EnteteHTML . Etape_20($_GET['apiCMDEnCours'], $isImport). $BotomHTML;	
} 
elseif (isset($_GET['apiDemandeNOMImpression'])) { 
	echo $EnteteHTML . Etape_30($_GET['apiFichierChgEtat']). $BotomHTML;	
} 
elseif (isset($_GET['apiInfoMiseEnPochette'])) { 
	echo $EnteteHTML . Etape_40($_GET['apiFichierChgEtat']). $BotomHTML;	
}
elseif (isset($_GET['apiInfoExpeditionArchivage'])) { 
	echo $EnteteHTML . Etape_50($_GET['apiFichierChgEtat']). $BotomHTML;	
} 
elseif (isset($_GET['versionDistante'])) { 
	echo $EnteteHTML . Etape_60($_GET['versionDistante']). $BotomHTML;	
} 
elseif (isset($_FILES['fileToDrop'])) {
	echo API_DropFILELAB();
}
elseif (isset($_POST['lesRecommandes']) ){    //TitreNomTirage
	if ($isDebug){echo 'VOILA LES RECO  pour : ' . $_POST['leFichierOriginal']  . ' : ' . $_POST['lesRecommandes'];	}	
	echo $EnteteHTML . ETAPE_01(true) . $BotomHTML;	

}
elseif (isset($_POST['lesCmdesLibres']) ){
	if ($isDebug){
		echo 'VOILA LES COMAMNDES LIBRES  pour : '  . $_POST['lesCmdesLibres'];
	}	
	echo $EnteteHTML . ETAPE_01(false, $_POST['apiNomTirage']) . $BotomHTML;	

}/*
elseif (isset($_FILES["myfile"]["tmp_name"]) ){
	if(is_uploaded_file($_FILES["myfile"]["tmp_name"])) { // Recup le fichier lab uploadé
			echo $EnteteHTML . API_PostFILELAB() . $BotomHTML;
		} 	
}
*/
else echo '<br>Rien à Afficher pas de parametres ?! !';		

///////////////////////////////////////////////////////////////
///////////// Les Fonctions selon les cas ...  ////////////////
///////////////////////////////////////////////////////////////

/* Supression LE 18 Fev 2022 
function API_GetCMDLAB($strAPI_CMDLAB){
	if ($strAPI_CMDLAB == "TEST"){
		return "OK";
	}
	else {
		$GLOBALS['repCMDLABO'] = "CMDLABO/";
		if (file_exists($GLOBALS['repCMDLABO'] . $strAPI_CMDLAB)){
			$strCMDLabo = RecupPlanchesFichierLab($GLOBALS['repCMDLABO'] . $strAPI_CMDLAB);
			return 'OK' . $strCMDLabo;
		}
		else {
			return " le fichier " .$GLOBALS['repCMDLABO'] . $strAPI_CMDLAB . " est manquant !";
			return "APIPhotoLab : erreur 33";
		}		
	}
}
*/


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
function ETAPE_01($isRecommandes, $TitreNomTirage = '') {// Function Pour Enregistrer les recomamndes Ou Commande Libres
	//$target_file_seul = MAJRecommandes($_POST['leFichierOriginal'], $_POST['lesRecommandes']);	
	if ($isRecommandes){
		$FichierOriginal = $_POST['leFichierOriginal'];
		$strTabCMD = $_POST['lesRecommandes'];
		$target_file_seul = MAJRecommandes($FichierOriginal, $strTabCMD);
		$Titre ='ENREGISTRER RECOMMANDE(S)';
	}
	else{
		$InfoSource ='@8888-88-88_COMMANDES LIBRES : ' . $TitreNomTirage . ' sur ' . DECODE_Utf8($_GET['BDDRECFileLab']). '_' .$_GET['CodeEcole']. '_' .$_GET['AnneeScolaire']. '_Ecole web !@';

		$strTabCMD = $_POST['lesCmdesLibres'];
		if($GLOBALS['isDebug']){
				echo 'VOILA LES COMAMNDES LIBRES  pour : '  . $strTabCMD;
			}	
		$target_file_seul = MAJCommandesLibres($InfoSource, $strTabCMD, $TitreNomTirage);
		$Titre ='ENREGISTRER COMMANDE(S) LIBRE(S)';
	}

	unset($_POST);	
	
	$target_fichier = $GLOBALS['repCMDLABO'] . $target_file_seul;

	$retourMSG = 
	'<div id="apiReponse" class="modal">
		<div class="modal-content animate" >
			<div class="imgcontainer">
				<a href="CATPhotolab.php' . ArgumentURL() .'" class="close" title="Annuler et retour écran général des commandes">&times;</a>				
			</div>
			<h1><img src="img/AIDE.png" alt="Aide sur l\'étape" > Etape 1 : Enregistrer les fichiers "produits" à Créer.</h1>';
	
			$retourMSG .= '<table width="100%">
			<tr>
				<td >';	
				// A REMETTRE !!! 
				$monGroupeCmdes = new CGroupeCmdes($target_fichier);

				$retourMSG .= '	<div class="Planchecontainer">
				<h1>COMMANDES EN COURS</h1>';
				//$retourMSG .= $monGroupeCmdes->tabCMDLabo;	

				// A REMETTRE !!! 
				$retourMSG .= $monGroupeCmdes->AffichePlancheAProduire(); 

				$retourMSG .= '</div>';
			$retourMSG .= '</td>
							<td >';	
			$retourMSG .= '	<div class="msgcontainer">';
			
			$retourMSG .= '<h4>'.$Titre.'</h4>';			
			$retourMSG .= '<img src="img/Logo.png" alt="Image de fichier" width="25%">';	
			if (file_exists($target_fichier)){
				$CMDhttpLocal ='';
				
				$mesInfosFichier = new CINFOfichierLab($target_fichier); 
				$mesInfosFichier->MAJResumeFichierCommandes();	
				//$CMDAvancement ='';
				
				//$Compilateur = '';				
				$NBPlanches = $mesInfosFichier->NbPlanches;
		
				$retourMSG .= '<h3><br>Il y a : '. $mesInfosFichier->NbPlanches . ' planches a créer.<br><br>';				
				$retourMSG .= 'Les commandes sont sauvegardées dans : <br><br>' . substr($mesInfosFichier->Fichier, 0,-5);	 $mesInfosFichier->Fichier;
				$retourMSG .= '</h3>';	
				//$NBPlanches = INFOsurFichierLab($target_file, $CMDAvancement, $CMDhttpLocal, $Compilateur);
				//echo "Apres move_uploaded_file";
				$CMDhttpLocal = '&CMDdate=' . substr($mesInfosFichier->Fichier, 0, 10);	
				$CMDhttpLocal .= '&CMDnbPlanches=' . $NBPlanches;
				
				if (!$isRecommandes){
					$CMDhttpLocal .= '&CodeEcole='.$_GET['CodeEcole'].'&AnneeScolaire='.$_GET['AnneeScolaire'].'&Side=OK';
				}
				

				$CMDhttpLocal .= '&BDDFileLab=' . urlencode(ENCODE_Utf8(substr(basename($mesInfosFichier->Fichier),0,-1) ));	 // Il faut enlever le "0" de .lab pour demander anregistrement !								
	
				$retourMSG .= '<br><br>';
						
				if ($isRecommandes){
					$CMDhttpLocal .= '&fichierLAB=' . $FichierOriginal;	
					$retourMSG .= '<a href="' . $GLOBALS['maConnexionAPI']->CallServeur($CMDhttpLocal,'CMDRecherche') . '" class="OK" title="Valider et retour écran précédent">OK</a>';		
				}else{
					$retourMSG .= '<a href="' . $GLOBALS['maConnexionAPI']->CallServeur($CMDhttpLocal,'CMDAfficheSource') . '" class="OK" title="Valider et retour écran précédent">OK</a>';
				}					
				$retourMSG .= '<br><br>';									
			}
			else{
				$retourMSG = "APIPhotoLab : Erreur " . $target_fichier . " est manquant !";
			}	

			$retourMSG .= ' </div>';	
			$retourMSG .= '</td>
			</tr>

		 </table>	';	
	  
	$retourMSG .= '
		</div>
	</div>';	
	return $retourMSG;	
}

function Etape_20($strAPI_fichierLAB, $isImport = false){ // Mesage il faut compiler !


	
	$target_file = $GLOBALS['repCMDLABO'].$strAPI_fichierLAB;
	$ProduitsManquant = 0;
	$Bilan = BilanScriptPhotoshop($target_file,$ProduitsManquant);	
	
	$retourMSG = 
	'<div id="apiReponse" class="modal">
		<div class="modal-content animate" >
			<div class="imgcontainer">';
			$retourMSG .= '<table>';			
	if($isImport){		
		$retourMSG .= '<a href="index.php' . ArgumentURL() . '&apiSupprimer=' . urlencode($strAPI_fichierLAB) .'" class="close" title="Annuler et retour écran général des commandes">&times;</a>';
	}else{
		$retourMSG .= '<a href="CATPhotolab.php' . ArgumentURL() .'" class="close" title="Annuler et retour écran général des commandes">&times;</a>';
	}				
	$retourMSG .= '</div>';
	if($isImport){		
		$retourMSG .= '<h1><img src="img/AIDE.png" alt="Aide sur l\'étape" > Etape 1 : Vérification des scripts et fichiers source pour ';
	}else{
		$retourMSG .= '<h1><img src="img/AIDE.png" alt="Aide sur l\'étape" > Etape 2 : Créer la commande : ';
	}	
			
	if ($GLOBALS['isDebug']){echo 'Etape_20    strAPI_fichierLAB : ' . $strAPI_fichierLAB  . ' isImport : ' . $isImport;	}	


			$retourMSG .= '<font size="-1">'.ENCODE_Utf8($strAPI_fichierLAB).'</font></h1>';	
			
	
			$retourMSG .= '<table>
			<tr>
				<td width="70%">';	
				$retourMSG .= '	<div class="Planchecontainer">';

				$retourMSG .= '<h1>1) Vérification des scripts Photoshop</h1>';
				$retourMSG .= $Bilan;

				//echo $ProduitsManquant;
	


			$mesInfosFichier = new CINFOfichierLab($target_file); 
			$mesInfosFichier->MAJResumeFichierCommandes();

			$retourMSG .= '</div>';
			$retourMSG .= '</td>
							<td width="30%">';	
			$retourMSG .= '	<div class="msgcontainer">';

			$retourMSG .= '<h1>2) Vérification des photos  "Sources"</h1>'; 
			$retourMSG .= '<div style="padding-left:20px">'.PhotosManquantes($target_file).'</div>';  

			$retourMSG .= "<h1>3) Créer les planches de la commande</h3>"  ;
			$retourMSG .= "<h3>".ENCODE_Utf8(substr($strAPI_fichierLAB,0,-1))."</h3>";
			if($ProduitsManquant>0){
				$retourMSG .= '<h3>Vous ne pouvez pas créer votre commande, car un ou plusieurs produits de la commande ne sont pas définis!</h3>';
				$retourMSG .= "<h2>Corrigez les erreurs de produit</h2>";
	
				$retourMSG .= '<h3>cliquez sur le crayon en face le produit en rouge pour editer le produit</h3>';
			}else{
				$retourMSG .= "<h2>Démarrez le plug-in PhotoLab pour Photoshop</h2>";
				$retourMSG .= '<img src="img/LogoPSH.png" alt="Image de fichier" width="25%">';
				$retourMSG .= '<h3>Le plug-in PhotoLab (PLUGIN-PhotoLab.jsxbin) se trouve dans le dossier : /PhotoLab/Code</h3><br>';
			}

			$retourMSG .= '<br><br>';
			if($ProduitsManquant == 0){
				if($isImport){
					$CMDhttpLocal = '&CMDdate=' . substr($mesInfosFichier->Fichier, 0, 10);	
					$CMDhttpLocal .= '&CMDnbPlanches=' . $mesInfosFichier->NbPlanches;
					$CMDhttpLocal .= '&BDDFileLab=' . urlencode(ENCODE_Utf8(basename(substr($mesInfosFichier->Fichier,0,-1))));	
					$retourMSG .= '<a href="' . $GLOBALS['maConnexionAPI']->CallServeur($CMDhttpLocal) . '" 
					class="OK" title="Valider et Retour écran général des commandes">OK</a>';					
				}else{
					$retourMSG .= '<a href="'.($ProduitsManquant>0?"#":"CATPhotolab.php" . ArgumentURL()).'" 
					class="OK" title="Valider et Retour écran général des commandes">OK</a>';
				}
			}
			$retourMSG .= '<br><br><br>';
			$retourMSG .= ' </div>';	
			$retourMSG .= '</td>
			</tr>

		 </table>	';	
	
	
	
	  
	$retourMSG .= '
		</div>
	</div>';	
	return $retourMSG;
}

function Etape_30($leFichierLab){ // API_DemandeNOMComamnde(){
	$retourMSG = 
	'<div id="apiReponse" class="modal">
		<div class="modal-content animate" >
			<div class="imgcontainer">
				<a href="CATPhotolab.php' . ArgumentURL() .'" class="close" title="Annuler et retour écran général des commandes">&times;</a>
				
			</div>
			<h1><img src="img/AIDE.png" alt="Aide sur l\'étape" >	Etape 3 : Imprimer les fichiers de la commande en cours</h1>';	
	
			$retourMSG .= '<table>
			<tr>
				<td width="50%">';	
	$mesInfosFichier = new CINFOfichierLab($GLOBALS['repCMDLABO'] . $leFichierLab); 
	$mesInfosFichier->MAJResumeFichierCommandes();		
	$NBPlanches = $mesInfosFichier->NbPlanches;	
		$retourMSG .= '	<div class="Planchecontainer">
		<h1>COMMANDES EN COURS -> ' . $mesInfosFichier->NbPlanches.' Planches</h1>';
		$monGroupeCmdes = new CGroupeCmdes($GLOBALS['repCMDLABO'] . $leFichierLab);

		//$retourMSG .= $monGroupeCmdes->tabCMDLabo;	
		$retourMSG .= $monGroupeCmdes->AffichePlancheAProduire(); 
		$retourMSG .= '</div>';
	$retourMSG .= '</td>
					<td>';	

	$retourMSG .= '	<div class="msgcontainer">';
	$retourMSG .=  "<h1>nom de votre commande</h1>";	
	$retourMSG .=  "<h3>(C'est aussi le nom du dossier de tirage, structuré par format d'impression)</h3>";
	


	//$AncienNom = ($leFichierLab != $GLOBALS['FichierDossierRECOMMANDE'] . '.lab2' )? substr($leFichierLab,11,-5) :'';
	if (substr($leFichierLab,0,-5) == $GLOBALS['FichierDossierRECOMMANDE']){
		$AncienNom = '';
		$DateCommande = date('Y-m-d') ; 
		$CMDhttpLocal = '&CMDdate=' . $DateCommande;	
	}
	elseif (substr($leFichierLab,0,-5) == $GLOBALS['FichierDossierCMDESLIBRE']){
		$AncienNom = '';
		$DateCommande = date('Y-m-d') ; 
		$CMDhttpLocal = '&CMDdate=' . $DateCommande;	
	}
	else{
		$AncienNom = substr($leFichierLab,11,-5);
		$DateCommande = substr($leFichierLab,0,10); ; 
		$CMDhttpLocal = '&CMDdate=' . $DateCommande;		
	}
	//$AncienNom = ($leFichierLab != $GLOBALS['FichierDossierRECOMMANDE'] . '.lab2' )? substr($leFichierLab,11,-5) :'';

	
	$CMDhttpLocal .= '&CMDnbPlanches=' . $NBPlanches;
	$CMDhttpLocal .= '&BDDFileLab='. ENCODE_Utf8($leFichierLab) ;	 // Il faut enlever le "0" de .lab pour demander anregistrement !
	
	$ActionServeur = $GLOBALS['maConnexionAPI']->CallServeur($CMDhttpLocal) ;	

	if ($GLOBALS['isDebug']){
		$retourMSG .= ' <br>->Ancien nom de fichier : ' . $leFichierLab;	
		$retourMSG .= '<br>->Fichier  ' . $mesInfosFichier->Fichier;
		$retourMSG .= '<br>->NbPlanches  ' . $mesInfosFichier->NbPlanches;		//echo 'sdf ';
		echo $ActionServeur;
	}		
	$retourMSG .=  "<h3>Ajustez le nom de votre commande, ci dessous :</h3>";
	$retourMSG .= '<form  action="' . $ActionServeur .'" method="post">';

	$retourMSG .= '<h4>'. $DateCommande .'-'; 
	

	$retourMSG .= '<input type="text" id="zoneTexteNomCommande" placeholder="Nom de votre commande..." value="'.$AncienNom.'" name="apiNomCommande" required>
	</h4>
	<h3><img src="img/DossierOK.png" alt="Image pour Dossier tirage" ><br><br>
	Retrouvez facilement le dossier à transmettre à votre machine d\'impression ou à votre imprimeur, 
	en cliquant sur cette icône, dans l\'écran des commandes en cours.
	</h3>
	<br><br>
	<a href="CATPhotolab.php' . ArgumentURL() .'" class="KO" title="Annuler">Annuler</a>
	<button type="submit" class="OK">OK</button>
		
    </div>

  </form>';


	$retourMSG .= '<br>';

	$retourMSG .= '
		</div>	  
	</div>
</div>';	
$retourMSG .= '</td>
		</tr>

	 </table>	';	

	return $retourMSG;
	
}

function Etape_40($leFichierLab){ // API information Mise en cartonange sauve USB...
	$retourMSG = 
	'<div id="apiReponse" class="modal">
		<div class="modal-content animate" >
			<div class="imgcontainer">
				<a href="CATPhotolab.php' . ArgumentURL() .'" class="close" title="Annuler et retour écran général des commandes">&times;</a>
				
			</div>

			<h1><img src="img/AIDE.png" alt="Aide sur l\'étape" > Etape 4 : mise en pochette des commandes en cours</h1>';
	
			$retourMSG .= '<table>
			<tr>
				<td width="50%">';	

		$retourMSG .= '	<div class="Planchecontainer">
		<h1>COMMANDES EN COURS</h1>';
		$monGroupeCmdes = new CGroupeCmdes($GLOBALS['repCMDLABO'] . $leFichierLab);

		//$retourMSG .= $monGroupeCmdes->tabCMDLabo;	
		$retourMSG .= $monGroupeCmdes->AfficheCommandesAProduire(); 
		$retourMSG .= '</div>';
	$retourMSG .= '</td>
					<td>';	

	$retourMSG .= '	<div class="msgcontainer">';
	$retourMSG .= '<h4>'. substr($leFichierLab,0,-5) .'</h4>';
	//$retourMSG .=  "<h1>Mise en pochette des photos</h1>";	
	$retourMSG .=  '<h3>Vous pouvez enregistrer la page de mise en pochette. 
	<br><br><img src="img/4-Etat.png" alt="Mise en pochette" ><br><br>
	Pour enregistrer la page de mise en pochette, allez sur la page de mise en pochette, faites  <STRONG>Ctrl + s</STRONG> 
	et choisissez de l\'enregistrer sur un clé USB par exemple...<br><br>
	Cela vous permettra de faire le cartonnage avec n\'importe quel autre ordinateur...</h3>';	
	
	$ActionServeur = $GLOBALS['maConnexionAPI']->CallServeur('&apiFichierChgEtat='. urlencode($leFichierLab) .'&apiEtat=4' ) ;	

	if ($GLOBALS['isDebug']){
		echo 'DDDDDDDDDD    ' .$ActionServeur;
	}		

	$retourMSG .= '<form  action="' . $ActionServeur .'" method="post">';

	 


	$retourMSG .= '<br><br><br>
		<a href="CATPhotolab.php' . ArgumentURL() .'" class="KO" title="Valider et retour écran général des commandes">Annuler</a>
		<button type="submit" class="OK">OK</button>
    </div>

  </form>';


	$retourMSG .= '<br>';

	$retourMSG .= '
		</div>	  
	</div>
</div>';	
$retourMSG .= '</td>
		</tr>

	 </table>	';	

	return $retourMSG;
	
}

function Etape_50($leFichierLab){ // API_DemandeNOMComamnde(){
	$retourMSG = 
	'<div id="apiReponse" class="modal">
		<div class="modal-content animate" >
			<div class="imgcontainer">
				<a href="CATPhotolab.php' . ArgumentURL() .'" class="close" title="Annuler et retour écran général des commandes">&times;</a>
				
			</div>
			<h1><img src="img/AIDE.png" alt="Aide sur l\'étape" > Etape 5 : Expédier les commandes à vos clients : Ecoles, familles,...</h1>';
			$retourMSG .= '<table>
			<tr>
				<td width="50%">';	

		$retourMSG .= '	<div class="Planchecontainer">
		<h1>Commandes prêtes à expédier</h1>';
		$monGroupeCmdes = new CGroupeCmdes($GLOBALS['repCMDLABO'] . $leFichierLab);

		//$retourMSG .= $monGroupeCmdes->tabCMDLabo;	
		$retourMSG .= $monGroupeCmdes->AfficheCommandesAProduire(); 
		$retourMSG .= '</div>';
	$retourMSG .= '</td>
					<td>';	

	$retourMSG .= '	<div class="msgcontainer">';
	$retourMSG .=  "<h1>Expédition de vos commandes photos</h1>";	
	$retourMSG .=  "<h3>➔ Par colis en livraison (La Poste, ou autres...)</h3>";
	$retourMSG .=  "<h3>➔ En livraison directe, c'est près de chez vous !</h3>";
	$retourMSG .=  "<h3>➔ Le client vient lui même chercher ses commandes (Plus rare)</h3>";
	$retourMSG .=  "<br><br>";
	$ActionServeur = $GLOBALS['maConnexionAPI']->CallServeur('&apiFichierChgEtat='. urlencode($leFichierLab) .'&apiEtat=5' ) ;	

	if ($GLOBALS['isDebug']){
		echo $ActionServeur;
	}		

	$retourMSG .=  '<h3>Cette action va archiver votre commande comme traitée et expédiée.
	<br><br>Les fichiers photos grand format, destinés à l\'impression seront supprimés, en effet ils ne serviront plus. 
	<br><br>En outre, cela liberera de la place sur votre disque dur!
	<br><br>Vous pourrez toujours la consulter ultérieurement dans l\'historique des commandes expediées :</h3>';
	
	$retourMSG .=  '<br><br><img src="img/menuBouton3.png" alt="Image Historique" >';

	$retourMSG .= '<form  action="' . $ActionServeur .'" method="post">';

	$retourMSG .= '<h4>'. substr($leFichierLab,0,-5) .'</h4>'; 


	$retourMSG .= '<br>
		<a href="CATPhotolab.php' . ArgumentURL() .'" class="KO" title="Valider et retour écran général des commandes">Annuler</a>
		<button type="submit" class="OK">Archiver</button>
    </div>

  </form>';


	$retourMSG .= '<br>';

	$retourMSG .= '
		</div>	  
	</div>
</div>';	
$retourMSG .= '</td>
		</tr>

	 </table>	';	

	return $retourMSG;
	
}

function Etape_60($NouvelleVersion){ // IL YA UNE MISE A JOUR    $GLOBALS['VERSIONLOCAL'] < $NouvelleVersion
	$retourMSG = 
	'<div id="apiReponse" class="modal">
		<div class="modal-content animate" >

			<h1><img src="img/AIDE.png" alt="Aide sur l\'étape" >Mise à jour de PhotoLab version ' . $NouvelleVersion .
			
			'<a href="MAJPhotoLab.php' . ArgumentURL('&versionDistante='. $NouvelleVersion) .'" class="OK" title="ok">OK</a></h1>';


	$retourMSG .= '<br>';

	$retourMSG .= '
		</div>	  
	</div>
</div>';	


	return $retourMSG;
	
}


function API_GetFILELAB($strAPI_FILELAB){
	$GLOBALS['repCMDLABO'] = "CMDLABO/";
	if (file_exists($GLOBALS['repCMDLABO'] . $strAPI_FILELAB)){
		$strCMDLabo = RecupFichierLabTotal($GLOBALS['repCMDLABO'] . $strAPI_FILELAB);
		return 'OK' . $strCMDLabo;
	}
	else {
		return " le fichier " .$GLOBALS['repCMDLABO'] . $strAPI_FILELAB . " est manquant !";
		return "APIPhotoLAb : erreur 55";
	}		
}

function API_DropFILELAB() {//upload de fichier
	$sFileName = $_FILES['fileToDrop']['name'];
	$sFileSize = bytesToSize1024($_FILES['fileToDrop']['size']);
	$target_file = '../CMDLABO/' . $_FILES['fileToDrop']['name']."0";
	move_uploaded_file($_FILES['fileToDrop']['tmp_name'], $target_file);	
	
	$NBPlanches = ($target_file);
	//echo "Apres move_uploaded_file";
	$CMDhttpLocal = '&CMDdate=' . substr($sFileName, 0, 10);	
	$CMDhttpLocal = $CMDhttpLocal . '&CMDnbPlanches=' . $NBPlanches;
	$CMDhttpLocal = $CMDhttpLocal . '&BDDFileLab=' . urlencode(basename($sFileName));	
	
	echo '
	<div class="dropAreaRESULT">
		<p>La commande : ' . $sFileName .' a été correctement transférée. </p>
		<p> => Taille : '.$sFileSize.'</p>';

	//echo $CMDhttpLocal ;
	$maLocation = $GLOBALS['maConnexionAPI']->CallServeur($CMDhttpLocal);
	echo $maLocation;
	echo '</div>';
	header('Location: ' .$maLocation); /**/
}


function bytesToSize1024($bytes) {
	$unit = array('B','KB','MB');
	return @round($bytes / pow(1024, ($i = floor(log($bytes, 1024)))), 1).' '.$unit[$i];
}

function API_UISelectFILELAB($strAPI_SelectFILELAB){
	$Formulaire =
	'<!-- UPLOAD FILE -->
	<div id="apiReponse" class="modal">
	  <form class="modal-content animate" action="APIDialogue.php" method="post" enctype="multipart/form-data">
		<div class="imgcontainer">
				<a href="../index.php" class="close" title="Annuler et retour écran général des commandes">&times;</a>
				<img src="img/Logo-Go-PhotoLab-Catalog.png" alt="Image de fichier" class="apiReponseIMG">
		  <br><br><h1>Gestionnaire de tirages photos</h1>
		  <h3>Integration d\'un fichier ".lab ou .web"</h3>
		  <input type="text" id="isDebug" name="isDebug" value="' . ($GLOBALS['isDebug']== true ?'Debug':'Prod') . '"/>
		</div>
		<div class="container">
			<div class="Select-bouton-wrapper">
				<button class="Selectbtn">Selectionne un fichier .lab ou .web</button>
				<input  type="file" accept=".lab, .web" class="upload" name="myfile" id="myfile">
				<br>
			</div>
			<input id="SelectUploadFiles"  class="SelectUploadFiles" disabled="disabled" value="aucun fichier">
			<button type="submit">Envoie dans le gestionnaire</button>
		</div>
	  </form>
	</div>
	<script>
	document.getElementById("myfile").onchange = function () {
	document.getElementById("SelectUploadFiles").value = this.value.substring(12);
};
	</script>
	';
	return $Formulaire;
}

function API_UIConfirmation($strAPI_fichierLAB, $Etat){
	$retourMSG = $GLOBALS['DebutMessageBox'];
	$retourMSG .= '	<div class="msgcontainer">';
	switch ($Etat) {
	case "1":
		$retourMSG .= "<br><h3>Les planches sont crées.<br><br><br></h3>";
		break;		
	case "2":
		$retourMSG .= "<br><h3>Les planches ont été envoyés au laboratoire ?<br><br><br></h3>";
		break;
	case "3":
		$retourMSG .= "<br><h3>Les photos sont tirées au laboratoire ?<br><br><br></h3>";
		break;		
	case "4":
		$retourMSG .= "<br><h3>Les photos sont mise en carton. Fin<br><br><br></h3>";
		break;	
	}

	$retourMSG .=  "<br><h1>".ENCODE_Utf8(substr($strAPI_fichierLAB,0,-5))."</h1>";
	
	
	if ($GLOBALS['isDebug']){$retourMSG = $retourMSG . "<br><h3>".$Etat." (en Debug)<br><br></h3>";}
	$retourMSG = $retourMSG . "<br><h3>Si oui valider !</h3><br>";

	$CMDhttpLocal = '?codeMembre=' . $GLOBALS['codeMembre'] . '&isDebug=' .($GLOBALS['isDebug'] ? 'Debug' : 'Prod');
	$CMDhttpLocal = $CMDhttpLocal . '&apiFichierChgEtat='. urlencode(ENCODE_Utf8($strAPI_fichierLAB)) .'&apiEtat=' . $Etat;
	
	$retourMSG .= '<br><br>
		<a href="../index.php" class="KO" title="Valider et retour écran général des commandes">Annuler</a>
		<a href="' . $GLOBALS['maConnexionAPI']->CallServeur($CMDhttpLocal) . '" class="OK" title="Valider et retour écran général des commandes">Valider</a>		
			<br><br><br>';

	$retourMSG .= '
		</div>	  
	</div>
</div>';	
	return $retourMSG;
	
}
	
?>