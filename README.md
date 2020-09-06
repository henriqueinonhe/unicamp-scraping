# Unicamp Scraping

Aplicativo que navega pelo site da DAC (https://dac.unicamp.br/), recolhe as informações sobre as matérias/professores e as disponibiliza mostrando a agenda de cada um dos professores.

Atualmente funciona apenas para as matérias de graduação.

## Detalhes de Implementação

O projeto é divido em duas partes, a coleta de dados da DAC e a apresentação desses dados.

Toda a lógica de coleta de dados (scraping) pode ser encontrada em `./src/scraping.ts`.

Todo o resto do projeto cuida do frontend/backend para apresentação dos dados.

Neste momento o scraping deve ser "chamado" manualmente, pois ele tem um overhead significativo (10 - 11 minutos no meu PC).