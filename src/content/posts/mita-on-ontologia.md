---
title: "Onko Ontologiaa Olemassa? Osa 1: Sana ja sen synty"
dek: Mistä sana tulee, miten se päätyi tietojenkäsittelytieteeseen, ja miksi C-taso kysyy sitä nyt myyntitiimiltä.
tag: ONTOLOGY
date: 2026-09-12
lang: fi
draft: false
---

## Miksi tämä postaus

Vieraskielistä kirjallisuutta lukiessa vastaan tulee usein uusia sanoja ja ainakin itse ohitan usein ne laiskasti. Toisinaan sana kuitenkin alkaa toistua pakottaen ottamaan selvää, jotta tarinan juonessa pysyy mukana. Kindlen apissa sisäänrakennettu sanakirja antaa onneksi usein vastauksen muutamassa sekunnissa.

Lomien jälkeen huomasin vastaavan AI-kentässä, kun eteen alkoi tippua aivan liian usein sana: *ontologia*. Kyseinen termi esiintyi sen verran monta kertaa linkedinissä ja sen ulkopuolella, että oli pakko kaivaa moderni sanakirja (Claude) esiin ja pyytää selitystä. Silloinen Opus 5 yappasi muutaman sivullisen proosaa, ja olo oli oikeastaan tyhmempi kuin kysyessä. Muutaman lisäpromptin jälkeenkään en saanut kunnolla kiinni, mistä on kyse. Miksi termiä, joka juontaa juurensa antiikin filosofiaan, viljellään nyt C-tason AI-puheessa? Mitä se tarkoittaa? Ja miten Palantir liittyy tähän kaikkeen?

Päätin siis sukeltaa syvään päätyyn: mistä termi on lähtöisin, miten se on päätynyt tietojenkäsittelytieteeseen ja sieltä edelleen johtoryhmien lounaskeskusteluihin.

Tämä on kaksiosaisen tekstin ensimmäinen puolisko: sanan matka filosofiasta johtoryhmään. Toisessa osassa tutkin, voiko sanahypestä oikeasti olla apua parantamaan agenttien suorituskykyä, vai onko kyseessä vain uusi tapa myydä käärmeöljyä. Molempien osien mukana kulkee sama kuvitteellinen, mutta todellisen tuntuinen esimerkki: konsulttiyrityksen "SupHumAI" uudelta agentilta kysytään, *voiko Annan myydä Ruskan projektiin ensi kuussa.*

---

## Kuusi palaa

Sana *ontologia* esiintyy tiettävästi ensimmäisen kerran vuonna 1606 Jacob Lorhardin kirjassa *Ogdoas Scholastica*, jossa sitä käytetään synonyyminä sanalle metafysiikka. Suomenkielinen Wikipedia määrittelee ontologian "olevaisen perimmäistä olemusta tutkivaksi filosofian osaksi". Eli tutkimusta siitä, mitä jonkin asian oleminen tarkoittaa. Onko nollaa olemassa? Miksi jotain on olemassa, sen sijaan että ei olisi mitään? Ja meidän tapauksessamme merkittävin kysymys: "Kuinka olemassa olevat asiat liittyvät muihin olemassa oleviin asioihin, toisin sanoen mitä yleisiä suhteita asioiden välillä on?"

Ajatellaan asiaa yhden suomen kielen suosikkihomonyymini kautta: "kuusi palaa". Keskitytään tällä kertaa vain sanaparin ensimmäiseen sanaan.

On kuusia, jotka kasvavat metsässä, ja on kuusia, jotka tulevat viiden jälkeen. Metsän kuusi on kuusi siinä mielessä, että se on ainavihanta havupuu. Lukujonon kuusi on kuusi siinä mielessä, että se on viittä seuraava kokonaisluku. Mutta ei ole olemassa yhtä "kuusen" merkitystä, joka kattaisi sekä ikkunani takana kasvavan puun että sen luvun, jonka verran niitä pihalla on. Olisi siis hassua odottaa, että olisi yksi kuusitiede, jonka kohteisiin kuuluisivat sekä metsänhoitajan että matemaatikon kuuset. Kuuset eivät muodosta yhtä lajia, jolla olisi yksi määritelmä, joten mikään yksittäinen tiede ei voi kattaa täsmälleen niitä asioita, joita kutsutaan oikein "kuusiksi".[^1]

