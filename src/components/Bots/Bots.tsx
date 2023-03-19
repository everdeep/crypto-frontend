import React, { useState } from 'react';

import { getBots } from '@src/api/dataService';

import Table from '@src/components/Table';
import { columnDefs, defaultColDef } from './TableConfig';

import { ICurrencyPairConfig } from '@src/interfaces';
import { useQuery } from '@tanstack/react-query';

const Bots: React.FC = () => {

    const [rowData, setRowData] = useState<ICurrencyPairConfig[]>([]);

    const onSuccess = (res: any) => {
        // Failed to get orders
        if (res.data.status) {
            return;
        }

        const { data } = res.data;
        setRowData(res.data);
    };

    const onError = (error: any) => {};

    const { isLoading, refetch } = useQuery({
        queryKey: ['bots'],
        queryFn: () => getBots(),
        onSuccess,
        onError,
        enabled: true,
    });

    return (

        <Table
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
        />
    );
};

export default Bots;