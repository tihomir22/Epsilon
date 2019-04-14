
# Epsilon
> Managing your investments in a simple and effective way is a reality..

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]


![](https://i.imgur.com/dRIPw3a.png)



<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki

## Epsilon Progress
* Ultima compilacion exitosa
* https://www.dropbox.com/s/s96d1vw8kifjksu/app-debug.apk?dl=0
* 0.0.1 : Creación de 2 paginas. Login y registro y implementado diseño basico.
* 0.0.2 : Implementada validación en formularios, mejoras graficas, funcionabilidad y preparación para CRUD.
* 0.0.3 : Terminado de implementar registro y login , junto a verificaciones importantes, empezada dashboard post-login
* 0.0.4: Dashboard semifuncional, implementada funcionabilidad de añadir nuevos activos, diseño de interfaz basica, mejorado el CRUD y resueltos bugs menores.
* 0.0.5: implementada searchbar en agregar-activos, creada nueva pagina y funcionabilidad basica, errores menores solucionados
* 0.0.6 : Un usuario ya puede tener activos, tanto criptomonedas como acciones de empresas y se guardan en servidor SQL. Corregidos errores y bugs menores. Interfaz de detalles-activo.page mejorada.Funcionabilidad y estetica mejorada. Modificación de estructura de la BBDD. Preparación para uso de API's externas. Bugs menores visuales arreglados.
* 0.0.7: Implementado funcion de añadir un activo a un usuario , tambien implementado recogida de datos con http.get de la api de cryptocompare para criptomonedas, falta implementar para stocks. Solucionados bugs menores
* 0.0.8: Primera compilación a APK con exito, implementado resumen de todos los activos del usuario, añadido acordeo a los items aportando información extra , sincronización de la API, conversión a USD total en el resumen de la dashboard, implementada venta en agregar-activos, funciones menores. Corto plazo: Implementar graficos, implementar activos de venta ( que funcionen de forma distinta que a los de compra ) , implementar API de stocks , corregir errores de formulario en agregar-activos, agregar más activos en la bbdd

* 0.0.8b : Implementada API para los Stocks y la compra de estos en detalles-activo junto a sus respectivos metodos y comprobaciones , se debe refactorizar el codigo y comenzar a implementar graficos, descubiertos noticias en la API de los stocks. Solucionados bugs menores, mejora de la interfaz grafica y funcionabildiad + Añadido nuevos activos (10 criptomonedas nuevas añadidas) Y BBDD alterada

* 0.0.9: Implementados graficos para criptomonedas y stocks , junto a refactorización del codigo, mejoras visuales y de experencia al usuario y bugs menores

* ALPHA 0.1.0 : Implementación de grafico general del usuario en la dashboard, totalmente funcional,junto a calculo del equivalente en diferentes divisas y tambien preparados datos para graficos especificos. Codigo refactorizado. Bugs menores solucionados

* ALPHA 0.1.1 : Implementada funcion de subir imagenes en local , moverlas y subirlas en la nube por php, tambien funcion de subir imagenes desde camera y tambien redimensionarlas. Implementado avatar en registro y guardado de este en la bbdd. Preparados para implementar el chat

* ALPHA 0.2.0 : Aplazada funcion de chat, añadidas nuevas funciones y componentes, nueva pagina añadida de noticias , se muestran noticias de todos los tipos de activos, stocks y criptos, distribuidas en noticias calientes y noticias normales, el usuario puede agregarlas como favoritas y filtrar por estas. Siguientes progresos : terminar filtro en noticias y empezar a trabajar con el perfil del usuario.
* ALPHA 0.3.0 : Implementada ANALCONDA ( login modificado, ahora carga mucho más rapido y tiene un diseño más acorde | mayor eficiencia en la conexion con el servidor remoto en el dashboard, sincronización con la carga del grafico realizada | sidemenu modificado | creado perfil de usuario junto con caracteristica de modificación de datos del usuario y avatar | implementado primer grafico en el perfil | mejorada del backend y optimización general )

* ALPHA 0.3.1 : ANALCONDA V2 => Implementado segundo grafico en perfil, nuevo componente agregado de apis, conexion con api de Binance establecida por medio de PHP , ahora un usuario puede importar sus balances, creadas nuevas tablas y actualizado diseño de entidades UML

* ALPHA 0.4.0 : Scourge of Iron V1 => Implementado tree -opciones sobre api- junto a subtree, implementada funcionabilidad de balances dinamicos de una API junto a grafico de tipo bars que muestra el tipo de balances, creada una plantilla que será usada para agregar componentes dinamicamente segun lo solicite el usuario, nueva opcion de configuraicón de la app, mejorado el diseño, refactorizado codigo y mejoras menores

* ALPHA 0.4.1 : Scourge of Iron V2 => Modificado componente agregar-activo para que sea reutilizable y ahora se usa en dos paginas, implementado totalmente el cambio de contraseña en ajustes,implementada realizar-trasaccion-binance pagina dedicada a realizar ordenes de compra venta e interactuar con el exchange de BINANCE, se ha implementado la primera compra LIMIT ORDER [SIN PROBAR], mejorado diseño general, cambio de fuente a Barlow y bugs menores
