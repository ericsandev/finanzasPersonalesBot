# Finanzas Personales Bot
Con tu bot de telegram podrás envíar tus gastos diarios automáticamente a una hoja de cálculo de Google.

## Primeros pasos
- Abre tu app de telegram
- Busca @BotFather, selecciona "/newbot", dale el nombre de bot y el nombre público del bot
- Copia el token para acceder a la API
- Crea una nueva hoja de Google Sheets 👇 [Ver configuración](https://github.com/ericsandev/finanzasPersonalesBot/edit/main/README.md#setup-goolge-sheet)
- En el menú de Google Sheets busca Extensiones > Apps Script
- Si te aparece ya creado Code.gs, reemplaza ese código por el de este repositiorio.
- Realiza el Setup Code.gs 👇 [Ver configuración](https://github.com/ericsandev/finanzasPersonalesBot/edit/main/README.md#setup-codegs)

## Setup Goolge Sheet
Crea una hoja de Google Sheet con lo siguiente:
- A1 = Presupuesto
- A2 = Gastos
- A3 = Blance
- A4 = Fecha
- B4 = Producto
- C4 = Precio
- Establezca "= Sum (C: C)" en la celda B2
- Establezca "= B1-B2" en la celda B3.

## Setup Code.gs
En el código coloca tus datos correctamente:
- Token de bot
- Webappurl 👇 [Ver configuración](https://github.com/ericsandev/finanzasPersonalesBot/edit/main/README.md#extras)
- ID de usuario 👇 [Ver configuración](https://github.com/ericsandev/finanzasPersonalesBot/edit/main/README.md#extras)
- ID de hoja de cálculo. 👇 [Ver configuración](https://github.com/ericsandev/finanzasPersonalesBot/edit/main/README.md#extras)
- Selecciona setWebhook() y da clie en Ejecutar.
- Abre tu app de telegram
- Ve a @BotFather y da clic en el enlace a tu bot
- El el chat de tu bot da clic en Iniciar
- Te responderá el Bot con /start
- Listo puedes hacer uso de tu bot.

## Extras
- Busca @userinfobot en telegram para obtener tu ID de usuario, luego reemplácelo en el código
- Obten el ID de hoja de cálculo después de https: //docs.google.com/spreadsheets/d/...
- Para obtener la Webappurl haz clic en el botón Implementar > Nueva Implementación > Aplicación > Cualquier persona tenga acceso. Copiar el link  https://script.google.com/macros/s/...

## Conversación del bot
- Presupuesto = Te dirá el presupuesto que tienes
- Presupuesto + [nunmero] = Añadirás presupuesto al existente
- Gastos = Ver los gastos
- [producto] - [precio] = Añades un gasto en donde producto es texto y precio debe ser un número
- Eliminar anterior - elimina la última fila de la hoja que en teoría es el último producto introducido.
- Si el usuario no hace match con tu validación de id no podrá convrsar con el bot

### Actualizado 27/02/2023
