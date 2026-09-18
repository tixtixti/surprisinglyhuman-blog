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

Henkilökohtaisesti olen puhunut kontekstin hallinnan tärkeydestä pitkään kaikessa kielimalleihin liittyvässä työssä. Vaikka frontier-labit laajentavat konteksti-ikkunoitaan ja tuovat uusia työkaluja massiivisten datamäärien käsittelyyn, uskon edelleen, että hyvällä kontekstin hallinnalla ja mallien ohjaamisella saa parempia tuloksia, usein pienemmillä kuluilla. Onko ontologia sitten patternina sellainen, johon kannattaa investoida? Ja voiko sen rakentaa itse, vai pitääkö se ostaa?

SupHumAI:n C-persoona on jo tarttumassa luuriin, kun yrityksen AI-insinööri saapuu paikalle Nocco-tölkin kanssa ja ehdottaa: "Mitä jos kokeiltaisiin ensin itse?"

---


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