////////////////////////////// APIConnexion //////////////////////////////////////////////
/*function Connexion() {
	var isDebug = 0;
	if (isDebug){
		this.isSocket = true;
		this.Service = '/API_photolab/APIDialogue.php';
		this.URL = 'http://localhost:80';
		this.Domaine = 'localhost:80';  
	}
	else
	{//https://photoprod.000webhostapp.com/APIDialogue.php?apiTEST=TEST
	//https://photoprod.000webhostapp.com/API_photolab/APIDialogue.php?apiTEST=TEST
		this.isSocket = false;
		this.Service = '/APIDialogue.php';
		this.URL = 'http://photoprod.000webhostapp.com';
		this.Domaine = 'photoprod.000webhostapp.com:80';  
		
	}
	this.Adresse = this.URL + this.Service;
}
*/
var g_IsDebug = 0;

function APIConnexionJS() {
	if (g_IsDebug){
		this.isSocket = false;
		this.Service = '/res/PSDSocket.php';
		this.URL = 'http://localhost:80/PhotoLab';
		this.Domaine = 'localhost:80';  
	}
	else
	{//https://photoprod.000webhostapp.com/APIDialogue.php?apiTEST=TEST
	//https://photoprod.000webhostapp.com/API_photolab/APIDialogue.php?apiTEST=TEST
		this.isSocket = false;
		this.Service = '/res/PSDSocket.php';
		this.URL = 'http://amp-serveur.local:999';
		this.Domaine = 'amp-serveur.local:999';  
				
	}
	this.Adresse = this.URL + this.Service;
}
