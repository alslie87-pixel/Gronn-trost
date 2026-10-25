# Grønn Trøst – ny nettside

Innholdet i denne mappen er hele nettsiden, klar til å legges rett i roten av GitHub-repoet (alslie87-pixel/Gronn-trost).

## Slik publiserer du
1. Åpne repoet på github.com → «Add file» → «Upload files».
2. Dra inn ALT fra denne mappen: index.html, support.js, mappene assets/ og patterns/.
   (Den gamle index.html blir erstattet. Behold api/ og package.json som de er.)
3. Skriv en commit-melding, f.eks. «Ny design», og trykk «Commit changes».
4. Vercel bygger og publiserer automatisk på gronntrost.no.

## Kontaktskjemaet
Skjemaet sender til /api/send-contact (samme funksjon som før), så det virker uten endringer
så lenge RESEND_API_KEY fortsatt ligger i Vercel.

## Priser og bestilling
- Pakker og kassepriser står i `packageDefs` og `KASSE`/`KASSE_HELAAR` i scriptet nederst i
  index.html. Tilleggene (vask av gravstein, friske blomster, gravkrans til jul) selges bare i
  kassen på bestillingssiden, ikke på nettsiden (beslutning oktober 2026). Kjøpsvilkårene
  ligger i vilkaar.html.
- Kontaktskjemaet er for meldinger, ikke bestilling: «Emne» har faste valg (spørsmål om
  gravstell, familiegrav/befaring, bestilling/avtale, tilbakemelding, annet) og meldingen er
  påkrevd. E-posten til post@gronntrost.no har emnet i tittelen, og «Svar» går rett til
  avsenderen.
- Prisene her er bare visning. Bestillingssiden (gronn-trost-crm) leser prisene fra databasen,
  så en prisendring må gjøres i Innstillinger i CRM-et OG på nettsiden: listene over, teksten i
  «Spørsmål og svar» og JSON-LD-en i `<head>` (se Søk og deling under).
- Selvvanningskassen (1 250 kr, 899 kr med helårsavtale) vises i «Ditt stell» bare for årsavtalene
  (ikke for enkeltstell). «Jeg har selvvanningskasse fra før» krysses av på bestillingssiden.
- «Bestill dette stellet» lenker til `BESTILL_URL` øverst i support.js, med valgt pakke i
  `?pakke=`, så kunden lander rett i kassen uten bestillingssidens pakkevalg. Bestillingssiden
  har eget domene (2026-10-25): https://bestill.gronntrost.no — samme adresse står i
  index.html sine JSON-LD-lenker. support.js er ellers generert kode – ta med linjen hvis
  filen byttes ut (mangler den, bruker siden bestill.gronntrost.no/bestill).
