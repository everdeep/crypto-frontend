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
    { field: 'id', headerName: 'ID' },
    { field: 'strategy', headerName: 'Strategy' },
    { field: 'currency_pair', headerName: 'Currency Pair' },
    { field: 'interval', headerName: 'Interval' },
    {
        field: 'signal',
        headerName: 'Signal',
        valueFormatter: (params: any) => {
            console.log('params', params);
            return params.value.signal;
        },
    },
    {
        field: 'last_trade_time',
        headerName: 'Last Trade Time',
        cellClass: 'dateStandard',
        minWidth: 150,
        filter: 'agDateColumnFilter',
        filterParams: dateFilterParams,
        valueFormatter: (params: any) => {
            return moment(params.value).format('DD-MMM-YYYY');
        },
    },
];
