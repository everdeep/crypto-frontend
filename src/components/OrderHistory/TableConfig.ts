import { useState, useMemo } from 'react';

import moment from 'moment';

export const defaultColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
    filter: true,
};

const dateFilterParams = {
    comparator: (filterLocalDate: any, cellValue: any) => {
        const cellDate = new Date(cellValue);

        // Now that both parameters are Date objects, we can compare
        if (cellDate < filterLocalDate) {
            return -1;
        } else if (cellDate > filterLocalDate) {
            return 1;
        }
        return 0;
    },
};

export const columnDefs = [
    { field: 'order_id', headerName: 'Order Id', hide: true },
    { field: 'currency_pair', headerName: 'Currency Pair' },
    { field: 'status', headerName: 'Status' },
    { field: 'side', headerName: 'Side' },
    { field: 'cost', headerName: 'Price' },
    { field: 'amount', headerName: 'Quantity' },
    { field: 'last_price', headerName: 'Last Price' },
    { field: 'type', headerName: 'Type', sortable: true, filter: true },
    { field: 'limit_price', headerName: 'Limit Price' },
    { field: 'exchange', headerName: 'Exchange' },
    { field: 'autotraded', headerName: 'Autotraded' },
    {
        field: 'created_at',
        headerName: 'Created At',
        cellClass: 'dateStandard',
        minWidth: 150,
        filter: 'agDateColumnFilter',
        filterParams: dateFilterParams,
        valueFormatter: (params: any) => {
            return moment(params.value).format('DD-MMM-YYYY');
        },
    },
    {
        field: 'updated_at',
        headerName: 'Updated At',
        cellClass: 'dateStandard',
        minWidth: 150,
        filter: 'agDateColumnFilter',
        filterParams: dateFilterParams,
        valueFormatter: (params: any) => {
            return moment(params.value).format('DD-MMM-YYYY');
        },
    },
];
