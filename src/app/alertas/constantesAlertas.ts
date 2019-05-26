export class constantesAlertas {
    public static devolverParamsEMASMARSI(tipo: string): Array<any> {
        return [
            { nombre: "Par base", valor: "Sin asignar", tipo: 'item-label-doslineas' },
            { nombre: "Par contra", valor: "Sin asignar", tipo: 'item-label-doslineas' },
            {
                nombre: "Intervalo de tiempo", valor: "60min", tipo: 'item-single-select', opciones: [
                    { valor: "1min", texto: "1 Minuto" },
                    { valor: "5min", texto: "5 Minutos" },
                    { valor: "15min", texto: "15 Minutos" },
                    { valor: "30min", texto: "30 Minutos" },
                    { valor: "60min", texto: "60 Minutos" },
                    { valor: "daily", texto: "Diario" },
                    { valor: "weekly", texto: "Semanal" },
                    { valor: "monthly", texto: "Mensual" }
                ]
            },
            { nombre: "Periodo de tiempo", valor: "100", tipo: 'item-number-input', placeholder: 'Ej : 50, 100, 200,' },
            {
                nombre: "Tipo de precio", valor: "close", tipo: 'item-single-select', opciones: [
                    { valor: "close", texto: "Precio de cierre" },
                    { valor: "open", texto: "Precio de apertura" },
                    { valor: "high", texto: "Precio maximo (high)" },
                    { valor: "low", texto: "Precio minimo (low)" },
                ]
            },
            { nombre: tipo + " objetivo", valor: "", tipo: 'item-number-input', placeholder: 'Introduzca objetivo deseado' },
        ];
    }

    public static devolverParamsMACD(tipo: string): Array<any> {
        return [
            { nombre: "Par base", valor: "Sin asignar", tipo: 'item-label-doslineas' },
            { nombre: "Par contra", valor: "Sin asignar", tipo: 'item-label-doslineas' },
            {
                nombre: "Intervalo de tiempo", valor: "60min", tipo: 'item-single-select', opciones: [
                    { valor: "1min", texto: "1 Minuto" },
                    { valor: "5min", texto: "5 Minutos" },
                    { valor: "15min", texto: "15 Minutos" },
                    { valor: "30min", texto: "30 Minutos" },
                    { valor: "60min", texto: "60 Minutos" },
                    { valor: "daily", texto: "Diario" },
                    { valor: "weekly", texto: "Semanal" },
                    { valor: "monthly", texto: "Mensual" }
                ]
            },
            {
                nombre: "Tipo de precio", valor: "close", tipo: 'item-single-select', opciones: [
                    { valor: "close", texto: "Precio de cierre" },
                    { valor: "open", texto: "Precio de apertura" },
                    { valor: "high", texto: "Precio maximo (high)" },
                    { valor: "low", texto: "Precio minimo (low)" },
                ]
            },
            { nombre: "Objetivo MACD", valor: "", tipo: 'item-number-input', placeholder: 'Introduzca valor de MACD deseada' },
            { nombre: "Objetivo señal MACD", valor: "", tipo: 'item-number-input', placeholder: 'Introduzca valor de MACD señal deseada' },
            { nombre: "Objetivo Histograma", valor: "", tipo: 'item-number-input', placeholder: 'Introduzca valor de MACD Histograma deseado' }
        ];
    }
}