export interface ITableProps {
    rowData: any;
    columnDefs: any;
    defaultColDef: any;
}

export interface IOrder {
    order_id: string;
    currency_pair: string;
    status: string;
    side: string;
    cost: number;
    amount: number;
    last_price: number;
    type: string;
    limit_price: number;
    exchange: string;
    autotraded: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface IBot {
    id: number;
    strategy: string;
    currency_pair: string;
    interval: string;
    signal: string;
    last_trade_time: Date;
}

export interface ICurrencyPairConfig {
    id: number;
    asset_allocation: number;
    autotrade: boolean;
    currency_pair: string;
    exchange: string;
    interval: string;
    is_simulated: boolean;
    limit: number;
    signal: ISignal;
    stop_loss: number;
    strategy: string;
    strategy_config: IStrategyConfig[];
    take_profit: number;
    tradeable: boolean;
    updated_at: Date;
}

export interface ISignal {
    id: number;
    signal: string;
    last_trade_time: Date;
    updated_at: Date;
}

export interface IStrategyConfig {
    id: number;
    strategy: string;
    key: string;
    value: string;
}
