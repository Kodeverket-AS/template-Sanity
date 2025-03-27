# Sanity template repo
Dette repositoriet kan brukes for å generere nye Sanity prosjekter. Sanity Studio installasjon er bassert på versjon `"sanity": "3.x",` og vill fungere fram til større versjons oppdateringer.
For å ta i bruk denne templaten må du gjøre noen steg


## Prosjekt instillinger
Dette prosjekter bruk `.env` fil for å lagre detaljer som; **prosjekt id**, **dataset** og **api-versjon**. Denne filen lagres i root directory sammen med `package.json`.
Du kan starte et nytt prosjekt på [sanity.io](https://www.sanity.io) og hente [prosjekt instillinger derfra](https://www.sanity.io/manage)

Vi ønsker at dere ikke skal legge med projectID hardcoded i repositories, selv om dette teknisk sett er public data, dette er for å minifisere exposure. Innholdet i filen skal følge denne modellen
```env
NEXT_PUBLIC_SANITY_API_VERSION=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_PROJECT_ID=
```

## Førstegangs oppset av Sanity Studio
> [!NOTE]
> Hvis du bruker social logins så husk at du har forskjellig bruker utifra hvilken provider du velger.

For å bruke [Sanity CLI](https://www.sanity.io/docs/cli) effektiv anbefaler jeg at du først logger inn med din [sanity.io](https://www.sanity.io) bruker, du kan gjøre dette etter CLI verktøyet er installert `npm i`, eller ved å globalt ligge til `npm install --global sanity@latest`
```console
sanity login
```
Du vill nå ha tilgang på mange cli instruksjoner som du kommer til å bruke senere, for en komplett liste kan du skrive
```console
sanity help
```
Hovedsakelig kommer vi til å bruke: `build`, `deploy`, `dataset`, `schema` og `typegen`, men det skader ikke å gjøre seg kjent med andre funksjonaliteter i [Sanity CLI](https://www.sanity.io/docs/cli)

## Hvordan sitter jeg opp inputs for data
> [!NOTE]
> Du kan lese mer om oppsett av [schema files her](https://www.sanity.io/docs/schemas-and-forms)

For mange nye brukere av Sanity så kan oppsettet være litt annerledes enn det de er vandt med, hvis du har jobbet med PostgreSQL eller andre SQL databaser kan du tenke på en `schema.ts` fil som et table, eller hvis du er vandt til noSQL så er det en collection.

Etter du har lagt til en `mySchema.ts` fil for ditt dataset inni `schemaTypes` mappen, så må du huske å importere den i `/schemaTypes/index.ts`. Jeg vill veldig sterkt anbefale at du også sjekker at denne filen er valid med å kjøre denne kommandoen.
```console
sanity schema validate
```

## Hvordan publisher jeg mitt prosjekt til sanity.io
> [!NOTE]
> Hvis repo bruker vedlagt Github Workflow kan deployments gjøres automatisk ved push til `main` branch.

Etter du har satt opp repo og sjekket at alt fungerer på [localhost](http://localhost:3333/) kan du sitte opp studio for deployment på [sanity.io](https://www.sanity.io). Du kan enten gjøre dette via CLI eller med [Github Workflows](.github/workflows/deploy-sanity.yml).
```console
sanity deploy
```

## Hvordan henter jeg ut types til typescript
Hvis du bruker typescript i prosjektet der du bruker data fra [sanity.io](https://www.sanity.io) kan det være kjekt å ha riktig types tilgjengelig. [Sanity CLI](https://www.sanity.io/docs/cli) har en innebygd kommando som henter ut schema types og gjør dette tilgjengelig i en fil som du kan kopiere over til ditt prosjekt.

Denne processen består av 2 steg, først henter vi ut informasjonen fra alle schemas,
```console
sanity schema extract --path "types/schema.json"
```
så lager vi en `sanity.types.ts` fil som inneholder alle types sanity bruker.
```console
sanity typegen generate
```
Du kan nå bruke `types/sanity.types.ts` filen i ditt prosjekt der typescript blir brukt.

## Hvordan kan jeg bruke flere datasets
Hvis du trenger å ha `production` og `development` datasets er dette mulig ved å sitte opp `sanity.config.ts` til å ha en array av configs. Denne metoden bruker [workspaces](https://www.sanity.io/docs/workspaces) for å ha tilgang til begge samtidig.
```js
export default defineConfig([
  {
    title: 'Template Project Live',
    subtitle: 'production',
    name: 'production-workspace',
    basePath: '/production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development" as string,
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
  {
    title: 'Template Project Preview',
    subtitle: 'development',
    name: 'development-workspace',
    basePath: '/development',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development" as string,
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
])
```
> [!NOTE]
> Hvis du derimot ønsker at `production` dataset skal være tilgjengelig på [sanity.io](https://www.sanity.io), mens `development` kun er tilgjengelig via [localhost](http://localhost:3333/) kan du gjøre dette ved kjøre en sjekk på `process.env.NODE_ENV || 'development'`


## Mer informasjon om Sanity
- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
