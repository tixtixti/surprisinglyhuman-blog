---
title: Mitä on ontologia?
dek: Mistä sana tulee, miten se päätyi tietojenkäsittelytieteeseen, ja miksi C-taso kysyy sitä nyt myyntitiimiltä.
tag: ONTOLOGY
date: 2026-09-12
lang: fi
draft: true
---

*Surprisingly Human — työversio. Kieli: suomi. Juokseva esimerkki: konsulttitalo, Anna, asiakas Ruska (kuvitteellinen). Luvut kasvavat yksi kerrallaan.*

---

## Miksi tämä postaus

Vieraskielistä kirjallisuutta lukiessa vastaan tulee uusia sanoja, ja ainakin itse tuppaan ohittamaan ne, elleivät ne vaikuta kovin merkityksellisiltä. Toisinaan sana kuitenkin alkaa toistua, ja siitä on pakko ottaa selvää pysyäkseen juonessa mukana. Kindlen apissa ja ainakin Macilla tähän on sisäänrakennetut työkalut: sanakirjavastaus muutamassa sekunnissa. Useimmiten pelkkä sanakirja riittää.

Lomien jälkeen AI-kentässä alkoi eteen tippua termi "ontologia" sen verran monta kertaa, että oli pakko kaivaa moderni sanakirja (Claude) esiin ja pyytää selitystä. Silloinen Opus 5 yappasi muutaman sivullisen proosaa, ja olo oli oikeastaan tyhmempi kuin kysyessä. Muutaman lisäyrityksen jälkeenkään en saanut kunnolla kiinni, mistä on kyse. Miksi termiä, joka on peräisin antiikin filosofiasta, viljellään nyt C-tason AI-puheessa? Mitä se tarkoittaa? Ja miten Palantir liittyy tähän kaikkeen?

Päätin siis sukeltaa syvään päätyyn: mistä termi on lähtöisin, miten se on päätynyt tietojenkäsittelytieteeseen ja sieltä edelleen käyttöön agenttien kanssa.

Toinen puoli on aito halu ymmärtää, voiko tästä sanahypestä oikeasti olla parantamaan agenttien suorituskykyä, vai onko kyseessä vain uusi nimi vanhalle käärmeöljylle. Jälkimmäistä havainnollistamaan olen valinnut kuvitteellisen mutta todellisen tuntuisen esimerkin: konsulttiyrityksen uudelta agentilta kysytään, *voiko Annan myydä Ruskan projektiin ensi kuussa.*

---

## Kuusi palaa

Sana *ontologia* esiintyy ensimmäisen kerran vuonna 1606 Jacob Lorhardin kirjassa *Ogdoas Scholastica*, jossa sitä käytetään synonyyminä sanalle metafysiikka. Suomenkielinen Wikipedia määrittelee ontologian "olevaisen perimmäistä olemusta tutkivaksi filosofian osaksi". Eli tutkimusta siitä, mitä jonkin asian oleminen tarkoittaa. Onko nollaa olemassa? Miksi jotain on olemassa, sen sijaan että ei olisi mitään? Ja ennen kaikkea meidän tapauksessamme, saman artikkelin sanoin: "Kuinka olemassa olevat asiat liittyvät muihin olemassa oleviin asioihin, toisin sanoen mitä yleisiä suhteita asioiden välillä on?"

Ajatellaan asiaa yhden suomen kielen suosikkihomonyymini kautta: "kuusi palaa". Keskitytään tällä kertaa vain ensimmäiseen sanaan.

On kuusia, jotka kasvavat metsässä, ja on kuusia, jotka tulevat viiden jälkeen. Metsän kuusi on kuusi siinä mielessä, että se on ainavihanta havupuu. Lukujonon kuusi on kuusi siinä mielessä, että se on viittä seuraava kokonaisluku. Mutta ei ole olemassa yhtä "kuusen" merkitystä, joka kattaisi sekä ikkunani takana kasvavan puun että sen luvun, jonka verran niitä pihalla on. Olisi siis typerää odottaa, että olisi yksi kuusitiede, jonka kohteisiin kuuluisivat sekä metsänhoitajan että matemaatikon kuuset. Kuuset eivät muodosta yhtä lajia, jolla olisi yksi määritelmä, joten mikään yksittäinen tiede ei voi kattaa täsmälleen niitä asioita, joita kutsutaan oikein "kuusiksi".[^1]

[^1]: Esimerkki on varastettu Stanfordin filosofian tietosanakirjan Aristoteles-artikkelista, jossa sama pointti tehdään sanalla *table*: on ruokapöytiä (dining table) ja vuorovesitaulukoita (tide table), eikä ole yhtä pöytätiedettä, joka kattaisi molemmat. Aristoteleen alkuperäinen huoli oli sana "oleva", joka sanotaan monella tapaa. Kuusi on vain kotimaisempi.

Tai vaihtoehtoisesti sana kurkku voi viitata joko ihmisen osaan tai syksyisin pihoilla kasvavaan vihannekseen. Kurkkutiede olisi sekin itsessään mahdoton.

