---
title: "Onko Ontologiaa Olemassa? Osa 2: Rakenna, käytä, mittaa"
dek: Kolme tapaa rakentaa ontologia, mihin agentti sitä oikeasti tarvitsee, ja onko tästä kaikesta lopulta mitään hyötyä.
tag: ONTOLOGY
date: 2026-09-18
lang: fi
draft: true
---

<!-- v4 / osa 2 — 2026-09-18. Timin uudelleenkirjoitus v3:n pohjalta, luku kerrallaan. Tässä tiedostossa vasta johdanto ja luku "Valitse oma ontologiasi" (kolme alaotsikkoa). Luvut "Mihin agenttisi tarvitsee ontologiaa?", "Koe" ja "Todellisuus" ovat vielä v3:ssa (ontologia_osa2_v3.md). Claude: oikoluku, kaksi uutta lähdettä sivuhuomautuksiin, merkitty UUSI (Claude). Otsikko yhdenmukaistettu osan 1 kanssa ("Onko Ontologiaa Olemassa?"); dek ehdotus. -->

Ontologiasarjan ensimmäisessä osassa seurasimme sanan *ontologia* matkaa sen syntyjuurilta aina viime päivien LinkedIn-postauksiin. Jos aihe ei ole vielä tuttu, artikkeli löytyy täältä: [Osa 1: Sana ja sen synty](https://surprisinglyhuman.blog/posts/mita-on-ontologia). Lyhyt kertaus kuitenkin siitä, mistä ontologiassa on nykypäivänä kyse, Gruberin sanoin: "ontologia on tarkoitusta varten suunniteltu artefakti, joka mahdollistaa tietämyksen mallintamisen jollakin aihealueella."

Tässä osassa avaamme tarkemmin, miten ontologian voi toteuttaa, ja seuraamme SupHumAI:n yrityksiä rakentaa sellainen. Lopuksi pohdimme, onko tästä kaikesta lopulta mitään hyötyä.

---

## Valitse oma ontologiasi

### Insinöörin ontologia

Onko Palantirilla sitten monopoli moderniin ontologiaan, vai voiko sellaisen vibetellä kasaan?

Palantirin ontologia on pohjimmiltaan pitkälle vietyä ontology engineeringiä. Tiimillinen kalliita insinöörejä tulee tutustumaan järjestelmiisi ja mallintaa jokaisen yksikön, esineen, asian, lyijykynän, myyntipalaverin ja niiden väliset suhteet. Kaikki tämä kuvataan Palantirin omalla ontology-as-code-muotoilulla, josta syntyy lopulta back officen kaltainen ontologia. Tällaista tapaa voisi kutsua rennosti vaikka *määritellyksi ontologiaksi*. Tällaisella järjestelmällä olisi siis oikeus toimia koko yrityksen taustajärjestelmänä ja sekä lukea että kirjoittaa.

Viime aikoina on julkaistu useita muitakin tapoja määritellä tällainen ontologia, mutta perusidea on aina sama.[^1] Hyvin insinöörimäinen, kaiken kattava mallinnus siitä, mitä todellisuus on ja miten se toimii. Välittömänä haasteena nousee sanaton vaatimus siitä, että jokaisen yksikön jokaisen entiteetin tulisi toimia jotakuinkin samalla tavalla ja puhua yhtenäistä kieltä.[^2]

[^1]: Luong Tuan & Sanyal (arXiv, huhtikuu 2026) määrittelevät ontologian roolien, domainin ja niiden välisten interaktioiden kautta; palaamme tähän seuraavassa luvussa. Zhang ym. (arXiv, elokuu 2026) menevät toiseen suuntaan ja antavat kielimallin rakentaa ja hioa tehtäväkohtaisen ontologian itse tehtävänkuvauksesta ja datasta. Eli kyllä, vibettelemälläkin on jo yritetty.

[^2]: Yhtenäinen kieli, *ubiquitous language*, on myös domain-driven designin kova ydin. Eric Evansin mukaan kehittäjien ja liiketoiminnan pitää puhua samaa, mallista johdettua kieltä. Todellisessa elämässä tämäkin on haastavaa. Muistan käyneeni aikoinaan useita keskusteluja siitä, voiko sana *test* tarkoittaa englanniksi psykologista testiä vai ei. Ymmärrätte varmaan sanan latautuneisuuden softakehityksessä.

SupHumAI:n ja Annan tapauksessa määriteltyä ontologiaa voisi kuvata vaikka näin:

```yaml
# ontologia.yaml — konsulttitalon määritelty ontologia, riisuttu versio
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

<!-- v3:sta, pidä tai leikkaa: -->
Tämä malli palauttaisi todennäköisesti oikean Annan, oikean yrityksen ja Annan tilanteen. Se ei kuitenkaan välttämättä pystyisi tekemään varsinaista kauppaa Ruskan kanssa, koska Ruskan puoli operaatiosta, se allekirjoitus, tapahtuu meidän järjestelmiemme ulkopuolella. Isona rajoittimena on luonnollisesti datan laatu ja ajantasaisuus.[^3]

[^3]: Palantirin omien dokkareiden mukaan sovellus saa "tokenin, joka on rajattu vain niihin ontologian entiteetteihin, joihin sovelluksen halutaan pääsevän". Toimintoja suojaavat submission criteria, eli yllä oleva `myyProjektiin` voi sanoa ei.

### Lampunhengen ontologia

Databricksin Genie Ontology edustaa sitä, mitä tässä voisi kutsua *oppivaksi ontologiaksi*. Pointti on, että kun yrityksesi tietorakenteet ovat jo valmiiksi Databricksin alustalla, voit yhdistellä omat taulusi, kyselysi, kojelautasi ja muut assettisi ontologiaksi. Genie järjestää nämä auktoriteetin ja relevanssin mukaan ja hakee niistä "hyödyllisimmät" lähteet. Tällainen ontologia ei välttämättä tarjoile lainkaan funktioita tai toimenpiteitä, vaan tarjoaa yrityksen datan fiksusti tarjoiltuna seuraaville agenteille.

Konsulttiyrityksemme tapauksessa yrityksen oma agentti kyselisi oppivan ontologian MCP:ltä tietoja Ruskasta, Annoista ja projekteista, yhdistelisi niitä omiin tietoihinsa esimerkiksi päivämäärästä, ja ymmärtäisi, että henkilöstöexcelin neljästä Annasta kolmella on jo merkintä toisessa taulussa aktiivisissa projekteissa.

### Hallittu kaaos

Kolmas tapa yhdistelee kahta edellistä. Atlanin Active Ontology, jota voisi kutsua *hallituksi kontekstiksi*, sitoo metadatan elävään dataan ja toimii kaikkien järjestelmien yläpuolella. Siinä missä Palantir on koko yrityksen kova ydin ja Databricks oma alustansa, hallittu konteksti ottaa kaikki alla olevat järjestelmät (CRM, BI, henkilöstöexcel) ja, saman talon dokumentaation mukaan, lätkii niille tageja sen perusteella, ovatko kuvaukset tekoälyn generoimia vai ihmisen kirjoittamia ja kuka määritelmät omistaa.[^4]

[^4]: Atlanin dokumentaatio: "AI-generated descriptions are written only where a human-authored description is absent", ja "every AI-generated description carries a badge so consumers can calibrate trust".

Tästä tulee monesti mieleen viime aikoina esiin nousseet ratkaisut yrityksen omista aivoista, LLM-wikeistä ja muista tavoista jäsentää yrityksen kaikki data järkevästi saman katon alle. Ontologian kannalta huomio kannattaa kuitenkin kiinnittää juuri tageihin sekä asioiden välisiin hierarkioihin ja suhteisiin.

Konsulttiyrityksen tapauksessa loppukäyttö olisi hyvin samankaltaista kuin oppivan ontologian kanssa, mutta alla oleva järjestelmä olisi joukko erillisiä palveluita eikä yksi keskitetty data lake.

---
<!-- Osa 2, luku 2: "Ontologian myyntipuhe". Timin teksti, Claude oikolukenut 2026-09-18. UUSI (Claude) -blokit ovat ehdotuksia. Alaviitteet jatkavat luvun 1 numerointia ([^5]). Lähteisiin: Anthropic (29.9.2025), Effective context engineering for AI agents, https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents -->

## Ontologian myyntipuhe

Jos keisareilta riisutaan vaatteet, mitä jää jäljelle? Loppujen lopuksi kaikki kolme myyvät samaa sisältöä: jotain, joka kertoo agentillesi, mitä "kuusi" tässä yrityksessä tarkoittaa ja mitä tarkoitetaan, kun Annaa ollaan myymässä. Mutta miksi agentti tarvitsee tätä ollakseen tehokas ja oikeassa?

### Happaneva konteksti

Vaikka uudet mallit ovat jatkuvasti parempia ja miljoonan tokenin konteksti-ikkuna on frontier-malleissa jo normi, on *context rot* eli kontekstin happaneminen edelleen todellinen ilmiö. Aiheeseen tutustumattomille: mieti neulan etsimistä alati kasvavasta heinäsuovasta.[^5] Kontekstin hallintaan on useita yleisesti tunnistettuja ratkaisuja kompaktoinnista siivoukseen, mutta päätös siitä, siirretäänkö ratkaiseva tieto roskiin vai mukaan, jää kolmannen osapuolen algoritmien harteille. Yrityksen omat ohjeet siitä, miten "kuusi on havupuu", katoavat helposti työkalukutsujen ja oheiskeskustelun sekaan.

[^5]: Anthropicin oma muotoilu ilmiölle: "As the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases." Sama artikkeli listaa lääkkeet: kompaktointi, muistiinpanot, sub-agentit.

<!-- UUSI (Claude): esimerkki paikanpitäjän tilalle -->
Ilmiön tunnistaa arjesta. Oletko pyytänyt chattibottia vastaamaan ilman ranskalaisia viivoja ja huomannut, että viidenkymmenen viestin jälkeen viivat ovat takaisin? Sama tapahtuu koodausagentille, jota muistutit projektin alussa, että testit ajetaan aina ennen committia. 
<!-- /UUSI -->

Palantirin ontologia on rakennettu alusta alkaen omaksi käyttöjärjestelmäkseen, jonka sisällä tätä ongelmaa ei samalla tavalla ole: agentti ja ontologia asuvat samassa paikassa ja jokainen tapahtuma kulkee omaa selkeää polkuaan. Meidän kannalta mielenkiintoisempaa on se, mitä Databricks ja Atlan ovat tehteet. Tavan tuoda yrityksen sisäinen tieto kielimallin ulottuville juuri oikeaan aikaan, joka kerta erikseen. Agentti saa selkeän kehyksen sille mitä etsiä, sen sijaan että tieto ladattaisiin kerran kontekstiin ja unohdettaisiin sinne.

### Käärmeöljyä vai taikapölyä?

Henkilökohtaisesti olen puhunut kontekstin hallinnan tärkeydestä pitkään kaikessa kielimalleihin liittyvässä työssä. Vaikka frontier-labit laajentavat konteksti-ikkunoitaan ja tuovat uusia työkaluja massiivisten datamäärien käsittelyyn, uskon edelleen, että hyvällä kontekstin hallinnalla ja mallien ohjaamisella saa parempia tuloksia, vielä usein pienemmillä kuluilla. Onko ontologia sitten patternina sellainen, johon kannattaa investoida? Ja voiko sen rakentaa itse, vai pitääkö se ostaa?

SupHumAI:n C-persoona on jo tarttumassa luuriin, kun yrityksen AI-insinööri saapuu paikalle Nocco-tölkin kanssa ja ehdottaa: "Mitä jos kokeiltaisiin ensin itse?"

---
<!-- Osa 2, luku 3: "Talon tavat". Timin teksti, Claude korjannut vain kirjoitusvirheet 2026-09-18. Kaikki Clauden lisäykset ovat UUSI (Claude) -merkkien sisällä. Alaviitteet jatkavat luvun 2 numerointia ([^6]–[^8]). Lähteisiin: Claude Code docs, How Claude remembers your project, https://code.claude.com/docs/en/memory. Luong Tuan & Sanyal on jo lähteissä. Luvun 1 alaviite [^1] voi nyt sanoa "palaamme tähän luvussa Talon tavat". -->

## Talon tavat

Lähdetään rakentamaan omaa kevyttä ontologiaa henkilöstöexcelien ja CRM:ien päälle. Otetaan selkeyden vuoksi pohjaksi Luong Tuanin ja Sanyalin arXivissa julkaisema paperi, jossa ontologia määritellään kolmikerroksisena.[^6] Roolit: mitä rooleja yrityksessä on ja mitä ne saavat päättää. Domain: business-entiteetit ja rajoitteet, eli mitkä tämän yrityksen talon tavat ovat. Interaktiot, eli millaisissa raameissa edellä mainitut saavat toimia vuorovaikutuksessa. Tämä on toki vain yksi tapa määritellä ontologia, mutta SupHumAI:n tapauksessa tämä on hyvä pohja rakentaa konsultointia ilman pakottamista.

[^6]: Luong Tuan & Sanyal (arXiv, huhtikuu 2026). Esijulkaisu, ja arvioitu alusta on ensimmäisen kirjoittajan oma. Silti selkein tulos, jonka löysin juuri tähän kysymykseen: ontologialla pohjustetut agentit pysyivät roolissaan merkitsevästi paremmin (roolijohdonmukaisuus 0,70 → 0,92). 

Joten tältä se näyttää. Kokeen promptit ja ontologia ovat englanniksi ja data suomeksi, koska toisen testatun mallin suomen kielen taidosta ei ole mitään tietoa. Suluissa olevat suomenkieliset sanat sitovat englanninkielisen määritelmän CRM:n suomenkieliseen arvoon. 

```typescript
const house: Ontology = {
  roles: [
    {
      name: "resourcing agent",
      mayDecide: ["propose a consultant for a project"],   // not: sell
      metrics: ["utilisation", "response time"],
      style: "short, says first what it does not know",
    },
    {
      name: "sales director",
      mayDecide: ["approves sales"],
      metrics: ["margin", "utilisation"],
      style: "decision and reasoning",
    },
  ],
  domain: {
    entities: {
      Consultant: "own staff (oma) or a subcontractor (alihankkija). A candidate (kandidaatti) is not a consultant.",
      Project: "signed (allekirjoitettu) or active (aktiivinen). A tender (tarjous) is not a project.",
      Client: "a billable company with a business ID (y-tunnus). Not a contact person.",
      Sell: "to resource a consultant onto a project. Not the sales funnel.",
    },
    constraints: ["a consultant is not sold to a tender", "a candidate is not sold"],
  },
  interactions: [
    {
      from: "resourcing agent",
      to: "sales director",
      trigger: "a suitable consultant was found",
      requires: ["the project is signed", "the consultant is not a candidate"],
    },
  ],
};
```

Huomioidaan tässä tapauksessa erityisesti domainin rajoitteet. Mitä tarkoittaa myydä, kuka on asiakas, mikä on tarjous ja mikä ei ole. Yllä olevasta on sitten mahdollista yksinkertaisella parsimisella johtaa seuraava prompti:

```text
You are the resourcing agent.
You may decide: propose a consultant for a project. You may not sell.
You are evaluated on: utilisation, response time.
Style: short, says first what it does not know.

What words mean in this house:
- Consultant: own staff (oma) or a subcontractor (alihankkija). A candidate (kandidaatti) is not a consultant.
- Project: signed (allekirjoitettu) or active (aktiivinen). A tender (tarjous) is not a project.
- Client: a billable company with a business ID (y-tunnus). Not a contact person.
- Sell: to resource a consultant onto a project. Not the sales funnel.
Constraints: a consultant is not sold to a tender; a candidate is not sold.

When a suitable consultant is found, hand the matter to the sales director.
Requires: the project is signed, the consultant is not a candidate.
```

Mikä vaikutus tällä promptilla sitten on? Periaatteessahan datasta pystyisi päättelemään kaiken, mitä vastaamiseen tarvitaan. Miksi nähdä kauhea vaiva siihen, että saadaan 250 tokenin prompti survottua jokaiseen kyselyyn mukaan?[^7]

[^7]:  Samasta syystä kuin Claude Coden `CLAUDE.md` ladataan jokaisen session alussa ja luetaan levyltä uudestaan kompaktoinnin jälkeen. Anthropicin dokumentaation sanoin tiedosto on "context rather than enforced configuration". <!-- /UUSI -->

Alla otoksia oikeista ajoista.[^8]

[^8]: Claude Sonnet, koko yrityksen data kerralla näkyvissä, ilman työkaluja. Ainoa ero vastausten välillä on, oliko yllä oleva prompti mukana. <!-- /UUSI -->

**Can Anna be sold to Ruska's project next month?**

Ilman määrittelypromptia:

> The request refers to 'Anna' but there are three consultants with that first name (K001 Anna Korhonen, K002 Anna Mäkinen, K003 Anna Laine) with different skill sets and availabilities, and it's unclear which one is meant. Additionally, Ruska Oy has two projects (P001 and P002); only P001 (tarjous, starting 2026-10-01) fits the 'next month' timeframe, but without knowing which Anna is intended we cannot make a specific proposal.

Ja promptin kanssa:

> Ruska Oy's only project (P001) is still in tender status, not signed, so no consultant can be sold to it; also there are four staff named Anna (K001–K004), making the request ambiguous.

Huomioi, miten sana *tarjous* on jälkimmäisessä osattu tulkita oikein.

Entäs jos mallia käsketään toimimaan?

**Confirm Anna Korhonen for Ruska from 1 October.**

Ilman:

> Anna Korhonen (K001) has the required Java/Spring skills for the Ruska Oy project P001 and becomes free on 2026-10-01, exactly matching the project's start date.

Kanssa:

> Ruska's only relevant project (P001) is still a tender, not signed/active, so no consultant can be sold to it. Anna Korhonen (K001) becomes free 2026-10-01, but there is no valid Ruska project to confirm her on yet.

Väärästä positiivisesta oikeaan tulokseen. <!-- UUSI (Claude): vaihtoehto: "Väärästä kyllästä oikeaan eihin." -->

Seuraavaksi paneudutaan näihin tuloksiin syvällisemmin.


<!-- Osa 2, luku 4: "Koe". Timin teksti, Claude korjannut kirjoitusvirheet 2026-09-19. Kaikki Clauden lisäykset ovat UUSI (Claude) -merkkien sisällä. Alaviitteet jatkavat luvun 3 numerointia ([^9]–[^10]). Faktahuomiot: (1) "kevyt kielimalli" / "jää kauas frontier-malleista" on liioittelua, Anthropicin oma järjestys on Fable, Opus, Sonnet ja Sonnet on "the best combination of speed and intelligence"; lainaus "sopii hyvin jokapäiväisiin tehtäviin" ei löydy heidän sivuiltaan, korvattu heidän omalla rivillään. (2) "Neljäkymmentä konsulttia" → henkilöä: 35 konsulttia + 5 kandidaattia, ja ero on yksi ansoista. (3) "Luottamusväli" ei ole se, mitä Jev palauttaa; se palauttaa todennäköisyyden jokaiselle vaihtoehdolle ja luottamusarvon. Lähteisiin: Anthropic, Models overview, https://platform.claude.com/docs/en/about-claude/models/overview; TypeSafe, API reference, https://docs.typesafe.ai/api; GIGAZINE 16.9.2026, https://gigazine.net/gsc_news/en/20260916-system-one-jev/; DataCamp, System One models, https://www.datacamp.com/blog/system-one-models-jev. Kuva: results/whole-en-chart.svg repossa (kysymystyypit × A/C × Sonnet/Jev). -->

## Koe

### Testisetuppi

Tämä testi on tehty käyttäen kevyttä kielimallia (Claude Sonnet 5), melko suppeaa tekoälyn generoimaa materiaalia, ja varsinainen testi on ajettu puoliautonomisesti Claude Coden avustuksella. Kyseiset tulokset ovat korkeintaan viitteellisiä, eikä niitä tule ottaa totuutena. Testin ontologiaa, prompteja tai muutakaan harnessia ei ole optimoitu mitään mallia silmällä pitäen. Testi on myös rakennettu niin, että ontologiasta oletetaan olevan hyötyä.[^9]

[^9]: Koodi, data, kysymykset ja jokainen raaka vastaus ovat repossa (linkki). Yksi ajo per solu, ei toistoja. Ajoin myös kaksi muuta versiota, jotka eivät ole kuvassa: samat säännöt proosana, joka sai saman tuloksen kuin ontologia, ja säännöt kirjoitettuna vastausskeeman vaihtoehtoihin, joka sai hieman huonomman. Molemmat ovat repossa. <!-- /UUSI -->

SupHumAI. Neljäkymmentä henkilöä, joista neljä Annaa, ja kymmenen asiakasta. Dataan on rakennettu useita ansoja, joita oikeassa maailmassa voisi tulla vastaan: valmiita projekteja, joihin on yhä staffattu työntekijöitä, täydellisesti sopivia konsultteja, jotka eivät ole vapaana, ja niin edelleen.

Setupissa on esitetty 59 erilaista kysymystä, jotka edustavat kuutta alityyppiä: "kuka Anna", SupHumAI:n oman sanaston määrittelyä, ajankohtia, rooleja, kysymyksiä joihin ei ole vastausta, ja puhdasta datan hakemista. Kaikki kysymykset ajettiin kahteen kertaan: kerran pelkkänä promptina, jossa mukana kaikki materiaali ja kysymys, toisen kerran niin, että ontologiasta johdettu pätkä oli mukana promptissa.

Kokeessa käytettiin kahta mallia. Toinen on Anthropicin Sonnet-malli, joka heidän omien sanojensa mukaan on "the best combination of speed and intelligence", eli tarkoituksella heidän frontier-malliensa (Opus ja Fable) alapuolella. <!-- UUSI (Claude): sinun lainauksesi "sopii hyvin jokapäiväisiin tehtäviin" ei löydy Anthropicin sivuilta; yllä on heidän oma yhden rivin kuvauksensa, lähde otsakekommentissa. --> Toisena mallina ja villikorttina testissä oli uunituore Jev, jonka perusajatus on palauttaa annettuun kysymykseen valmis päätös ja todennäköisyys jokaiselle vastausvaihtoehdolle, ei tekstiä.[^10] Eli paperilla hyvinkin sopiva tällaisen konsulttiyhtiön "mitä tehdä" -kysymykseen. Jevistä koetan kirjoittaa myöhemmin oman pidemmän postauksen.

[^10]: TypeSafe AI julkaisi Jevin 15.9.2026 early access -vaiheessa. Se on heidän "System One" -mallinsa: syötteenä tilanne ja valikko sallittuja vastauksia, tulosteena yksi valinta, todennäköisyys jokaiselle vaihtoehdolle ja luottamusarvo. Vapaata tekstiä se ei tuota lainkaan. Vasteaika tässä kokeessa noin 0,4 sekuntia per kutsu, koko 236 kutsun ajo 25 sekuntia ja 13 senttiä. Kaikki suorituskykyluvut, jotka Jevistä tällä hetkellä löytyvät, ovat TypeSafen omia.

### Tulokset

Ontologia auttaa selvästi tapauksissa, joissa yrityksen oma sanasto ja tavat eivät vastaa kielimalleille opetettua yleistä maailmaa. Kuva alla.

<!-- UUSI (Claude): kuvio artefaktista "Sonnet vs Jev, Whole World" (Where the ontology helps, by question category). Siirrä Koe-lukuun kun se on kirjoitettu. Kategorioiden suomennokset ovat ehdotuksia: disambiguation, terms, time, roles, unanswerable, control. -->
```dumbbell title="KUVIO 1 · MISSÄ ONTOLOGIA AUTTAA"
legend: ilman ontologiaa -> ontologian kanssa
series: Sonnet, Jev
caption: Keskimääräiset pisteet (0–1) kysymystyypeittäin. 59 kysymystä, yksi ajo per kysymys. claude-sonnet-5 · jev-1.13.0
roolit (10): 0,20 -> 0,90 | 0,20 -> 0,50
täsmennys (12): 0,83 -> 1,00 | 0,83 -> 1,00
termit (11): 0,36 -> 0,86 | 0,23 -> 0,82
aika (8): 0,88 -> 1,00 | 0,75
ei vastattavissa (8): 1,00 | 1,00
kontrolli (10): 1,00 | 0,90
```
<!-- /UUSI -->

Kuvateksti: Osumatarkkuus kysymystyypeittäin ilman talon tapoja (ontto) ja niiden kanssa (täytetty).

Löydös tuskin on yllättävä kenellekään, joka on tehnyt kielimallien parissa töitä, mutta se tarjoaa mielenkiintoisen kulman miettiä, voisiko ontologia vakiintua hyödylliseksi tavaksi tehdä context engineeringiä, vai onko tiedon muodolla tai tallennustavalla lopulta väliä. Oikeiden yritysten data laket ja vastaavat ovat toki satakertaisia esimerkin materiaaliin nähden, emmekä tässä tutkineet erilaisia tapoja tuoda tietoa mukaan (ajon aikana, jälkikäteen, ja niin edelleen), ja kokonaisuudessaankin kontekstimme oli melko pieni, vain reilut 10k tokenia. Luultavasti hyvin kirjoitettu system prompt olisi ajanut saman asian. <!-- UUSI (Claude): tämän voi sanoa mitattuna, ks. alaviite 9 --> Itse asiassa ajoi: samat säännöt proosana saivat saman tuloksen. <!-- /UUSI --> Mutta jos voimme muotoilla sen system promptiin tehokkaasti ja automaattisesti, ja vielä kulloiseenkin tehtävään sopivaksi, uskon, että saamme merkittäviä hyötyjä ylläpidon ja token-tehokkuuden kannalta.


<!-- Osa 2, luku 5: "Lopuksi". Timin teksti, Claude korjannut kirjoitusvirheet 2026-09-19. Kaikki Clauden lisäykset ovat UUSI (Claude) -merkkien sisällä. Faktahuomiot: (1) prosenttiluku, ks. kommentti tekstissä; (2) "MakX-myyjäagentti" on uusi nimi, jota lukija ei ole tavannut, luvussa 3 rooli on resursointiagentti. -->

## Lopuksi

SupHumAI:n AI-insinööri istui alas läppärilleen, luki muutaman blogikirjoituksen aiheesta ja rakensi iltapäivässä yhdessä suosikki-LLM:nsä kanssa neljäkymmentärivisen mallinnuksen yrityksen tavoista ja rakenteista, joka nosti heidän kehitteillä olleen resurssointiagentin tulosta kevyellä mallilla parhaimmillaan lähes kolmekymmentä prosenttiyksikköä. C-persoona oli tyytyväinen ja pystyi seuraavalla edustuslounaalla kertomaan, miten heidän yrityksensä itse rakentama ontologia suoriutuu ja miten sellainen ehdottomasti kannattaa ostaa heiltä.

On toki hyvä huomata, että tässä oli kyse enemmän tai vähemmän olemassa olevien järjestelmien päälle rakennetusta ontologiasta eikä niinkään kokonaisvaltaisista dataratkaisuista, joita Databricks, Palantir ja muut tahot tarjoavat. En ole näitä tuotteita itse käyttänyt, enkä pysty kertomaan, miten ne suoriutuvat oikeassa maailmassa tai miten niitä ylläpidetään. Sotatarinoita näistä voi kysyä omalta agentiltaan.

Tällainen ratkaisu ei pelasta yhtään yritystä siltä, jos data on virheellistä, vaikeasti saavutettavaa tai heikosti ylläpidettyä. Mutta se tarjoaa ratkaisun, mikäli agentit eivät ymmärrä dataputkissasi olevaa tietoa. Putkien puuttuessa kannattaa kääntyä isompien pelureiden puoleen.


Tähän päättyy ontologiasarjamme toistaiseksi. Toivottavasti sarjasta on ollut sinulle hyötyä sen hahmottamisessa, mistä asiassa on kyse.


*Tekoälytiedot*

Tämän blogitekstin tiedonhaussa ja kirjoittamisessa on hyödynnetty tekoälyä. Teksti on ensisijaisesti ihmisen kirjoittamaa, mutta sanamuotoja ja oikolukua on tehty tekoälyn toimesta. Tästä syystä tekstistä löytyy luultavasti myös paikka paikoin Anthropicin vesileimat. Tämän blogin ulkoasu ja toteutus on tehty täysin tekoälyn avulla. Otan itse vastuun kaikista tekstissä olevista virheistä ja vääristä lähdemerkinnöistä. Mikäli huomaat merkittävän virheen, laitathan siitä minulle viestiä linkkarissa /tixtixti.


## Lähteet

<!-- Vain tämän luvun lähteet. Loput v3:sta, kun luvut on kirjoitettu. -->

- Gruber, T. R. (2009). ["Ontology."](https://tomgruber.org/writing/ontology-in-encyclopedia-of-dbs.pdf) Teoksessa Liu & Özsu (toim.), *Encyclopedia of Database Systems*. Springer.
- Palantir — [Why create an Ontology?](https://www.palantir.com/docs/foundry/ontology/why-ontology)
- Palantir — [Ontology SDK overview](https://www.palantir.com/docs/foundry/ontology-sdk/overview) (Ontology-as-code, rajatut tokenit)
- Palantir — [Submission criteria](https://www.palantir.com/docs/foundry/action-types/submission-criteria)
- Luong Tuan, T. & Sanyal, A. (2026). [Ontology-Constrained Neural Reasoning in Enterprise Agentic Systems.](https://arxiv.org/abs/2604.00555) arXiv-esijulkaisu, huhtikuu 2026 (rooli-, domain- ja interaktio-ontologiat)
- Zhang, X., Sun, Z., Yang, C., Cui, Y., Guo, L. & Hu, W. (2026). [Toward Effective and Reliable LLM Agents via Dynamic Ontology.](https://arxiv.org/abs/2608.22974) arXiv-esijulkaisu, 24.8.2026 (OaK: kielimalli rakentaa ontologian itse)
- Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software.* Addison-Wesley. (ubiquitous language)
- Fowler, M. [Ubiquitous Language.](https://martinfowler.com/bliki/UbiquitousLanguage.html) martinfowler.com
- Databricks (16.6.2026). [Introducing Genie One, Genie Ontology, and Genie Agents.](https://www.databricks.com/blog/introducing-genie-one-genie-ontology-and-genie-agents)
- Databricks (1.9.2026). [Operationalizing Genie Ontology in your data stack.](https://www.databricks.com/blog/operationalizing-genie-ontology-your-data-stack)
- Atlan (19.5.2026). [What is Active Ontology.](https://atlan.com/know/what-is-active-ontology/); [Enrich metadata at scale (docs)](https://docs.atlan.com/product/capabilities/governance/context-agents-studio/best-practices/enrich-metadata-at-scale)

---