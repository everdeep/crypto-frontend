import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './configureStore';

import Application from './components/App';

// Say something
console.log('[ERWT] : Renderer execution started');

// Render application in DOM
createRoot(document.getElementById('app')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Application />
        </PersistGate>
    </Provider>
);