Ontologia auttaa siis meitä määrittelemään sen, minkä valitsemme olevan olemassa, kun puhumme jostakin. Lainataksemme vapaasti toista, 1900-luvulla vaikuttanutta filosofia Quinea: "to be is to be the value of a variable". Kerran filosofian pääsykokeissa käyneenä käännän sen hyvin vapaasti näin: olemassa on se, mistä on pakko puhua, jotta puhe olisi totta.[^2]

[^2]: Virallisempi suomennos löytyy Wikipediasta: Quine pelkisti olemassaolon "sidotun muuttujan arvona olemiseksi", eli teoria sitoutuu vain niiden asioiden olemassaoloon, joita se tarvitsee omaan muotoiluunsa. Sama asia, vähemmän pääsykoetta.

Palatkaamme esimerkkiimme: "voiko Annan myydä Ruskan projektiin ensi kuussa". Tässä tapauksessa Anna on olemassa ja myytävissä. Sana "myydä" on oletettavasti ymmärretty työn vuokraamisena eikä ihmiskauppana. Ruska on olemassa, sillä on taustalla oikea lakisääteinen entiteetti, jolla on tuloslaskelma. Projekti on jotakin: tarjous? olemassa oleva asiakkuus? Ja ensi kuu on luonnolliseen kieleen sidottu ajankohta, jonka tarkkaa hetkeä maailmankaikkeudessa ei voi päätellä ilman tietoa nykyhetkestä.

Quinen käsityksen mukaan tätä on ontologia. Yllä oleva lause viikoittaisessa myyntipalaverissa ihmisten kesken kantaa mukanaan kaiken sen taustatiedon, jota tyhjästä syntyneellä agenttisessiolla ei ole.

---

## Olemisen tietämysrakenteet

Tietojenkäsittelytieteen yleisimmin lainattu määritelmä ontologialle on peräisin vuoden 1993(!) artikkelista "A Translation Approach to Portable Ontology Specifications", Thomas R. Gruberin käsialaa. Sana oli tekoälytutkimuksessa käytössä jo aiemmin, mutta Gruber naulasi sen: ontologia on "explicit specification of a conceptualization".[^3]

[^3]: Gruberin myöhempi, vuonna 2009 *Encyclopedia of Database Systems* -teoksessa julkaistu ja sittemmin useammin lainattu versio: "In computer and information science, ontology is a technical term denoting an artifact that is designed for a purpose, which is to enable the modeling of knowledge about some domain, real or imagined."

Tuossa myöhemmässä versiossa Gruber tiivistää tietojenkäsittelytieteen ontologian tekniseksi termiksi, joka tarkoittaa tiettyä tarkoitusta varten suunniteltua artefaktia: sellaista, joka mahdollistaa tietämyksen mallintamisen jollakin aihealueella, todellisella tai kuvitellulla. Iso ero filosofian ontologiaan on se, että tietojenkäsittelytiede pudottaa universaaliuden vaatimuksen pois (hyvästi yleinen kuusi- ja kurkkutiede) ja keskittyy siihen, miten rakenteet mallinnetaan niin, että tiedämme, puhummeko havupuusta vai luonnollisesta luvusta.

Käytännössä metsätieteen kuusen ontologia voisi osittain näyttää vaikka tältä:

```typescript
// ---------- käsitteet ----------
type Ryhmä = "havupuu" | "lehtipuu";

interface Laji {
  tieteellinenNimi: string;
  nimi: string;
  ryhmä: Ryhmä;
}

interface Metsikkö {
  pintaAla: number; // hehtaaria
}

interface Puu {
  laji: Laji;        // täsmälleen yksi
  pituus: number;    // metriä
  kasvaa: Metsikkö;  // täsmälleen yksi
}

// ---------- rajoitteet ----------
const kelvollinen = (p: Puu): boolean =>
  p.pituus > 0 && p.kasvaa.pintaAla > 0;
```

Huomionarvoista on, että yllä olevalla ei ole mitään tekemistä oikeiden puiden kanssa. Kyseessä on artefakti, konkreettinen asia, joka määrittelee kuusen tietämysrakenteen. Samasta voidaan johtaa perinteinen SQL-tietorakenne, tai antaa määritelmä tekoälylle pohjaksi. Tällöin agentin ei tarvitse päätellä sisäisesti, onko kyse kokonaisluvusta vai havupuusta. "Kuusi palaa" -homonyymin ongelma on jo puolittunut.

Kiintoisana sivuhuomiona: jo 2000-luvun alussa puhuttiin *ontology engineeringistä* taitona ja käsityönä, jolla määriteltiin aihealueen sisäiset relevantit erottelut. Vrt. 2020-luvun prompt-, context-, harness-, loop- ja graph engineering.

