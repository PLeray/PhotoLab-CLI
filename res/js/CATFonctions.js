function RecupAvancementFichierLab1(texteFichier) {
    var avancement = texteFichier.substring(texteFichier.indexOf('{'), texteFichier.indexOf('%%'));
    avancement = avancement.substring(avancement.indexOf(':') + 1); // juste le float
    var NBavancement = parseFloat(avancement);
    NBavancement = (isNaN(NBavancement)?0:NBavancement);
 
    return NBavancement ;
}

function AffichageAvancementProgressBar(GroupeCMD, AVPourcentage, isErreurDetecter) {
  var progressBAR = document.getElementById('AV' + GroupeCMD.slice(0, -5) + '.lab1');
  AVPourcentage =  100 * AVPourcentage;

  progressBAR.innerHTML = '→ ' + AVPourcentage.toFixed(1) + '%';
  progressBAR.style.width = Math.round(AVPourcentage).toFixed(1) + '%';

  //alert('AffichageAvancementProgressBar ' + GroupeCMD + ' AVPourcentage ' + AVPourcentage + ' isErreurDetecter ' + isErreurDetecter);  

  if(!isErreurDetecter){
    if(Math.round(AVPourcentage)>=100){
      location.reload();
    }
  }
  else{ // detection d'une nouvelle erreur : vérifier que l'erreur n'est pas dejà signalé
    var isErreurAfficher = (document.getElementById(GroupeCMD.slice(0, -5) + '.Erreur').display == 'none');
    if(isErreurAfficher){
      location.reload();
    }
  }
}

function EtatBarreProgressionPour(GroupeCMD) {
  //alert('ID2 ' +GroupeCMD.slice(0, -5) + '.Erreur');  
  // var fichierErreur = GroupeCMD.replace('.lab1', '.Erreur');
  var fichierErreur = GroupeCMD.slice(0, -5) + '.Erreur';
  var isErrerur = isFichiereExiste('../../CMDLABO/' + fichierErreur);
 // if (isErrerur){alert('erreur ' + fichierErreur);}
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    AffichageAvancementProgressBar(GroupeCMD, RecupAvancementFichierLab1(this.responseText), isErrerur);
  }
  xhttp.open("GET", '../../CMDLABO/' + GroupeCMD.slice(0, -1) + '.1');
  xhttp.send();
}

function isFichiereExiste(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function VisuErreur(elementId) {
  /* 
  alert('ID ' + elementId);
  
  */
  cmd = document.getElementsByClassName('ContenufichierErreur');
  
  for (i = 0; i < cmd.length; i++) {
    if ((cmd[i].id == elementId)&&(cmd[i].style.display == 'none')){	
      //alert('elementId ' + elementId);
        cmd[i].style.display = 'block';
        setCookie(cmd[i].id, 'affiche', 30);
    }else{
      cmd[i].style.display = 'none';
      setCookie(cmd[i].id, 'cache', 30);      
    }
  }	  
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}


function InitAfficheErreur() {
  var cmd, i;	
  cmd = document.getElementsByClassName('ContenufichierErreur');
  for (i = 0; i < cmd.length; i++) {
    cmd[i].style.display = 'none';
    if (getCookie(cmd[i].id)=='affiche'){	cmd[i].style.display = 'block';	}
  }
}	



/**/ 
function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("commandes");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
  /*table = document.getElementById("myTableWEB");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  } */ 
}
