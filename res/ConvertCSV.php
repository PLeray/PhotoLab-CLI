<?php
/*include 'CataloguePdtWEB.php';*/

$ProduitsNONLABO = array(
'15x39cm_CADRE-PANO',
'10x15cm_TAPIS-SOURIS'
);

$CataloguePdtWEB = array();


$Ecole_EnCOURS = '';
$Client_EnCOURS = '';
$ProduitPhoto_EnCOURS = '';
	
$TabResumeProduit = array();
$TabResumeFormat = array();

//echo ConvertirCMDcsvEnlab($TabCSV, 'EcoleWEB.csv');

function ConvertirCMDcsvEnlab(&$TabCSV, $fichierCSV, &$target_file)
{
	$TabCSV = array();
	//$CataloguePdtWEB = csv_to_array('res/CatalogueProduits.csv', ';');
	//$GLOBALS['CataloguePdtWEB'] = csv_to_array('res/CatalogueProduits.csv', ';');
	$GLOBALS['CataloguePdtWEB'] = csv_to_array('../CatalogueProduits.csv', ';'); // New 22-10
	//var_dump( $GLOBALS['CataloguePdtWEB']) ;
	echo '<br><br>';
	$TabCSV = csv_to_array($fichierCSV, ';');
	$isCMDUnique = is_numeric(substr($target_file ,-11,-5));
	$PrefixeTirage = '';
	// A Sup
	//var_dump( $TabCSV[0]) ;
	// A Sup
	
	if ($isCMDUnique){
		$NumCMD = substr($target_file ,-11,-5) ;
		$target_file = date("Y-m-d") . '-SOLO-WEB-Commande(' . $NumCMD . ').lab0';
		$PrefixeTirage = '(CMD-' . $NumCMD . ') ';
	}
	else{
		if ($TabCSV[0]["Type"] == 'groupee'){
			$target_file = date("Y-m-d") . '-L2-WEB-' . SUPRAccents($TabCSV[0]["Nom de l'ecole"]) . '-' . $TabCSV[0]["Ville ecole"] . '.lab0';	
			$PrefixeTirage = 'L2-';			
		}else { 
			if ($TabCSV[0]["Type"] == 'isolee'){
				$target_file = date("Y-m-d") . '-WEB-Commandes Isolees'. '.lab0';
				$PrefixeTirage = '(ISOLEES) ';		
			}
			else{
				$target_file = 'Erreur';	
			}
		}	
	}
	$affiche_Tableau = '';
	if ($target_file != 'Erreur'){
		foreach ($TabCSV as $key => $row) {
			$NumCommande[$key] = $row['Num de commande'];
			$NomProjet[$key] = $row['Nom du projet'];
			$NomClasse[$key] = $row['Classe'];
		}
		//$NumCommande = array_column($TabCSV, "Num de commande");
		//array_multisort($NumCommande, SORT_ASC, $TabCSV);
		// Ancien Tri : array_multisort($NomProjet, SORT_ASC, $NumCommande, SORT_ASC, $TabCSV);
		array_multisort($NomProjet, SORT_ASC, $NumCommande, SORT_ASC, $NomClasse, SORT_ASC, $TabCSV);
		$NbLignes=count($TabCSV);
		
		//Prefixe rep Tirage


		for($i = 0; $i < $NbLignes; $i++)
		{ 
			$affiche_Tableau .= EcrireEcole($TabCSV[$i]["Nom de l'ecole"].'-'
										. strtoupper($TabCSV[$i]["Ville ecole"]) .'_'
										//. ($TabCSV[$i]["Code interne"] == ''?$TabCSV[$i]["Reference"]:$TabCSV[$i]["Code interne"]) . '_Ecole web !'
										. $TabCSV[$i]["Reference école"] . '_Ecole web !'
										, $PrefixeTirage);   
		  
			$affiche_Tableau .= EcrireClient($TabCSV[$i]["Num de commande"] . '_' 
										. $TabCSV[$i]["Num de facture"] . '_' 
										. $TabCSV[$i]["Prenom"] . '_' 
										. $TabCSV[$i]["Nom"] . '_' 
										. $TabCSV[$i]["Adresse1"] . '_' 								
										. $TabCSV[$i]["Adresse2"] . '_' 								
										. $TabCSV[$i]["Code postal"] . '_' 								
										. $TabCSV[$i]["Ville"]);  
										
			if ($TabCSV[$i]['Nom de la photo'] != '[Pochettes]') {
				$affiche_Tableau .= EcrireCommande(array_slice($TabCSV[$i], 9, -6), $TabCSV[$i]['Nom de la photo'], $TabCSV[$i]['Classe']);		
			}	
		}

		$affiche_Tableau = '[Version :1.0]' . '<br>'
							. '{Etat : -1 : Non enregistre %%'
							. EcrireBilanCMD($NbLignes) . '<br>' 
							. $affiche_Tableau;
							
		//$affiche_Tableau = str_replace('<br>', '\n', $affiche_Tableau);
		
		# Chemin vers fichier texte
		$target_file =  $GLOBALS['repCommandesLABO'] . $target_file ;

		$txtFichier = str_replace("<br>", "\n", $affiche_Tableau);
		$txtFichier = str_replace("&#60;", "<", $txtFichier);
		$txtFichier = str_replace("&#62;", ">", $txtFichier);

		# Ouverture en mode écriture
		$fileopen=(fopen("$target_file",'w'));
		# Ecriture de "Début du fichier" dansle fichier texte 
		fputs($fileopen,$txtFichier);
		# On ferme le fichier proprement
		fclose($fileopen);	
	}
	//'&#60;' . $Classe . ' ' . $key . '&#62;<br>';

	return $affiche_Tableau ;  
}