Tietojenkäsittelytieteen ontologian käyttökohteista puhuttaessa on pakko puhua semanttisesta webistä, kavereiden kesken Web 3.0:sta. Huomionarvoista, että kyseessä ei ole lasersilmien ja muiden lohkoketjupöhisijöiden Web3. Vuonna 2001 Berners-Lee, Hendler ja Ora Lassila (torille) julkaisivat Scientific Americanissa semanttista webiä käsittelevän artikkelin, jossa yksittäisten henkilöiden agentit neuvottelevat fysioterapiavastaanotosta vakuutusyhtiön hyväksymille palveluntarjoajille todellisen maailman ja luonnollisen kielen rajoitteiden mukaan. Huomioikaa, että vuosi oli 2001.[^4]

[^4]: Artikkelin avauskohtaus, suoraan lainattuna: "The agent promptly retrieved information about Mom's prescribed treatment from the doctor's agent, looked up several lists of providers, and checked for the ones in-plan for Mom's insurance within a 20-mile radius of her home and with a rating of excellent or very good on trusted rating services. It then began trying to find a match between available appointment times."

Tässä semanttisen webin esimerkissä ontologia kuvataan joukoksi määritelmiä tietokoneen ymmärtämällä kielellä, joissa kuvataan asioiden välisiä suhteita ja loogisia sääntöjä.[^5]

[^5]: Artikkelin oma sanasto: "ONTOLOGIES: Collections of statements written in a language such as RDF that define the relations between concepts and specify logical rules for reasoning about them. Computers will 'understand' the meaning of semantic data on a Web page by following links to specified ontologies."

Seuraavan kerran ontologian konsepti ja asioiden väliset määritelmät nousivat isosti esille hakukoneiden myötä, Googlen vuoden 2012 blogikirjoituksessa "Introducing the Knowledge Graph: things, not strings". Esimerkkinä Taj Mahal: pelkillä noilla kahdella sanalla saatettiin tarkoittaa maailmankuulua rakennusta Intiassa, bluesmuusikkoa, ravintolaa tai Atlantic Cityn kasinoa, jonka eräs tuleva Yhdysvaltain presidentti ajoi vararikkoon vuoden sisällä avajaisista. Sama homonyymitapaus kuin "kuusi palaa", mutta koko planeetan mittakaavassa. Huomionarvoista tässä julkaisussa oli, että vaikka Google kuvasi täsmälleen tietojenkäsittelytieteen määritelmän mukaista ontologiaa, itse sanaa ei mainittu kertaakaan. He puhuivat tiedon verkosta, *knowledge graphista*.

Palataksemme Annan myyntiin: ilman määriteltyä ontologiaa tehtävänanto voisi tutkia CRM:ää ja etsiä nimeä Ruska, ja grepata henkilöstöexcelistä nimeä Anna. Projektista ei olisi vielä tietoakaan. Sanaa "myynti" ei olisi määritelty. Ja tarkemmin katsottuna Anna-haku palauttikin neljä eri Annaa. Agentti olisi näillä tiedoilla edelleen kujalla.

---

## Datapuheesta pöhinäksi

Miten sana ontologia sitten päätyi Linkkariin ja johtoryhmien puheenaiheeksi, ja miksi on niin kovin tärkeää saada sellainen?

Modernin ontologian esimarssijaksi nousee selkeästi Palantir, joka on erityisesti vuodesta 2023 asti käyttänyt termiä aggressiivisesti niin markkinoinnissaan kuin vuosikertomuksissaan. Huhtikuussa 2023 yhtiö julkaisi Artificial Intelligence Platformin (AIP), joka sallii suurten kielimallien integroimisen yritysten omiin, suljettuihin verkkoihin. Palantirin mukaan AIP:n agentit saavat tietonsa asiakasyhtiön ontologiasta. Heidän maailmassaan sana viittaa 2010-luvun puolivälissä julkaistun Foundry-alustan ytimeen, jonka tehtävä on mallintaa organisaation todelliset assetit, tilaukset, transaktiot ja muut oliot keskinäisine suhteineen digitaaliseen muotoon, ja näin luoda elävä tietämysrakenne organisaatiosta. Alkaako kuulostaa tutulta?[^6]

[^6]: Palantirin vuoden 2025 vuosikertomuksessa (10-K) sana *ontology* esiintyy 18 kertaa. Heidän oma määritelmänsä: "The Palantir Ontology goes far beyond the traditional concept by integrating the elements of a decision—the data, logic, and actions—into a foundational representation of the organization." Gruberin käsitteistä ja suhteista on siirrytty päätöksiin ja toimintoihin. Filosofian sana sai töitä operatiivisesta johdosta.

Vuosina 2024 ja 2025, kun AI alkoi ottaa valtaa yrityksissä ja siirryttiin prompt engineeringistä kohti context engineeringiä, alettiin yleisesti huomata, että tarvitaan yhteinen nimittäjä sille, mitä "kuusi" juuri meidän yrityksessämme tarkoittaa. Sanaksi tälle puuttuvalle palikalle, jolla yleiset frontier-mallit saataisiin ymmärtämään juuri meidän maailmaamme, valikoitui ontologia.

