---
title: "Onko Ontologiaa Olemassa? Osa 2: Hyöty_käyttö"
dek: Kolme tapaa rakentaa ontologia, mihin agentti sitä oikeasti tarvitsee, ja onko tästä kaikesta lopulta mitään hyötyä.
tag: ONTOLOGY
date: 2026-09-22
lang: fi
draft: false
---

Ontologiasarjan ensimmäisessä osassa seurasimme sanan *ontologia* matkaa sen syntyjuurilta aina viime päivien LinkedIn-postauksiin. Jos aihe ei ole vielä tuttu, artikkeli löytyy täältä: [Osa 1: Sana ja sen synty](https://surprisinglyhuman.blog/posts/mita-on-ontologia). Lyhyt kertaus kuitenkin siitä, mistä ontologiassa on nykypäivänä tietojenkäsittelytieteessä ja AI-pöhinässä kyse: "ontologia on tarkoitusta varten suunniteltu artefakti, joka mahdollistaa tietämyksen mallintamisen jollakin aihealueella." Kirjoituksen SupHumAI on kuvitteellinen konsulttitalo, jonka agentin pitäisi selvittää, voiko Annan myydä Ruskan projektiin ensi kuussa.

Tässä osassa avaamme tarkemmin, miten ontologian voi toteuttaa, ja seuraamme SupHumAI:n yrityksiä rakentaa sellainen. Lopuksi pohdimme, onko tästä kaikesta lopulta mitään hyötyä.

---

## Valitse oma ontologiasi

### Insinöörin ontologia

Onko Palantirilla sitten monopoli moderniin ontologiaan, vai voiko sellaisen vibetellä kasaan?

Palantirin malli on pohjimmiltaan pitkälle vietyä ontology engineeringiä. Tiimillinen kalliita insinöörejä tulee tutustumaan järjestelmiisi ja mallintaa jokaisen yksikön, esineen, asian, lyijykynän, myyntipalaverin ja niiden väliset suhteet. Kaikki tämä kuvataan Palantirin omalla ontology-as-code-muotoilulla, josta syntyy lopulta koko yrityksen kattava back office. Kutsutaan tätä tapaa vaikka *määritellyksi ontologiaksi*. Tällaisella järjestelmällä olisi siis oikeus toimia koko yrityksen taustajärjestelmänä sekä lukien että kirjoittaen päätöksiä. 

Viime aikoina on esitelty useita muitakin tapoja määritellä *määritelty ontologia*, mutta perusidea on usein sama.[^1] Tällöin syntyy hyvin insinöörimäinen, kaiken kattava mallinnus siitä, mitä todellisuus on ja kuinka se on vuorovaikutuksissa ympärillään. Välittömänä haasteena nousee sanaton vaatimus siitä, että jokaisen yksikön jokaisen entiteetin (rivikoodarista johtoryhmään ja kassajärjestelmään) tulisi toimia jotakuinkin samalla tavalla ja puhua yhtenäistä kieltä.[^2]

[^1]: Luong Tuan & Sanyal (arXiv, huhtikuu 2026) määrittelevät ontologian roolien, domainin ja niiden välisten interaktioiden kautta; palaamme tähän luvussa Talon sanat.

[^2]: Yhtenäinen kieli, *ubiquitous language*, on myös domain-driven designin kovassa ytimessä. Tässä mallissa kehittäjien ja liiketoiminnan pitää puhua samaa, mallista johdettua kieltä. Todellisessa elämässä tämä onkin sitten haastavaa. Muistan käyneeni aikoinaan useita keskusteluja siitä, voiko sana *test* tarkoittaa englanniksi psykologista testiä vai ei. Ymmärrätte varmaan sanan latautuneisuuden softakehityksessä.

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

Tässä Anna mallintuu konsulttina tyypiltään oma ja Ruskan projekti y-tunnuksen kautta projektin tilaan. Kokeilemme myöhemmin hieman vastaavaa tapaa mallintaa asiaa itse.

### Lampunhengen ontologia

Databricksin Genie Ontology edustaa niin sanottua *oppivaa ontologiaa*. Pointti on, että kun yrityksesi tietorakenteet ovat jo valmiiksi Databricksin alustalla tai vastaavassa data lakessa, voit yhdistellä omat taulusi, kyselysi, dashboardit ja muut assettisi ontologiaksi. Genie järjestää nämä auktoriteetin ja relevanssin mukaan ja hakee niistä painavimmat lähteet. Tällainen ontologia ei välttämättä tarjoile lainkaan funktioita tai toimenpiteitä, vaan tarjoaa yrityksen datan fiksusti tarjoiltuna seuraaville agenteille.

Konsulttiyrityksemme tapauksessa yrityksen oma agentti kyselisi oppivaa ontologiaa hyödyntävältä Genien MCP:ltä tietoja Ruskasta, Annoista ja projekteista, yhdistelisi niitä omiin tietoihinsa esimerkiksi päivämäärästä, ja ymmärtäisi, että henkilöstöexcelin neljästä Annasta kolmella on jo merkintä toisessa taulussa aktiivisissa projekteissa.

### Hallittu kaaos

Kolmas tapa yhdistelee kahta edellistä. Atlanin Active Ontology, jota voisi kutsua *hallituksi kontekstiksi*, sitoo metadatan alati muuttuvaan dataan ja toimii kaikkien järjestelmien yläpuolella. Siinä missä Palantir on koko yrityksen kova ydin ja Databricks oma alustansa, hallittu konteksti ottaa kaikki alla olevat järjestelmät (CRM, BI, henkilöstöexcel) ja, saman talon dokumentaation mukaan, lätkii niille tageja sen perusteella, ovatko kuvaukset tekoälyn generoimia vai ihmisen kirjoittamia ja kuka määritelmät omistaa.[^3] Hallitussa kontekstissa on myös tärkeää, että malli kykenisi päivittymään kun alla olevat järjestelmät muuttuvat tai vaihtuvat. 

[^3]: Atlanin dokumentaatio: "AI-generated descriptions are written only where a human-authored description is absent", ja "Every AI-generated description carries a badge so consumers can calibrate trust".

Tästä tuleekin mieleen viime aikoina useasti esiin nousseet ratkaisut yritysten AI-aivoista, LLM-wikeistä ja muista tavoista jäsentää talon kaikki data järkevästi samaan laariin. Ontologian kannalta huomio kannattaa kuitenkin kiinnittää juuri tageihin sekä asioiden välisiin hierarkioihin ja suhteisiin.

Konsulttiyrityksen tapauksessa loppukäyttö olisi hyvin samankaltaista kuin oppivan ontologian kanssa, mutta alla oleva järjestelmä olisi joukko erillisiä palveluita eikä yksi keskitetty data lake. 

---

## Taikapölyä vai todellista?

Jos keisareilta riisutaan vaatteet, mitä jää jäljelle? Loppujen lopuksi kaikki kolme myyvät samaa sisältöä: jotain, joka kertoo agentillesi, mitä sana "tarjous" juuri tässä kontekstissa ja yrityksessä tarkoittaa. Mutta miksi tämä on niin tärkeää agentteille?


### Kulma, jota frontierin valo ei kosketa

Jokainen meistä on varmasti huomannut, miten yleisesti huonompia vastauksia kielimalleilta saa, kun niiltä kysyy asioita suomeksi. Tämä johtuu pitkälti siitä, että koulutusaineistoissa ei juuri ole ollut suomen kieltä tai suomalaista materiaalia, ja vaikka nykyään malleilla on koko internet troolattuna, niin on englanninkielisen materiaalin osuus siltikin noin satakertainen kotikieleemme nähden.[^4][^5] 
Vaikka kieli olisikin englantia tai muuta yleiskieltä puuttuvat kielimalleilta tieto juuri SupHumAI:n tavoista ja kommunikaatioista. Tähän liittyen kuulin aivan loistavan esimerkin eräältä "Distinguished Management Consultant"-titteliä kantavalta henkilöltä; Vaikka minulla olisi Gordon Ramsayn keittokirja ja raaka-aineet ei minun annoksestani tulisi yhtä laadukasta ja samalla tavalla valmistettua kuin Gordonin. En minä tiedä missä kohdin suolaa pitää maistaa, mitä raaka-aineissa tulisi ottaa huomioon ja tuskin edes tietäisin mitä kirjan kokkitermit tarkoittaisivat. 

[^4]: Common Crawlin tuoreimmassa haravoinnissa (CC-MAIN-2026-34) englanti on sivun pääkielenä 40,5 prosentilla sivuista ja suomi 0,38 prosentilla. Eroa on siis noin satakertaisesti.

[^5]: Kirjoitan suomeksi pitkälti siksi, ettei juuri kukaan muu tee sitä. Lisäksi olen lopen kyllästynyt lukemaan aina samalta kuulostavaa englantia. Yleisimpien tekoälyjen tuottamat "ei X vaan Y" sun muut patternit enemmän lannistavat kuin helpottavat lukemista. Toki en minäkään tätä täysin ilman kielimalleja tee. Ks. Tekoälytiedot.

Tätä varten tekoäly-agentit ja yritykset tarvitsevat ontologiaa. 
Onko ontologia sitten patternina sellainen, joka kannattaa ottaa mukaan työkalupakkiin vai kannattaako sellainen ennemmin käydä ostamassa Puuilosta? 

SupHumAI:n C-persoona on jo tarttumassa luuriin, kun yrityksen AI-insinööri saapuu paikalle Nocco-tölkin kanssa ja ehdottaa: "Mitä jos kokeiltaisiin ensin itse?"

---

### Talon sanat

Lähdetään rakentamaan omaa kevyttä ontologiaa kuvitteellisen henkilöstöexcelien ja CRM:ien päälle. Otetaan selkeyden vuoksi pohjaksi Luong Tuanin ja Sanyalin arXivissa julkaisema paperi, jossa ontologia määritellään kolmikerroksisena.[^6] Roolit: mitä rooleja yrityksessä on ja mitä ne saavat päättää. Domain: business-entiteetit ja rajoitteet, eli mitkä tämän yrityksen talon sanat ovat. Interaktiot, eli millaisissa raameissa edellä mainitut saavat toimia vuorovaikutuksessa. Tämä on toki vain yksi tapa määritellä ontologia, mutta esimerkin tapauksessa tämä on hyvä pohja rakentaa konsultointia ilman pakottamista mihinkään tiettyyn muottiin.

[^6]: Luong Tuan & Sanyal (arXiv, huhtikuu 2026). Ontologialla pohjustetut agentit pysyivät roolissaan merkitsevästi paremmin.

Kokeen promptit ja ontologia ovat englanniksi ja data suomeksi. Suluissa olevat suomenkieliset sanat sitovat englanninkielisen määritelmän CRM:n suomenkieliseen sisältöön. Alla kokeessa käytetyt esimerkit.

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

Huomioidaan tässä kohdassa erityisesti *domainin* rajoitteet. Mitä tarkoittaa myydä, kuka on asiakas, mikä on tarjous ja mikä ei ole. Yllä olevasta määritelmästä on sitten mahdollista parsimalla johtaa seuraava prompti:

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

Mikä vaikutus tällä promptilla sitten on? Miksi nähdä kauhea vaiva siihen, että saadaan noin 250 tokenin prompti survottua jokaiseen kyselyyn mukaan?[^7]

[^7]: Kontekstinhallinnasta: On yleisesti parempi toistaa tärkeät tiedot pyynnön alussa. Samasta syystä Claude Coden `CLAUDE.md` ladataan jokaisen session alussa ja luetaan levyltä uudestaan kompaktoinnin jälkeen. Anthropicin dokumentaation sanoin tiedosto on "context rather than enforced configuration".

Alla otoksia oikeista ajoista.[^8]

[^8]: Claude Sonnet, koko yrityksen data kerralla näkyvissä. Ainoa ero vastausten välillä on, oliko yllä oleva prompti mukana.

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

Virheellinen tulkinta.

Kanssa:

> Ruska's only relevant project (P001) is still a tender, not signed/active, so no consultant can be sold to it. Anna Korhonen (K001) becomes free 2026-10-01, but there is no valid Ruska project to confirm her on yet.

Oikea tulos.

## Koe

### Testisetuppi

Tämä testi on tehty käyttäen keskisarjan kielimallia (Claude Sonnet 5), melko suppeaa tekoälyn generoimaa materiaalia, ja varsinainen testi on ajettu puoliautonomisesti Claude Coden avustuksella. Kyseiset tulokset ovat korkeintaan viitteellisiä, eikä niitä tule ottaa totuutena. Testin ontologiaa, prompteja tai muutakaan harnessia ei ole optimoitu mitään mallia silmällä pitäen. Testi on myös rakennettu niin, että ontologiasta oletetaan olevan hyötyä.[^9]

[^9]: Koodi, data, kysymykset ja jokainen raaka vastaus ovat [repossa](https://github.com/tixtixti/ontology-bench).

SupHumAI. Neljästäkymmenestä työntekijästä neljä Annaa ja kymmenen asiakasta. Dataan on rakennettu ansoja, joita oikeassa maailmassa voisivat tulla vastaan: valmiita projekteja, joihin on yhä staffattu työntekijöitä, täydellisesti sopivia konsultteja, jotka eivät ole vapaana, ja niin edelleen.

Setupissa on esitetty 59 erilaista kysymystä, jotka edustavat kuutta alityyppiä: Roolitus, täsmennys, oman termistön hyödyntäminen, ajankohdat, kysymyksiä joihin ei ole vastausta, ja kontrolli, joka on puhdasta datan hakemista. Kaikki kysymykset ajettiin kahteen kertaan: kerran pelkkänä syötteenä, jossa mukana kaikki materiaali ja kysymys, toisen kerran niin, että ontologiasta johdettu pätkä oli mukana promptin alussa.

Kokeessa käytettiin kahta mallia. Toinen on Anthropicin Sonnet-malli, joka heidän omien sanojensa mukaan on "the best combination of speed and intelligence", eli tarkoituksella heidän frontier-malliensa (Opus ja Fable) alapuolella. Toisena mallina ja villikorttina testissä oli uunituore Jev, jonka perusajatus on palauttaa annettuun kysymykseen valmis päätös ja todennäköisyys jokaiselle vastausvaihtoehdolle.[^10] Eli paperilla hyvinkin sopiva tällaisen konsulttiyhtiön "minkä vaihtoehdon valitsisin" -kysymykseen. Jevistä koetan kirjoittaa myöhemmin oman pidemmän postauksen.

[^10]: TypeSafe AI julkaisi Jevin 15.9.2026 early access -vaiheessa. Se on heidän "System One" -mallinsa: syötteenä tilanne ja valikko sallittuja vastauksia, tulosteena yksi valinta, todennäköisyys jokaiselle vaihtoehdolle ja luottamusarvo.

### Tulokset

Oletuksen mukaisesti ontologia auttaa selvästi tapauksissa, joissa yrityksen oma sanasto ja tavat eivät vastaa kielimalleille opetettua yleistä maailmaa. Kuva alla.

```dumbbell title="KUVIO 1 · MISSÄ ONTOLOGIA AUTTAA"
legend: ilman ontologiaa -> ontologian kanssa
series: Sonnet, Jev
caption: Keskimääräiset pisteet (0–1) kysymystyypeittäin ilman talon sanoja (ontto) ja niiden kanssa (täytetty). claude-sonnet-5 · jev-1.13.0
roolit (10): 0,20 -> 0,90 | 0,20 -> 0,50
täsmennys (12): 0,83 -> 1,00 | 0,83 -> 1,00
termit (11): 0,36 -> 0,86 | 0,23 -> 0,82
aika (8): 0,88 -> 1,00 | 0,75
ei vastattavissa (8): 1,00 | 1,00
kontrolli (10): 1,00 | 0,90
```

Vaikka tulos on kuuluisassa "Tämä on vettä."[^11] kategoriassa tarjoaa se mielenkiintoisen kulman miettiä, voisiko ontologia vakiintua hyödylliseksi ja määritellyksi tavaksi tehdä kontekstin hallintaa yritysten omien prosessien mallintamisessa, vai onko tiedon muodolla tai tallennustavalla lopulta väliä. Oikeiden yritysten data laket ja vastaavat ovat toki satakertaisia esimerkin materiaaliin nähden, emmekä tässä tutkineet erilaisia tapoja tuoda tietoa mukaan (ajon aikana, jälkikäteen, ja niin edelleen). Luultavasti hyvin kirjoitettu system prompt olisi ajanut tämän testin kannalta saman asian. Onkin sitten oma pohdintansa että onko helpompi ylläpitää system promptia talon sanoista ja tavoista vai muotoilla se insinöörimäisemmäksi ennalta sovitulla määrittelyllä. Lienee maku- ja tottumusasioita pienessä skaalassa. 

[^11]: https://www.youtube.com/watch?v=GXMzNZABSK4

---

## Lopuksi

SupHumAI:n AI-insinööri istui alas läppärilleen, luki muutaman blogikirjoituksen aiheesta ja rakensi iltapäivässä yhdessä suosikki-LLM:nsä kanssa neljäkymmentärivisen mallinnuksen yrityksen tavoista ja rakenteista, joka paransi heidän kehitteillä olleen resursointiagentin vastauksia keskisarjan mallilla keskimäärin reilut 25 prosenttiyksikköä. C-persoona oli tyytyväinen ja pystyi seuraavalla myyntilounaalla kertomaan, miten heidän yrityksensä itse rakentama ontologia suoriutuu annetuista resursointitehtävistä ja miten tämä ehdottomasti kannattaa ostaa heiltä.

On toki hyvä huomata, että tässä oli kyse enemmän tai vähemmän olemassa olevien järjestelmien päälle rakennetusta ontologiasta eikä niinkään kokonaisvaltaisista dataratkaisuista, joita Databricks, Palantir ja muut tahot tarjoavat. En ole tällaisia tuotteita itse käyttänyt, enkä pysty kertomaan, miten ne suoriutuvat oikeassa maailmassa tai miten niitä ylläpidetään. 

Tällainen ratkaisu ei myöskään pelasta yhtään yritystä siltä, jos data on virheellistä, vaikeasti saavutettavaa tai heikosti ylläpidettyä. Mutta voisi se tarjota ratkaisun, mikäli agentit eivät ymmärrä dataputkissasi olevaa tietoa. Putkien puuttuessa kannattaa kääntyä isompien pelureiden puoleen.

Tähän päättyy ontologiasarjamme toistaiseksi.


*Tekoälytiedot*

Tämän blogitekstin tiedonhaussa ja kirjoittamisessa on hyödynnetty tekoälyä. Teksti on ensisijaisesti ihmisen kirjoittamaa, mutta sanamuotoja ja oikolukua on tehty tekoälyn toimesta. Tästä syystä tekstistä löytyy luultavasti myös paikka paikoin Anthropicin vesileimat. Tämän blogin ulkoasu ja toteutus on tehty täysin tekoälyn avulla. Otan itse vastuun kaikista tekstissä olevista virheistä ja vääristä lähdemerkinnöistä. Mikäli huomaat merkittävän virheen, laitathan siitä minulle viestiä linkkarissa /tixtixti.

---

## Lähteet

- Gruber, T. R. (2009). ["Ontology."](https://tomgruber.org/writing/ontology-in-encyclopedia-of-dbs.pdf) Teoksessa Liu & Özsu (toim.), *Encyclopedia of Database Systems*. Springer. (johdannon määritelmä)
- Palantir — [Why create an Ontology?](https://www.palantir.com/docs/foundry/ontology/why-ontology) (Insinöörin ontologia)
- Palantir — [Ontology SDK overview](https://www.palantir.com/docs/foundry/ontology-sdk/overview) (ontology-as-code)
- Palantir — [Submission criteria](https://www.palantir.com/docs/foundry/action-types/submission-criteria) (`ontologia.yaml`:n `submissionCriteria`)
- Luong Tuan, T. & Sanyal, A. (2026). [Ontology-Constrained Neural Reasoning in Enterprise Agentic Systems.](https://arxiv.org/abs/2604.00555) arXiv-esijulkaisu, huhtikuu 2026. (roolit, domain ja interaktiot; alaviitteet 1 ja 6)
- Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software.* Addison-Wesley. (ubiquitous language; alaviite 2)
- Fowler, M. [Ubiquitous Language.](https://martinfowler.com/bliki/UbiquitousLanguage.html) martinfowler.com (alaviite 2)
- Databricks (16.6.2026). [Introducing Genie One, Genie Ontology, and Genie Agents.](https://www.databricks.com/blog/introducing-genie-one-genie-ontology-and-genie-agents) (Lampunhengen ontologia)
- Databricks (1.9.2026). [Operationalizing Genie Ontology in your data stack.](https://www.databricks.com/blog/operationalizing-genie-ontology-your-data-stack) (Lampunhengen ontologia)
- Atlan (19.5.2026). [What is Active Ontology.](https://atlan.com/know/what-is-active-ontology/) (Hallittu kaaos)
- Atlan — [Enrich metadata at scale](https://docs.atlan.com/product/capabilities/governance/context-agents-studio/best-practices/enrich-metadata-at-scale) (dokumentaatio; alaviitteen 3 lainaukset)
- Common Crawl — [Statistics of Common Crawl Monthly Archives: Distribution of Languages](https://commoncrawl.github.io/cc-crawl-statistics/plots/languages.html); raakadata [languages.csv](https://commoncrawl.github.io/cc-crawl-statistics/plots/languages.csv). (CC-MAIN-2026-34, sivun pääkieli CLD2:lla tunnistettuna; alaviite 4)
- Anthropic (29.9.2025). [Effective context engineering for AI agents.](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (kontekstinhallinta; alaviite 7)
- Anthropic — [How Claude remembers your project](https://code.claude.com/docs/en/memory) (Claude Code -dokumentaatio; alaviitteen 7 lainaus)
- Anthropic — [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview) (Sonnet-lainaus, Testisetuppi)
- TypeSafe — [API reference](https://docs.typesafe.ai/api) (Jev; alaviite 10)
- GIGAZINE (16.9.2026). [System One / Jev.](https://gigazine.net/gsc_news/en/20260916-system-one-jev/)
- DataCamp — [System One models: Jev.](https://www.datacamp.com/blog/system-one-models-jev)
- Oma koe: [github.com/tixtixti/ontology-bench](https://github.com/tixtixti/ontology-bench) (koodi, data, kysymykset ja jokainen raaka vastaus; alaviite 9)

---