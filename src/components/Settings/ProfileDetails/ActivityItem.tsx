import React from 'react';

import { IActivity } from '@src/interfaces';

interface IActivityItemProps {
    activity: IActivity;
}

export const ActivityItem: React.FC<IActivityItemProps> = ({activity}) => {

    return (
        <li className='row item'>
            <div className='col'>
                <span>Login</span>
            </div>
            <div className='col'>
                <span>{activity.datetime.toString()}</span>
            </div>
            <div className='col'>
                <span>{activity.remote_addr}</span>
            </div>
            <div className='col'>
                <span>{activity.ip_info.country}</span>
            </div>
        </li>
    );
}