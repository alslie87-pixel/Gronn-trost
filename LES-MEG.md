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

## Bilder av Lise og Stian
Foreløpig vises initialene L og S. Legg portrettene i assets/ (f.eks. lise.jpg og stian.jpg)
og si ifra, så bytter jeg dem inn.

## Gamle bilder som ikke lenger brukes i repoet
hero.jpg, host.jpg, kontakt.jpg, sommer.jpg, var.jpg, vinter.jpg, vasking.jpg, klargjoring.jpg,
utvidet.jpg og gronntrost_footer.svg i roten kan slettes – alt ligger nå i assets/.
