import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLoginActivity } from '@src/api/userService';

import { ActivityItem } from './ActivityItem';

import { IActivity } from '@src/interfaces';

export const ActivityLog: React.FC = () => {
    const [rowData, setRowData] = useState<IActivity[]>([]);

    const onSuccess = (res: any) => {
        // Failed to get orders
        if (res.data.status) {
            return;
        }

        setRowData(res.data);
    };

    const onError = (error: any) => {};

    const { isLoading, refetch } = useQuery({
        queryKey: ['bots'],
        queryFn: () => getLoginActivity(),
        onSuccess,
        onError,
        enabled: true,
    });

    const renderActivityItems = () => {
        const list: any = [];
        rowData.forEach((activity: IActivity, index) => {
            list.push(<ActivityItem key={index} activity={activity} />);
        });
        return list;
    };

    return (
        <div id='activityLog' className='content'>
            <label>Activity Log</label>
            <div className='row header'>
                <div className='col'>
                    <span>Activity</span>
                </div>
                <div className='col'>
                    <span>Date/Time</span>
                </div>
                <div className='col'>
                    <span>IP Adress</span>
                </div>
                <div className='col'>
                    <span>Location</span>
                </div>
            </div>
            <ul className='activity__list'>{renderActivityItems()}</ul>
        </div>
    );
};
