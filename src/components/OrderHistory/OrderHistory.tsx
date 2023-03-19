import React, { useState } from 'react';

import { getOrders } from '@src/api/dataService';

import Table from '@src/components/Table';
import { columnDefs, defaultColDef } from './TableConfig';
import { IOrder } from '@src/interfaces';
import { useQuery } from '@tanstack/react-query';

const OrderHistory: React.FC = () => {
    const [rowData, setRowData] = useState<IOrder[]>([]);

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
        queryKey: ['order-history'],
        queryFn: () => getOrders(),
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

export default OrderHistory;