Vuonna 2026 ketsuppipullo alkoi kunnolla aueta. Kesäkuussa, kahden viikon sisällä toisistaan, Snowflake julkaisi Horizon Contextin ja Open Semantic Interchange -spesifikaation ja Databricks tuotteen nimeltä, ilman ironiaa, Genie Ontology. Puhutaan itseään ylläpitävästä kontekstikerroksesta, joka ymmärtäisi täydellisesti yrityksen toimialan ja sisäiset rakenteet.[^7]

[^7]: Gartnerin 2026 hype-käyrillä sama asia esiintyy kolmella nimellä: *context graph* (Innovation Trigger, alle prosentin levinneisyys), *knowledge graph* (Slope of Enlightenment) ja *knowledge fabric*. Sama idea, kolme substantiivia, hinnoiteltu erikseen.

Samoin kuin aikaisemmin C-tason konferensseissa myytiin Data Lakea kaikille, nyt niiden päälle myydään ontologiaa.

Konsulttiyrityksessämme on päästy tilanteeseen, jossa C-persoona saapuu firman laskuun järjestetystä KV-konffasta ja kysyy myyntitiimiltä: "onko meillä jo ontologia?" Ja tästä päästään spiraaliin, jonka aloitimme tämän blogin alussa. Meillä on edelleen vain CRM ja exceli, jossa on neljä Annaa. Miten me sitten saamme sen ontologian?

---

## Valitse oma ontologiasi

Onko ainut tapa vastata C-persoonan tarpeeseen sitten soittaa Palantirille? Ei. Oikeastaan heidänkin tapansa rakentaa ontologia on vain yksi mahdollisuuksista.

Palataan hetkeksi aiempaan lukuun, jossa määrittelimme, mitä ontologia tietojenkäsittelytieteessä tarkoittaa: tarkoitusta varten suunniteltu artefakti, joka mahdollistaa tietämyksen mallintamisen tietyllä aihealueella.

Palantirin malli keskittyy ontology engineeringin hyötykäyttöön. Tiimillinen kalliita insinöörejä tulee tutustumaan systeemiisi ja mallintaa jokaisen yksikön, tapahtuman ja myynnin heidän omalla Ontology-as-code-lähestymisellään, josta Foundryn Ontology SDK sitten generoidaan. Tällaista käsin määriteltyä ontologiaa voi kutsua *operatiiviseksi ontologiaksi*: se perustuu määrittelyyn ja voi toimia yrityksen varsinaisena taustajärjestelmänä, jolla on oikeus myös kirjoittaa, ei vain lukea. Konsulttiyhtiömme esimerkissä Annalla olisi selkeä resurssi-ID, ja Ruska sekä tuleva projekti olisi kirjattu yhteisten käytänteiden mukaan. Karkeasti jotakuinkin näin:

```yaml
# ontologia.yaml — konsulttitalon operatiivinen ontologia, riisuttu versio
objectTypes:
  Konsultti:
    primaryKey: resurssiId
    properties:
      nimi: string
      tyyppi: [oma, alihankkija, kandidaatti]
  Asiakas:
    primaryKey: yTunnus
    properties:
      nimi: string
  Projekti:
    primaryKey: projektiId
    properties:
      tila: [tarjous, allekirjoitettu, aktiivinen, päättynyt]
      alkaa: date

linkTypes:
  ProjektinAsiakas:   { from: Projekti, to: Asiakas, cardinality: many-to-one }
  MyytyProjektiin:    { from: Konsultti, to: Projekti, cardinality: many-to-many }

actionTypes:
  myyProjektiin:
    parameters: { konsultti: Konsultti, projekti: Projekti, alkaa: date }
    submissionCriteria:
      - projekti.tila in [allekirjoitettu, aktiivinen]
      - konsultti.tyyppi in [oma, alihankkija]
    effects:
      - create MyytyProjektiin(konsultti, projekti)
```

Tämä malli palauttaisi todennäköisesti oikean Annan, oikean yrityksen ja Annan tilanteen. Se ei kuitenkaan välttämättä pystyisi tekemään varsinaista kauppaa Ruskan kanssa, koska Ruskan puoli operaatiosta, se allekirjoitus, tapahtuu meidän järjestelmiemme ulkopuolella. Isona rajoittimena tässä mallissa on luonnollisesti datan laatu ja ajantasaisuus.[^8]

[^8]: Palantirin omien dokkareiden mukaan sovellus saa "tokenin, joka on rajattu vain niihin ontologian entiteetteihin, joihin sovelluksen halutaan pääsevän". Toimintoja (action) suojaavat submission criteria, eli yllä oleva `myyProjektiin` voi sanoa ei.

