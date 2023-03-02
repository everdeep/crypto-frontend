import React from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query'

import { Container } from 'semantic-ui-react';

import './Market.scss';

const Market: React.FC = () => {

    // Access the client
    const queryClient = useQueryClient()

    const marketData = () => {
        return [1,2,3,4,5,6,7,8]
    }
    
    // Queries
    const query = useQuery('market', marketData)
 
    return (
        <Container className='content'>
            <div className='header'>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Symbol
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Market Cap
                        </th>
                        <th>
                            Volume (24h)
                        </th>
                        <th>
                            Circulating Supply
                        </th>
                        <th>
                            Change (24h)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {query.data?.map((item: any) => (
                        <tr key={item}>
                            <td>
                                {item}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </Container>
    );
}

export default Market;