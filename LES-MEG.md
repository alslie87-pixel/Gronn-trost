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
  i scriptet nederst i index.html. «Ønsket tjeneste»-listen i kontaktskjemaet har de samme
  navnene og prisene og må endres samtidig. Kjøpsvilkårene ligger i vilkaar.html.
- Alle «Bestill»-knapper lenker til `BESTILL_URL` øverst i support.js. Bytt verdien der når
  bestillingssiden får eget domene. support.js er ellers generert kode – ta med linjen hvis
  filen byttes ut. Familiegrav («Ta kontakt») går fortsatt til kontaktskjemaet.

## Bilder av Lise og Stian
Portrettene ligger i assets/lise.jpg og assets/stian.jpg (4:5, 360×450 px).
Bytt filene med samme navn og format for å oppdatere dem.

## Gamle bilder
Ubrukte filer (kontakt.jpg og gronntrost_footer.svg i roten, assets/utvidet.jpg) er slettet.
Bildene i assets/ er komprimert for nettbruk (oktober 2026). Originalene i full oppløsning
ligger utenfor repoet i C:\Users\Alsli\Projects\Gronn-trost-bilder-original\.
Nye bilder bør skaleres ned til maks ~1200 px bredde før de legges inn.