Databricksin Genie Ontology puolestaan edustaa *oppivaa ontologiaa*. Pohjana ovat jo käytössä olevat tietorakenteet, kyselyt, kojelaudat, notebookit ja muut yrityksen assetit. Genie järjestää nämä auktoriteetin ja relevanssin mukaan ja hakee niistä "hyödyllisimmät" lähteet. Useamman ristiriitaisen lähteen kohdalla painavat sertifioidut ja laajasti käytetyt assetit. Tällainen ontologia ei välttämättä tarjoile lainkaan funktioita tai toimenpiteitä, vaan tarjoaa yrityksen datan fiksusti tarjoiltuna seuraaville agenteille, tarvittaessa MCP:n yli. Konsulttiyrityksemme tapauksessa yrityksen oma agentti kyselisi oppivan ontologian MCP:ltä tietoja Ruskasta, Annoista ja projekteista, yhdistelisi niitä omiin tietoihinsa esimerkiksi päivämäärästä, ja ymmärtäisi, että henkilödokumentin neljästä Annasta kolmella on jo merkintä toisessa taulussa aktiivisissa projekteissa. Ja osaisi siten valita oikean Annan.

Kolmas tapa yhdistelee hieman kahta edellistä. Atlanin *Active Ontology*, jota voisi kutsua hallituksi kontekstiksi, yhdistää metadatan ja human-in-the-loop-mallin ja toimii kaikkien järjestelmien yläpuolella. Siinä missä Palantir on koko yrityksen kova ydin ja Databricks oma alustansa, hallittu konteksti ottaa kaikki alla olevat järjestelmät (CRM, BI, henkilöstöexcel) ja lätkii niille tageja sen perusteella, kuinka luotettavia lähteet ovat, ovatko kuvaukset AI:n generoimia vai ihmisen kirjoittamia, ja kuka ne omistaa. Konsulttiyrityksen tapauksessa loppukäyttö olisi hyvin samankaltaista kuin oppivan ontologian kanssa, mutta alla oleva systeemi olisi joukko useita palveluita eikä yksi keskitetty data lake.[^9]

[^9]: Atlanin dokumentaatio: "AI-generated descriptions are written only where a human-authored description is absent", ja "every AI-generated description carries a badge so consumers can calibrate trust". Ihmisen kirjoittama voittaa aina koneen kirjoittaman.

---

## Mihin agenttisi tarvitsee ontologiaa?

Vaikka uudet mallit ovat jatkuvasti parempia ja useissa frontier-malleissa on jo miljoonan tokenin konteksti-ikkuna, joissain tapauksissa suurempikin, on *context rot* eli kontekstin happaneminen edelleen todellinen ilmiö. Aiheeseen tutustumattomille: mieti neulan etsimistä alati kasvavasta heinäsuovasta. Kontekstin hallintaan on useita yleisesti tunnistettuja ratkaisuja kompaktoinnista siivoukseen, mutta päätös siitä, siirretäänkö ratkaiseva tieto roskiin vai mukaan, jää kolmannen osapuolen algoritmien harteille. Yrityksen omat ohjeet siitä, miten "kuusi on havupuu", katoavat helposti.[^10]

[^10]: Anthropicin oma muotoilu ilmiölle: "As the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases." Sama artikkeli listaa lääkkeet: kompaktointi, muistiinpanot, ali-agentit. Yksikään niistä ei lupaa, että talon tavat säilyvät.

Ontologia, oli se sitten missä tahansa muodossa, tarjoaa tähän ratkaisun. Lähdetään purkamaan konsulttiyhtiötä ja Annan myyntiä edellisessä luvussa kuvatun määritelmän mukaan ja laajennetaan sitä ottamalla tällä kertaa pohjaksi Golden Gate Universityn (San Francisco) tutkijan malli operatiiviseen ontologiaan, jossa ontologia esitetään roolien, domainin ja interaktioiden kautta. Roolit sisältävät tiedon siitä, millaisia päätöksiä ja missä kontekstissa rooli saa tehdä, arviointimetriikat ja tavan kommunikoida. Domain puolestaan kuvaa yrityksen liiketoiminnan vertikaalin: entiteetit, metriikat ja rajoitteet. Interaktiot määrittelevät roolien väliset työnkulut ja päätöksentekopuut.[^11]

[^11]: Luong Tuan & Sanyal (arXiv, huhtikuu 2026) on esijulkaisu, ja arvioitu alusta on ensimmäisen kirjoittajan oma. Tulos on silti selkein, jonka löysin juuri tähän kysymykseen: ontologialla pohjustetut agentit pysyivät roolissaan merkitsevästi paremmin, ja hyöty oli noin kaksinkertainen vietnamilaisissa toimialoissa englanninkielisiin verrattuna. Mitä kauempana toimialasi on mallin keskiarvosta, sitä enemmän kirjoitettu talon tapa painaa.

### 1. Kolme kerrosta

```typescript
interface Rooli {
  nimi: string;
  saaPaattaa: string[];      // mistä rooli saa päättää
  metriikat: string[];       // millä roolia arvioidaan
  viestintatyyli: string;
}

interface Domain {
  entiteetit: Record<string, string>;   // mitä sanat tarkoittavat täällä
  rajoitteet: string[];
}

interface Interaktio {
  mista: string;
  mihin: string;
  laukaisin: string;
  vaatii: string[];
}

interface Ontologia {
  roolit: Rooli[];
  domain: Domain;
  interaktiot: Interaktio[];
}
```