function EcrireBilanCMD($NbFichier)
{
	$unBilan = 'La commande comprend :%';
	$unTab = array_count_values($GLOBALS['TabResumeProduit']);
	
	foreach ($unTab as $key => $row) {
		$unBilan .= '- ' .$key . ': ' . $unTab[$key] . '%';
	}
	$unTab = array_count_values($GLOBALS['TabResumeFormat']);
	$unBilan .= '%%%Il y a ' . $NbFichier . ' fichiers a creer au laboratoire.%';
	foreach ($unTab as $key => $row) {
		$unBilan .= '- Format ' .$key . ': ' . $unTab[$key] . '%';
	}	
	$unBilan .= '}';
	//var_dump($unBilan);
	
	return $unBilan;
	//return $TabCSV;
}

function EcrireEcole($Ecole, $PrefixeTirage)
{
	//$RepertoireTirage = ($isGroupee?'':'(ISOLEES) ') . $Ecole;
	//$RepertoireTirage = $PrefixeTirage . $Ecole;
	$valRetour = '';
	if ($Ecole != $GLOBALS['Ecole_EnCOURS']) {   
		$GLOBALS['Ecole_EnCOURS'] = $Ecole;
		//PAs suprimer accent 1-10
		//$valRetour = '@' . date("Y-m-d") . '_' . $PrefixeTirage . $Ecole . '@ <br>';
		$valRetour = '@' . date("Y-m-d") . '_' . $PrefixeTirage . SUPRAccents($Ecole) . '@ <br>';
		
	}
	//return utf8_decode($valRetour);
	return $valRetour;
}

function EcrireClient($Client)
{
	$valRetour = '';
	if ($Client != $GLOBALS['Client_EnCOURS']) {
		$GLOBALS['Client_EnCOURS'] = $Client;
		$valRetour = '#' . $Client . '# <br>';
	}
	//return utf8_decode($valRetour);
	return $valRetour;
}

