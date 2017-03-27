var dodajKontakt, noviKontakt, sacuvajKontakt, odustani;
var imenik=[]
var slika;
var file;

window.onload = function(e){ 
  noviKontakt = document.getElementById("novi-kontakt");
  dodajKontakt = document.getElementById("dodaj-kontakt");
  sacuvajKontakt = document.getElementById("sacuvaj-kontakt");
  odustani = document.getElementById("odustani");

  noviKontakt.addEventListener("click",function(){dodajKontakt.style.display="block"});
  sacuvajKontakt.addEventListener("click", SacuvajKontakt);
  odustani.addEventListener("click", Odustani);

  ucitajKontakte()
}

function previewFile() {
	var preview = document.querySelector('img');
	file    = document.querySelector('input[type=file]').files[0];
	var reader  = new FileReader();

	reader.onloadend = function () {
		preview.src = reader.result;
    slika = reader.result
	}
	if (file) {
		reader.readAsDataURL(file);
	} else {
		preview.src = "";
	}
}

function ucitajKontakte(){
  var options = {}
  options.metod = "GET"
  options.putanja  = "prikazi-kontakte"
  options.sadrzaj = ""
  ajaxZahtev(options, prikaziKontakte)
}

function ajaxZahtev(options, callback) {
  var req = new XMLHttpRequest();
  req.open(options.metod, options.putanja, true);
  req.addEventListener("load", function() {
    if (req.status < 400) {
      callback(req.responseText);
    }
    else {
    callback(new Error("Zahtev odbijen: " + req.statusText));
    }
  });
  req.addEventListener("error", function() {
    callback(new Error("Greška na mreži"));
  });
  req.send(options.sadrzaj || null);
}

function SacuvajKontakt(){
  var slika = document.querySelector('img').src;
  var options = {}
  options.metod = "POST"
  options.putanja  = "novi-kontakt"
  ime = dodajKontakt.ime.value
  telefon = dodajKontakt.telefon.value
  options.sadrzaj = JSON.stringify({"ime": ime, "telefon": telefon, "foto": slika})
  ajaxZahtev(options, prikaziKontakte)
}

function prikaziKontakte(odgovor){
  kontakti = JSON.parse(odgovor)
  dodajKontakt.reset();
  document.querySelector('img').src = "";
	dodajKontakt.style.display="none";
  document.getElementById("imena").innerHTML=""
  
  for (kontakt in kontakti) {
    document.getElementById("imena").innerHTML +="<p><img src="+kontakti[kontakt].foto+" height=128 ></p><p>"+kontakti[kontakt].ime+": "+kontakti[kontakt].telefon+"</p>"
  }

}

function Odustani(){
	dodajKontakt.reset();
	dodajKontakt.style.display="none";
}
