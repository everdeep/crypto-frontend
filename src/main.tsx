import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './configureStore';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'

import Application from './components/App';

// Say something
console.log('[ERWT] : Renderer execution started');

const queryClient = new QueryClient();

// Render application in DOM
createRoot(document.getElementById('app')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
                <Application />
            </QueryClientProvider>
        </PersistGate>
    </Provider>
);