### 2. Talo

```typescript
const talo: Ontologia = {
  roolit: [
    {
      nimi: "resursointiagentti",
      saaPaattaa: ["ehdottaa konsulttia projektiin"],   // ei: myydä
      metriikat: ["käyttöaste", "vastausaika"],
      viestintatyyli: "lyhyt, sanoo ensin mitä ei tiedä",
    },
    {
      nimi: "myyntijohtaja",
      saaPaattaa: ["hyväksyy myynnin"],
      metriikat: ["kate", "käyttöaste"],
      viestintatyyli: "päätös ja perustelu",
    },
  ],
  domain: {
    entiteetit: {
      Konsultti: "oma tai alihankkija. Kandidaatti ei ole konsultti.",
      Projekti: "allekirjoitettu tai aktiivinen. Tarjous ei ole projekti.",
      Asiakas: "laskutettava y-tunnuksellinen yhtiö. Ei yhteyshenkilö.",
      Myydä: "resursoida konsultti projektiin. Ei myyntisuppilo.",
    },
    rajoitteet: ["konsulttia ei myydä tarjoukseen", "kandidaattia ei myydä"],
  },
  interaktiot: [
    {
      mista: "resursointiagentti",
      mihin: "myyntijohtaja",
      laukaisin: "sopiva konsultti löytyi",
      vaatii: ["projekti on allekirjoitettu", "konsultti ei ole kandidaatti"],
    },
  ],
};
```

### 3. Prompti

```text
Olet resursointiagentti.
Saat päättää: ehdottaa konsulttia projektiin. Et saa myydä.
Sinua arvioidaan: käyttöaste, vastausaika.
Tyyli: lyhyt, sanoo ensin mitä ei tiedä.

Mitä sanat tarkoittavat tässä talossa:
- Konsultti: oma tai alihankkija. Kandidaatti ei ole konsultti.
- Projekti: allekirjoitettu tai aktiivinen. Tarjous ei ole projekti.
- Asiakas: laskutettava y-tunnuksellinen yhtiö. Ei yhteyshenkilö.
- Myydä: resursoida konsultti projektiin. Ei myyntisuppilo.
Rajoitteet: konsulttia ei myydä tarjoukseen; kandidaattia ei myydä.

Kun sopiva konsultti löytyy, siirrä asia myyntijohtajalle.
Vaatii: projekti on allekirjoitettu, konsultti ei ole kandidaatti.
```

Serialisointi on kymmenen riviä merkkijonojen liimaamista, en kiusaa sinua sillä. Tässäkin kohtaa on lopulta hyvä ymmärtää, että ontologian avulla pystyttiin rakentamaan "vain" todella laadukas prompti, ja jäämme silti mallien vahvuuden varaan siinä, että ne noudattavat ohjeitamme oikein. Mutta huomaa, että olemme nyt määritelleet talon sisäisen kielen määrämuotoon, ja voimme muotoilla nämä määritykset kulloinkin valitulle agenttimallille optimoiduiksi. Ontology-as-code.

---

## Todellisuus

Entä mitä tästä kaikesta sitten jää viivan alle? Jos kysyt kielimalliltasi, saat todennäköisesti vuoden 2023 tai 2024 RAG-ajan vastauksia siitä, miten ontologian käyttö on parantanut tuloksia merkittävästi. Viimeaikaiset toistokokeet ovat kuitenkin tuottaneet lähes vastaavia tai vain hieman heikompia tuloksia ilman ontologiaa.[^12]

[^12]: Ne RAG-ajan tulokset: LinkedIn rakensi vanhoista tukipyynnöistä tietämysgraafin ja lyhensi asiakaspalvelun mediaaniratkaisuaikaa 28,6 % puolen vuoden tuotantokäytössä (SIGIR 2024). data.world laittoi GPT-4:n vastaamaan vakuutusalan kysymyksiin: suoraan SQL:ää vasten 16 % oikein, ontologialla varustetun tietämysgraafin kautta 54 % (marraskuu 2023). Kun dbt Labs ajoi saman vakuutusaineiston uudelleen huhtikuussa 2026 nykymalleilla, pelkkä text-to-SQL osui 84–90 % ja semanttisen kerroksen kautta 98–100 %. Yksitoista kysymystä, joten älä rakenna kirkkoa sen päälle. Mutta kolminkertaisesta erosta on tultu kymmeneen prosenttiyksikköön.

Ainut tuore, tuotteesta mitattu tulos, jonka löysin tätä tekstiä varten, oli Databricksin *oma* mittaus, jossa Genie Ontology paransi ensimmäisen yrityksen osumatarkkuutta 52 prosentista 84 prosenttiin sen hetken parasta koodausagenttia vastaan. Mutta tunnetustihan nämä tuppaavat noudattamaan suuri, suurempi, suurin -taivutusta muodossa: vale, emävale, tilasto.

