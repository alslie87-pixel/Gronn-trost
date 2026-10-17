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
- Pakker, tillegg og kassepriser står i `packageDefs`, `addonDefs` og `KASSE`/`KASSE_HELAAR`
  i scriptet nederst i index.html. Kjøpsvilkårene ligger i vilkaar.html.
- Kontaktskjemaet er for meldinger, ikke bestilling: «Emne» har faste valg (spørsmål om
  gravstell, familiegrav/befaring, bestilling/avtale, tilbakemelding, annet) og meldingen er
  påkrevd. E-posten til post@gronntrost.no har emnet i tittelen, og «Svar» går rett til
  avsenderen.
- Prisene her er bare visning. Bestillingssiden (gronn-trost-crm) leser prisene fra databasen,
  så en prisendring må gjøres i Innstillinger i CRM-et OG på nettsiden: listene over, teksten i
  «Spørsmål og svar» og JSON-LD-en i `<head>` (se Søk og deling under).
- Selvvanningskassen (1 250 kr, 899 kr med helårsavtale) vises i «Ditt stell» bare for årsavtalene
  (ikke for enkeltstell eller klargjøring alene). «Jeg har selvvanningskasse fra før» krysses
  av på bestillingssiden.
- «Bestill dette stellet» lenker til `BESTILL_URL` øverst i support.js, med valgt pakke i
  `?pakke=`, så kunden lander rett i kassen uten bestillingssidens pakkevalg. Bytt verdien der når
  bestillingssiden får eget domene. support.js er ellers generert kode – ta med linjen hvis
  filen byttes ut (mangler den, bruker siden gronn-trost-crm.vercel.app/bestill).
- «Bestill gravstell» i menyen og på forsiden har ingen pakke ennå, og går derfor til pakkevalget
  under Våre tilbud (#produkter). Kontaktskjemaet brukes bare til familiegrav («Ta kontakt») og
  vanlige meldinger.
- Kalkulatoren: enkeltstell er valgt fra start. Kunden velger én av de tre årsavtalene, eller
  uten avtale: Enkeltstell eller Klargjøring av bed. Klargjøring selges bare som egen tjeneste,
  ikke som tillegg til en årsavtale eller et enkeltstell. Vask av gravstein og friske blomster
  legges til det som er valgt.
- Grankrans til jul (529 kr, bilde assets/grankrans.jpg) tilbys med vår og sommer og vår,
  sommer og høst hele året, og med enkeltstell eller klargjøring om høsten og vinteren
  (september–februar). Helårsavtalen har krans inkludert og får ikke tilbudet. Regelen står i
  `when` i `addonDefs` og må stemme med cart_rules i CRM-databasen (migrasjon 017 i
  gronn-trost-crm) – ellers forsvinner kransen når kunden kommer til kassen.
- Enkeltstell er «til ønsket dato»: på bestillingssiden kan kunden velge dagen graven skal være
  klar til (merkedag, bursdag, høytid).
- «Bestill dette stellet» i kalkulatoren sender valgt pakke videre som `?pakke=` med koden
  vs, vsh, helaar, enkeltstell eller klargjoring. Julekrans og annet mersalg («Ønsker du
  også?») ligger på bestillingssiden.

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
Bildene i assets/ er komprimert for nettbruk (oktober 2026). Originalene i full oppløsning
ligger utenfor repoet i C:\Users\Alsli\Projects\Gronn-trost-bilder-original\. De to største
bildene i fotobåndet er skalert ned til 640 px; originalene ligger i
C:\Users\Alsli\Prosjekter\Gronn-trost-bilder-original\ekstra\.
Nye bilder bør skaleres ned til maks ~1200 px bredde før de legges inn.