[^1]: Esimerkki on varastettu Stanfordin filosofian tietosanakirjan Aristoteles-artikkelista, jossa sama pointti tehdään sanalla *table*: on ruokapöytiä (dining table) ja vuorovesitaulukoita (tide table), eikä ole yhtä pöytätiedettä, joka kattaisi molemmat. Aristoteleen alkuperäinen huoli oli sana "oleva", joka sanotaan monella tapaa.

Ontologia auttaa siis meitä määrittelemään sen, minkä valitsemme olevan olemassa, kun puhumme jostakin. Lainaan vapaasti toista, 1900-luvulla vaikuttanutta filosofia Quinea: "to be is to be the value of a variable". Kerran filosofian pääsykokeissa käyneenä kääntäisin sen vapaasti jotakuinkin näin: olemassa on se, mistä on pakko puhua, jotta puhe olisi totta.[^2]

[^2]: Virallisempi suomennos löytyy Wikipediasta: Quine pelkisti olemassaolon "sidotun muuttujan arvona olemiseksi", eli teoria sitoutuu vain niiden asioiden olemassaoloon, joita se tarvitsee omaan muotoiluunsa.

Palataan esimerkkiin: "voiko Annan myydä Ruskan projektiin ensi kuussa". Tässä tapauksessa Anna on olemassa ja myytävissä. Sana "myydä" on oletettavasti ymmärretty työn vuokraamisena eikä ihmiskauppana. Ruska on olemassa, sillä on taustalla oikea juridinen entiteetti, jolla on tuloslaskelma. Projekti on jotakin: tarjous? olemassa oleva asiakkuus? Ja ensi kuu on luonnolliseen kieleen sidottu ajankohta, jonka tarkkaa hetkeä maailmankaikkeudessa ei voi päätellä ilman tietoa nykyhetkestä.

Quinen käsityksen mukaan tätä on ontologia. Yllä oleva lause viikoittaisessa myyntipalaverissa ihmisten kesken kantaa mukanaan kaiken sen taustatiedon mitä, kysymykseen vastaaminen vaatii. AI aikaudella tätä taustatietoa ei tyhjästä syntyneellä agenttisessiolla ole.

---

## Olemisen tietämysrakenteet

Tietojenkäsittelytieteen yleisimmin lainattu määritelmä ontologialle on peräisin vuoden 1993(!) artikkelista "A Translation Approach to Portable Ontology Specifications", Thomas R. Gruberilta. Sana oli tekoälytutkimuksessa käytössä jo aiemmin, mutta Gruberin määritelmään viitataan useimmiten: "explicit specification of a conceptualization".[^3]

[^3]: Gruberin myöhempi, vuonna 2009 *Encyclopedia of Database Systems* -teoksessa julkaistu ja hänen itsensä suosima versio: "In computer and information science, ontology is a technical term denoting an artifact that is designed for a purpose, which is to enable the modeling of knowledge about some domain, real or imagined." Eli tarkoitusta varten suunniteltu artefakti, joka mahdollistaa tietämyksen mallintamisen jollakin aihealueella, todellisella tai kuvitellulla.

Iso ero filosofian ontologiaan on se, että tietojenkäsittelytiede pudottaa universaaliuden vaatimuksen pois (hyvästi yleinen kuusitiede) ja keskittyy siihen, miten rakenteet mallinnetaan niin, että tiedämme, puhummeko havupuusta vai luonnollisesta luvusta.

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
  pintaAla: number; 
}

