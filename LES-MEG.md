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
  så en prisendring må gjøres begge steder: Innstillinger i CRM-et og listene over.
- Selvvanningskassen (1 250 kr, 899 kr med helårsavtale) vises i «Ditt stell» bare for årsavtalene
  (ikke for enkeltstell eller klargjøring alene). «Jeg har selvvanningskasse fra før» krysses
  av på bestillingssiden.
- Alle «Bestill»-knapper lenker til `BESTILL_URL` øverst i support.js. Bytt verdien der når
  bestillingssiden får eget domene. support.js er ellers generert kode – ta med linjen hvis
  filen byttes ut. Familiegrav («Ta kontakt») går fortsatt til kontaktskjemaet.
- Kalkulatoren: enkeltstell er valgt fra start. Det byttes bare ut når kunden velger en av de
  tre årsavtalene eller Klargjøring av bed (uten pakke en egen jobb, uten enkeltstell; med en
  årsavtale et tillegg). Vask av gravstein og friske blomster legges til det som er valgt.
- Enkeltstell er «til ønsket dato»: på bestillingssiden kan kunden velge dagen graven skal være
  klar til (merkedag, bursdag, høytid).
- «Bestill dette stellet» i kalkulatoren sender valgt pakke videre som `?pakke=` med koden
  vs, vsh, helaar, enkeltstell eller klargjoring. Julekrans og annet mersalg («Ønsker du
  også?») ligger på bestillingssiden.

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