Miksi sitten vouhkaamme ontologioista, ja miksi kukaan hankkisi sellaisen? Auttaako se teknisiä insinöörejä tuntemaan itsensä vielä tärkeiksi, kun he saavat MÄÄRITTÄÄ asioita, ja saamme vielä hetken tuntea olevamme kontrollissa? Onneksemme ontologian hyötyjä on melko helppo mitata erilaisilla LLM-as-judge- ja ihmisvetoisilla malleilla. Lopullisen vastauksen saamme ehkä vasta tulevaisuudessa.

Mitä sitten itse ajattelen tästä kaikesta? Mielestäni on selkeää, että ontologiasta on hyötyä riippumatta siitä, miten sen toteuttaa, tietyin reunaehdoin. Operoidaan niche-alueella, josta mallilla ei ole pohjatietoa, ja käytetään pienempiä, mahdollisesti lokaaleja malleja. Ontologia ja määrittelyt auttavat merkittävästi kotikoneellasi rullaavaa 7B-thinking-mallia ymmärtämään sinua. Jos kuitenkin ajat jatkuvasti uusimpia frontier-malleja välittämättä tokenkulutuksesta, hyödyt jäävät todennäköisesti vähäisiksi.[^13]

[^13]: Tälle on tuoretta tukea. Luong Tuanin ja Sanyalin selkein tulos oli, että ontologia auttoi kaksi kertaa enemmän vietnamilaisilla toimialoilla, joista malli tiesi vähiten. Kesän 2026 pienmallitutkimuksissa sama kuvio: tietämysgraafilla pohjustaminen antoi 1,5–2-kertaisen parannuksen 1–4 miljardin parametrin malleille (Kelesis ym.), ja graafiksi järjestetty evidenssi oli 2–8 miljardin malleilla ainoa menetelmä, joka paransi tuloksia tasaisesti siinä missä chain-of-thought hajosi (King Saud University, elokuu 2026). Mitä vähemmän malli tietää valmiiksi, sitä enemmän kirjoitettu talon tapa painaa.

Voi olla, että tulevaisuuden supermallit eivät enää tarvitse apuamme ja kaikki -engineering-versiot käyvät turhiksi. Toistaiseksi erityyppisillä kontekstin hallinnan tavoilla on kuitenkin paikkansa.

Tämä kirjoitus sai alkunsa halusta ymmärtää, mistä monimutkaiselta vaikuttavassa termissä on pohjimmiltaan kyse, ja päättyy tähän. Toivottavasti sait tästä tietoa tai ideoita jatkoon. 🌱

---

*AI-vastuuvapauslauseke.* Tämän blogin ulkoasu ja toteutus on tehty täysin tekoälyn avulla, samoin tämän tekstin lähdemateriaalien etsintä. Teksti on ensisijaisesti ihmisen kirjoittama; suomen kielen oikoluvun ja lähdeviitteet on merkinnyt tekoäly. Otan itse vastuun kaikista tekstissä olevista virheistä ja vääristä lähdemerkinnöistä. Mikäli huomaat merkittävän virheen, laitathan siitä minulle viestiä: timo at achievely piste co.

## Lähteet

*Kasvaa luku kerrallaan. Julkaistaan postauksen lopussa.*

