# BotDiscordBase

Este é um template de código para criar um bot Discord. Antes de começar, certifique-se de ter um arquivo `.env` na raiz do projeto, contendo as seguintes variáveis:

```
BOT_TOKEN=<token_do_seu_bot>
BOT_ID=<id_do_seu_bot>
```

## Adicionando Comandos e Eventos Personalizados

Para adicionar comandos personalizados ao seu bot, siga estes passos:

1. Crie um novo arquivo na pasta `commands` com o nome do seu comando, por exemplo `meucomando.js`.
2. No arquivo `meucomando.js`, defina a lógica do seu comando, utilizando a biblioteca Discord.js.
3. Exporte a função do comando para que ela possa ser utilizada pelo bot.

```javascript
// Exemplo de comando personalizado
import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('meucomando')
  .setDescription('Descrição do meu comando')
  
export async function execute(interaction: any) {
  // Lógica do comando aqui
}
```

Para adicionar eventos personalizados ao seu bot, siga estes passos:

1. Crie um novo arquivo na pasta `events` com o nome do seu evento, por exemplo `meuevento.js`.
2. No arquivo `meuevento.js`, defina a lógica do seu evento, utilizando a biblioteca Discord.js.
3. Exporte a função do evento para que ela possa ser utilizada pelo bot.

```javascript
import { Events } from "discord.js";

export const name = Events.ClientReady //O nome Do evento

export const once = false // Define se o evento deve ser executado apenas uma vez

export const execute = async (client:any) => {
  // Lógica do evento aqui
}
```