- «Bestill gravstell» i menyen og på forsiden har ingen pakke ennå, og går derfor til pakkevalget
  under Våre tilbud (#produkter). Kontaktskjemaet brukes bare til familiegrav («Ta kontakt») og
  vanlige meldinger.
- Kalkulatoren: helårsavtalen er valgt fra start (innstillingen `startPlan` = 'helår' i
  `data-props` på scriptet; 'tom' gir enkeltstell). Kunden velger én av de tre årsavtalene,
  eller enkeltstell uten avtale. Klargjøring av bed og vask av gravstein selges ikke lenger
  alene (oktober 2026); vask er bare et tillegg i kassen. Under «Bestill dette stellet» står
  linjen om at vask, friske blomster og gravkrans til jul kan legges til i neste steg.
- Gravkrans til jul (529 kr) tilbys i kassen med vår og sommer og vår, sommer og høst hele
  året, og med enkeltstell om høsten og vinteren (september–februar). Helårsavtalen har krans
  inkludert og får ikke tilbudet. Reglene står i cart_rules i CRM-databasen (migrasjon 017 og
  019 i gronn-trost-crm). Bildene av tilleggene (assets/vasking.jpg, assets/baerekraft.jpg,
  assets/gravkrans.jpg) brukes også i kassen – kopiene ligger i gronn-trost-crm/assets/produkter/.
- Enkeltstell er «til ønsket dato»: på bestillingssiden kan kunden velge dagen graven skal være
  klar til (merkedag, bursdag, høytid).
- «Bestill dette stellet» i kalkulatoren sender valgt pakke videre som `?pakke=` med koden
  vs, vsh, helaar eller enkeltstell. Tilleggene («Vil du legge til noe?») ligger på
  bestillingssiden.

## Søk og deling (SEO)
- Tittel, beskrivelse, canonical-adresse og Open Graph (bildet ved deling på Facebook o.l.)
  står øverst i `<head>` i index.html og vilkaar.html. Hovedadressen er https://gronntrost.no/
  (uten www).
- Strukturerte data for Google og AI-søk ligger i `<script type="application/ld+json">` i
  `<head>` på index.html: bedriften (LocalBusiness med telefon, e-post, org.nr og de 12
  kommunene), de fire pakkene med pris (Service) og spørsmålene (FAQPage).
- «Spørsmål og svar» (#faq, mellom Om oss og Kontakt) står som vanlig tekst i malen, ikke i en
  liste i scriptet, så søkemotorer og AI-søk som ikke kjører JavaScript også ser den. Teksten må
  være helt lik i seksjonen og i FAQPage – endrer du ett svar, endre det begge steder.
- Favikonet (favicon.ico med 16/32/48 px, favicon-96.png, apple-touch-icon.png) er buen med
  blomsten fra logo.svg i krem på grønt, uten ordmerket. Linjene i blomsten er gjort litt
  tykkere så den leses i liten størrelse.
- google3254591baec68643.html i roten bekrefter eierskapet i Google Search Console. Google
  sjekker den jevnlig – den må aldri slettes eller endres.
- sitemap.xml lister forsiden og vilkaar.html. Oppdater `lastmod` når innholdet endres mye, og
  legg til nye sider der. robots.txt slipper inn alle søkemotorer og AI-søk og peker på sitemapen.

## Trygghetsseksjonen
Bygget etter designet «Trygghet 1a + 2a» (Design-mappen). De fire løftene står i lista
`trygghet` i scriptet: tittel, tekst, ikon (assets/ikoner/: hjerte, vannkanne, blomst, vann) og
bildet som brukes på mobil (`img`, format `ar` og utsnitt `pos`).
- Desktop (bredere enn 1024 px): fotomur til venstre fra lista `fotomur` – et rutenett på 3 × 3,
  der `area` er rad / kolonne / rad-slutt / kolonne-slutt – og løftene som liste med ikon til høyre.
- Mobil og nettbrett: ett bilde per løfte, med ikonet i en rund merkelapp på bildekanten.
Alle bildene ligger i assets/ekstra/ og trenger en beskrivende alt-tekst. host-lyng-gravlykt.jpg
brukes ikke lenger, men ligger der fortsatt.

## Bilder av Lise og Stian
Portrettene ligger i assets/lise.jpg og assets/stian.jpg (4:5, 360×450 px).
Bytt filene med samme navn og format for å oppdatere dem.

## Gamle bilder
Ubrukte filer (kontakt.jpg og gronntrost_footer.svg i roten, assets/utvidet.jpg) er slettet.
assets/klargjoring.jpg brukes ikke lenger etter at klargjøring av bed gikk ut av kalkulatoren
(oktober 2026), men ligger der fortsatt.
Bildene i assets/ er komprimert for nettbruk (oktober 2026). Originalene i full oppløsning
ligger utenfor repoet i C:\Users\Alsli\Projects\Gronn-trost-bilder-original\. De to største
bildene i fotobåndet er skalert ned til 640 px; originalene ligger i
C:\Users\Alsli\Prosjekter\Gronn-trost-bilder-original\ekstra\.
Nye bilder bør skaleres ned til maks ~1200 px bredde før de legges inn.
