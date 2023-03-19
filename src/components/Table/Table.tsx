import React, { useRef } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { ExcelStyle } from 'ag-grid-community';

import { ITableProps } from '@src/interfaces';

import './Table.scss';

const excelStyles: ExcelStyle[] = [
    {
        id: 'dateStandard',
        dataType: 'DateTime',
        numberFormat: {
            format: 'dd-mmm-yyyy',
        },
    },
];

const Table: React.FC<ITableProps> = ({
    rowData,
    columnDefs,
    defaultColDef,
}) => {
    const gridRef = useRef();

    return (
        <div
            className='ag-theme-alpine-dark'
            style={{ width: '100%', height: '100%' }}
        >
            <AgGridReact
                className='table'
                ref={gridRef} // Ref for accessing Grid's API
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                excelStyles={excelStyles}
                rowData={rowData}
                onGridReady={(params: any) => {
                    params.api.showLoadingOverlay();
                }}
            ></AgGridReact>
        </div>
    );
};

export default Table;