function EcrireCommande($CMD, $NomPhoto, $Classe)
{
	$valRetour = '';
	foreach ($CMD as $key => $value) {
		if ($value > 0) {
			$valRetour .= '&#60;' . $Classe . '%' . $key . '&#62;<br>';
			//$valRetour .= 'XXXX' . $Classe . ' ' . $key . 'YYYY<br>';
			//XXX a la place de < et YYY a la place de > sinon ca bug !!!
			for($i = 0; $i < $value; $i++)
			{ 			
				$valRetour .= EcrireProduitPhoto($NomPhoto, $key);
			}			
		}
	}
	//return utf8_decode($valRetour);
	return $valRetour;
}

function EcrireProduitPhoto($NomPhoto, $ProduitPhoto)
{
    $valRetour = '';
	//echo utf8_decode(strtolower($ProduitPhoto)) . '<br>';
	//echo $ProduitPhoto . '<br>';
	//var_dump( $GLOBALS['CataloguePdtWEB'][1]) ;
	//$leCodeProduit = $GLOBALS['CataloguePdtWEB'][strtolower($ProduitPhoto)];
	//$leCodeProduit = $GLOBALS['CataloguePdtWEB'][$ProduitPhoto];
	//echo ' sqfqsfdqsf  ' . $GLOBALS['CataloguePdtWEB'][0]['Description']. ' sqfqsfdqsf <br>';
	$leCodeProduit ='';
	

	for($i = 0; $i < count($GLOBALS['CataloguePdtWEB']) ; $i++){
		//echo $GLOBALS['CataloguePdtWEB'][$i]['Description'] . '<br>';
		if ($GLOBALS['CataloguePdtWEB'][$i]['Description'] == $ProduitPhoto){
			$leCodeProduit = $GLOBALS['CataloguePdtWEB'][$i]['Code'];
			break; 
		}
	} 	

	$tabCodesProduit = explode('.', $leCodeProduit);
	
	for($i = 0; $i < count($tabCodesProduit) ; $i++){
		///Pour classement Lumys
		if (substr($NomPhoto, -4 )== '-WEB'){$NomPhoto = substr($NomPhoto, 0, -4);}
		if (substr($NomPhoto, -7 )== '-WEB_nb'){$NomPhoto = substr($NomPhoto, 0, -7) . '_nb';}
		
		if (substr($NomPhoto ,-3 )== '_nb'){
			$valRetour .= substr($NomPhoto ,0,-3 ) . '.JPG_' . $tabCodesProduit[$i] . '_NOIR-ET-BLANC<br>';
		}
		else{
			$valRetour .= str_pad($NomPhoto, 4, "0", STR_PAD_LEFT) . '.JPG_' . $tabCodesProduit[$i] . '<br>';			
		}
		array_push($GLOBALS['TabResumeProduit'],$ProduitPhoto);
		if (! in_array($tabCodesProduit[$i], $GLOBALS['ProduitsNONLABO'])){
			array_push($GLOBALS['TabResumeFormat'], stristr($tabCodesProduit[$i] , '_', true));		
		}
	} 

	return $valRetour;
}

function ConvertPDT($ProduitPhoto)
{
    $valRetour = '_A REVOIR_'. $ProduitPhoto;
	return $valRetour;
}


function csv_to_array($filename='', $delimiter=';')
{
    //echo ('$filename ' . $filename);
	if(!file_exists($filename) || !is_readable($filename))
        return FALSE;

    $header = NULL;
    $data = array();
    if (($handle = fopen($filename, 'r')) !== FALSE)
    {
        while (($row = fgetcsv($handle, 0, $delimiter)) !== FALSE)
        {
            if(!$header)
                $header = $row;
            else
                $data[] = array_combine($header, $row);
        }
        fclose($handle);
    }
    return $data;
}

function SUPRAccents($str, $charset='utf-8' ) {
    $str = htmlentities( $str, ENT_NOQUOTES, $charset );
    $str = preg_replace( '#&([A-za-z])(?:acute|cedil|caron|circ|grave|orn|ring|slash|th|tilde|uml);#', '\1', $str );
    $str = preg_replace( '#&([A-za-z]{2})(?:lig);#', '\1', $str );
    $str = preg_replace( '#&[^;]+;#', '', $str );    
    return $str;
}


?>