- [Ontologia — suomenkielinen Wikipedia](https://fi.wikipedia.org/wiki/Ontologia)
- [Jacob Lorhard — Wikipedia](https://en.wikipedia.org/wiki/Jacob_Lorhard) (Ogdoas Scholastica 1606, sanan ensiesiintymä; Göckel 1613)
- [Aristotle's Metaphysics — Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/aristotle-metaphysics/) (luku 3: "dining tables and tide tables")
- [Logic and Ontology — Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/logic-ontology/) (ontologian neljä merkitystä)
- Quine, W. V. O. (1948). "On What There Is." *Review of Metaphysics* 2(1). ("to be is to be the value of a variable")
- Gruber, T. R. (1993). ["A Translation Approach to Portable Ontology Specifications."](https://tomgruber.org/writing/ontolingua-kaj-1993.pdf) *Knowledge Acquisition* 5(2).
- Gruber, T. R. (2009). ["Ontology."](https://tomgruber.org/writing/ontology-in-encyclopedia-of-dbs.pdf) Teoksessa Liu & Özsu (toim.), *Encyclopedia of Database Systems*. Springer.
- [Ontologia (tietojenkäsittelytiede) — suomenkielinen Wikipedia](https://fi.wikipedia.org/wiki/Ontologia_(tietojenkäsittelytiede)) (YSO, suomalaiset ontologiat)
- Berners-Lee, T., Hendler, J. & Lassila, O. (2001). ["The Semantic Web."](https://www.lassila.org/publications/2001/SciAm.html) *Scientific American* 284(5). ([PDF](https://jmvidal.cse.sc.edu/library/berners-lee01a.pdf))
- Singhal, A. (2012). ["Introducing the Knowledge Graph: things, not strings."](https://blog.google/products/search/introducing-knowledge-graph-things-not/) Google blog, 16.5.2012.
- [Palantir Technologies — Wikipedia](https://en.wikipedia.org/wiki/Palantir_Technologies) (AIP, huhtikuu 2023)
- [Palantir FY2025 Form 10-K](https://investors.palantir.com/files/2025%20FY%20PLTR%2010-K.pdf) (ontologian määritelmä, 18 mainintaa)
- Palantir — [Why create an Ontology?](https://www.palantir.com/docs/foundry/ontology/why-ontology)
- [Snowflake Summit 2026 announcements](https://atlan.com/know/snowflake/summit-2026-announcements/) (Horizon Context, OSI; toissijainen lähde)
- [Databricks Data + AI Summit 2026 announcements](https://atlan.com/know/ai-agent/databricks/databricks-data-ai-summit-2026-announcements/) (Genie Ontology; toissijainen lähde)
- Palantir — [Ontology SDK overview](https://www.palantir.com/docs/foundry/ontology-sdk/overview) (Ontology-as-code, rajatut tokenit)
- Databricks — [Operationalizing Genie Ontology in your data stack](https://www.databricks.com/blog/operationalizing-genie-ontology-your-data-stack), 1.9.2026
- Atlan — [What is Active Ontology](https://atlan.com/know/what-is-active-ontology/), 19.5.2026; [Enrich metadata at scale (docs)](https://docs.atlan.com/product/capabilities/governance/context-agents-studio/best-practices/enrich-metadata-at-scale)
- Anthropic — [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), 29.9.2025 (context rot)
- Luong Tuan, T. & Sanyal, A. (2026). [Ontology-Constrained Neural Reasoning in Enterprise Agentic Systems.](https://arxiv.org/abs/2604.00555) arXiv-esijulkaisu (rooli-, domain- ja interaktio-ontologiat)
- [Gartner Hype Cycles 2026 — Atlanin kooste](https://atlan.com/context-and-chaos/issue/gartner-hype-cycles-2026-nobody-owns-context/) (toissijainen lähde; Gartnerin raportit maksumuurin takana)
- Xu, Z. ym. (2024). [Retrieval-Augmented Generation with Knowledge Graphs for Customer Service Question Answering.](https://arxiv.org/abs/2404.17723) SIGIR 2024 (LinkedIn, −28,6 % ratkaisuaika)
- Sequeda, J., Allemang, D. & Jacob, B. (2023). [A Benchmark to Understand the Role of Knowledge Graphs on LLM's Accuracy for Question Answering on Enterprise SQL Databases.](https://arxiv.org/abs/2311.07509) data.world (16 % vs 54 %)
- dbt Labs (2026). [Semantic Layer vs. Text-to-SQL: 2026 Benchmark Update.](https://docs.getdbt.com/blog/semantic-layer-vs-text-to-sql-2026) 7.4.2026
- Databricks (2026). [Introducing Genie One, Genie Ontology, and Genie Agents.](https://www.databricks.com/blog/introducing-genie-one-genie-ontology-and-genie-agents) 16.6.2026 (oma mittaus, 84,5 % vs 52,4 %)
- Kelesis, D., Bougiatiotis, K. & Paliouras, G. (2026). [Enhancing Small Language Models Reasoning through Knowledge Graph Grounding.](https://arxiv.org/abs/2607.14149) arXiv, 14.7.2026
- [Are reasoning paradigms scale-aware?](https://link.springer.com/article/10.1007/s44443-026-01071-0) *Journal of King Saud University – Computer and Information Sciences*, 24.8.2026

---

<!-- Pipeline-tagit (ei julkaista):
LinkedIn-leikkaukset:
1. "Kuusi palaa" — homonyymi + Quine yhdellä lauseella + linkki. FI.
2. Ketsuppipullo — Palantir 18 mainintaa 10-K:ssa, Snowflake ja Databricks kahden viikon sisällä, "sama idea, kolme substantiivia". FI.
3. "Onko meillä jo ontologia?" — C-persoona palaa konffasta; talon tavat -blokki (prompti-esimerkki) ja TL;DR "jury is still out, kokeile pienillä malleilla". FI tai EN.
4. Come teach me — "löysin yhden tuotantotuloksen ja se on vendorin oma. Jos sinulla on parempi, kahvi/lounas/Teams." EN.
Puhepotentiaali: kyllä. Runko "sana lähti filosofiasta, kävi tietojenkäsittelytieteessä, päätyi johtoryhmään, ja agentti tarvitsee sitä siksi että konteksti happanee" kantaa 30 min. Prompti-blokki ja kuusi palaa toimivat slideina.
Jako kahteen postaukseen: osa 1 = luvut 1–4 (sanan matka), osa 2 = luvut 5–7 (valitse, käytä, todellisuus). Luku 1 tarvitsee osaan 2 lyhyen kertauksen.
-->