interface Puu {
  laji: Laji;       
  pituus: number;   
  kasvaa: Metsikkö;  
}

// ---------- rajoitteet ----------
const kelvollinen = (p: Puu): boolean =>
  p.pituus > 0 && p.kasvaa.pintaAla > 0;
```

Huomionarvoista on, että yllä olevalla ei ole mitään tekemistä oikeiden puiden kanssa. Kyseessä on artefakti, konkreettinen asia, joka määrittelee kuusen tietämysrakenteen. Samasta voidaan johtaa perinteinen SQL-tietorakenne tai antaa määritelmä tekoälylle pohjaksi. Tällöin agentin ei tarvitse päätellä sisäisesti, onko kyse kokonaisluvusta vai havupuusta. "Kuusi palaa" -homonyymin ongelma on jo puolittunut.[^4]

[^4]: Jo 1990-luvun puolivälissä puhuttiin *ontology engineeringistä* taitona ja käsityönä, jolla määriteltiin aihealueen sisäiset relevantit erottelut. Vuoden 1997 paperin otsikko on suoraan "From Ontological Art Towards Ontological Engineering". Vrt. 2020-luvun prompt-, context-, harness-, loop- ja graph engineering.

Tietojenkäsittelytieteen ontologian käyttökohteista puhuttaessa on pakko kertoa myös semanttisesta webistä, kavereiden kesken Web 3.0:sta. Kyseessä ei kuitenkaan ole lasersilmien ja muiden lohkoketjupöhisijöiden Web3. Vuonna 2001 Berners-Lee, Hendler ja Ora Lassila (torille) julkaisivat Scientific Americanissa semanttista webiä käsittelevän artikkelin, jossa yksittäisten henkilöiden agentit neuvottelevat fysioterapiavastaanotosta vakuutusyhtiön hyväksymiltä palveluntarjoajilta todellisen maailman ja luonnollisen kielen rajoitteiden mukaan. Vuosi oli siis 2001.[^5]

[^5]: Artikkelin avauskohtaus, suoraan lainattuna: "The agent promptly retrieved information about Mom's prescribed treatment from the doctor's agent, looked up several lists of providers, and checked for the ones in-plan for Mom's insurance within a 20-mile radius of her home and with a rating of excellent or very good on trusted rating services. It then began trying to find a match between available appointment times…"

Tässä semanttisen webin esimerkissä ontologia kuvataan dokumentiksi tai tiedostoksi, joka määrittelee muodollisesti termien väliset suhteet, tietokoneen ymmärtämällä kielellä.[^6]

[^6]: Artikkelin oma määritelmä: "An ontology is a document or file that formally defines the relations among terms."

Seuraavan kerran ontologian konsepti ja asioiden väliset määritelmät nousivat isosti esille hakukoneiden myötä, Googlen vuoden 2012 blogikirjoituksessa "Introducing the Knowledge Graph: things, not strings". Esimerkkinä Taj Mahal: pelkästään noilla kahdella sanalla saatettiin tarkoittaa maailmankuulua rakennusta, Grammy-palkittua muusikkoa, lähintä intialaista ravintolaa tai Atlantic Cityn kasinoa. "Kuusi palaa", mutta vain laajemmin. Ja vaikka Google kuvasi täsmälleen tietojenkäsittelytieteen määritelmän mukaista ontologiaa, itse sanaa ei mainittu kertaakaan. He puhuivat tiedon verkosta, *knowledge graphista*.

Palataan Annan myyntiin: ilman määriteltyä ontologiaa kehittynyt agentti tutkii CRM:ää etsien sieltä nimeä Ruska ja greppaa henkilöstöexcelistä nimeä Anna. Projektin tiedot olivat vielä Myyjä-Mannisen muistiinpanoissa hänen omalla läppärillään. Ja tarkemmin katsottuna Anna-haku palauttikin neljä eri Annaa. Agenttimme ei olisi näillä tiedoilla vielä päässyt tyydyttävään lopputulokseen.

---

## Datapuheesta pöhinäksi

Miten sana ontologia sitten päätyi linkkariin ja johtoryhmien puheenaiheeksi, ja miksi on niin kovin tärkeää saada sellainen?

Modernin ontologian airueeksi nousee selkeästi Palantir, joka on erityisesti vuodesta 2023 asti käyttänyt termiä aggressiivisesti niin markkinoinnissaan kuin vuosikertomuksissaan. Huhtikuussa 2023 yhtiö julkaisi Artificial Intelligence Platformin (AIP), joka sallii suurten kielimallien integroimisen yritysten omiin, suljettuihin verkkoihin. Palantirin mukaan AIP:n agentit saavat tietonsa asiakasyhtiön *ontologiasta*. Heidän maailmassaan sana palaa 2010-luvun puolivälissä julkaistun Foundry-alustan ytimeen, jonka tehtävä on mallintaa organisaation todelliset assetit, tilaukset, transaktiot ja muut oliot keskinäisine suhteineen digitaaliseen muotoon, ja näin luoda elävä tietämysrakenne organisaatiosta. Alkaako kuulostaa tutulta?[^7]

[^7]: Palantirin vuoden 2025 vuosikertomuksessa (10-K) sana *ontology* esiintyy toistakymmentä kertaa. Heidän oma määritelmänsä: "The Palantir Ontology goes far beyond the traditional concept by integrating the elements of a decision—the data, logic, and actions—into a foundational representation of the organization." 

Vuosina 2024 ja 2025, kun AI alkoi ottaa valtaa yrityksissä ja siirryttiin prompt engineeringistä kohti context engineeringiä, alettiin yleisesti huomata, että tarvitaan yhteinen nimittäjä sille, mitä "kuusi" juuri meidän yrityksessämme tarkoittaa. Määritelmäksi tälle puuttuvalle palikalle, jolla yleiset frontier-mallit saataisiin ymmärtämään juuri meidän maailmaamme, valikoitui ontologia.

Vuonna 2026 ketsuppipullo alkoi kunnolla aueta. Kesäkuussa, kahden viikon sisällä toisistaan, Snowflake julkaisi Horizon Contextin (jonka alle se niputti jo syksyllä 2025 aloitetun Open Semantic Interchange -standardin) ja Databricks tuotteen nimeltä Genie Ontology. Puhutaan itseään ylläpitävästä kontekstikerroksesta, joka ymmärtäisi täydellisesti yrityksen toimialan ja sisäiset rakenteet.

Samoin kuin aikaisemmin C-tason konferensseissa myytiin Data Lakea kaikille, nyt niiden päälle myydään ontologiaa.

Konsulttiyrityksessämme on päästy tilanteeseen, jossa C-Persoona saapuu firman laskuun järjestetystä KV-konffasta ja kysyy tilannehuoneelta: "oliko meillä jo ontologia käytössä myyntiprosessissa?" Myyjä-Manninen todennäköisesti keskittyy tässä vaiheessa huoneen valaisinratkaisujen pohtimiseen. Miten sitten SupHumAI:ssa päästään tilanteeseen jossa excelin neljä Annaa ja Mannisen projektimuistiinpanot muodostavat myyntiagentille hyödyllisen ontologian?

---

Tähän päättyy ontologia-sarjan ensimmäinen osa. Seuraavassa käyn läpi erilaisia tapoja rakentaa ontologioita, mitä hyötyä niistä voi olla agenteille ja ajan lyhyen epätieteellisen testin agenteilla ja ontologialla. 

---

*Tekoälytiedot*  

Tämän blogitekstin tiedonhaussa ja kirjoittamisessa on hyödynnetty tekoälyä. Teksti on ensisijaisesti ihmisen kirjoittamaa, mutta sanamuotoja ja oikolukua on tehty tekoälyn toimesta. Tästä syystä tekstistä löytyy luultavasti myös paikka paikoin Anthropickin vesileimat. Tämän blogin ulkoasu ja toteutus on tehty täysin tekoälyn avulla. Otan itse vastuun kaikista tekstissä olevista virheistä ja vääristä lähdemerkinnöistä. Mikäli huomaat merkittävän virheen, laitathan siitä minulle viestiä linkkarissa /tixtixti.

## Lähteet

- [Ontologia — suomenkielinen Wikipedia](https://fi.wikipedia.org/wiki/Ontologia)
- [Jacob Lorhard — Wikipedia](https://en.wikipedia.org/wiki/Jacob_Lorhard) (Ogdoas Scholastica 1606, sanan tiettävästi ensimmäinen esiintymä; Göckel 1613)
- [Aristotle's Metaphysics — Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/aristotle-metaphysics/) (luku 3: "dining tables and tide tables")
- [Logic and Ontology — Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/logic-ontology/) (ontologian neljä merkitystä)
- Quine, W. V. O. (1948). "On What There Is." *Review of Metaphysics* 2(1), 21–38. ("to be is to be the value of a variable")
- Gruber, T. R. (1993). ["A Translation Approach to Portable Ontology Specifications."](https://tomgruber.org/writing/ontolingua-kaj-1993.pdf) *Knowledge Acquisition* 5(2), 199–220.
- Gruber, T. R. (2009). ["Ontology."](https://tomgruber.org/writing/ontology-in-encyclopedia-of-dbs.pdf) Teoksessa Liu & Özsu (toim.), *Encyclopedia of Database Systems*. Springer.
- Fernández, M., Gómez-Pérez, A. & Juristo, N. (1997). ["METHONTOLOGY: From Ontological Art Towards Ontological Engineering."](https://cdn.aaai.org/Symposia/Spring/1997/SS-97-06/SS97-06-005.pdf) AAAI Spring Symposium.
- [Ontologia (tietojenkäsittelytiede) — suomenkielinen Wikipedia](https://fi.wikipedia.org/wiki/Ontologia_(tietojenkäsittelytiede)) (YSO, suomalaiset ontologiat)
- Berners-Lee, T., Hendler, J. & Lassila, O. (2001). ["The Semantic Web."](https://www.lassila.org/publications/2001/SciAm.html) *Scientific American* 284(5), 34–43. ([PDF](https://jmvidal.cse.sc.edu/library/berners-lee01a.pdf))
- Singhal, A. (2012). ["Introducing the Knowledge Graph: things, not strings."](https://blog.google/products/search/introducing-knowledge-graph-things-not/) Google blog, 16.5.2012.
- [Palantir Technologies — Wikipedia](https://en.wikipedia.org/wiki/Palantir_Technologies) (AIP, huhtikuu 2023)
- [Palantir FY2025 Form 10-K](https://investors.palantir.com/files/2025%20FY%20PLTR%2010-K.pdf) (ontologian määritelmä, Item 1)
- Palantir — [Why create an Ontology?](https://www.palantir.com/docs/foundry/ontology/why-ontology)
- Snowflake (23.9.2025). [Open Semantic Interchange -aloite, lehdistötiedote.](https://www.snowflake.com/en/news/press-releases/snowflake-salesforce-dbt-labs-and-more-revolutionize-data-readiness-for-ai-with-open-semantic-interchange-initiative/)
- Snowflake (2.6.2026). [Horizon Context, lehdistötiedote.](https://www.snowflake.com/en/news/press-releases/snowflake-advances-trusted-ai-with-snowflake-horizon-catalog-centralizing-governance-context-and-security-across-the-enterprise/)
- Databricks (16.6.2026). [Introducing Genie One, Genie Ontology, and Genie Agents.](https://www.databricks.com/blog/introducing-genie-one-genie-ontology-and-genie-agents)
- [Gartner Hype Cycles 2026 — Atlanin kooste](https://atlan.com/context-and-chaos/issue/gartner-hype-cycles-2026-nobody-owns-context/)

---