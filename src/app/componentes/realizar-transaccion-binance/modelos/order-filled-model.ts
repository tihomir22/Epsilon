export interface OrderFilledModel {
    executedQty: number;
    cummulativeQuoteQty: number;
    orderId: number;
    side: string; // venta compra
    status: string;
    symbol: string;
    transactTime: string;
    type: string; // market limit etc
    fills: Array<any>;
}