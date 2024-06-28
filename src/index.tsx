import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { Store } from './Store/Store.ts';
const theme = extendTheme({
    components: {
        Button: {
            size: {
                sm: {
                    fontSize: 'md',
                }
            },
            variants: {
                solid: {
                    bg: '#05a081',
                    color: 'white',
                    fontSize: 'md',
                    _hover: {
                        bg: '#05a081a1',
                        cursor: 'pointer',
                    }

                },
                lightbtn: {
                    bg: 'gray',
                    fontSize: 'md',
                    color: 'white',

                },
                md: {
                    bg: '#05a081',
                    fontSize: 'xl',
                    color: 'white',
                    _hover: {
                        bg: '#05a081a1',
                        cursor: 'pointer',
                    },

                },
            }
        }
    }
}
)


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <ChakraProvider theme={theme}>
        <Provider store={Store}>
            <App />
        </Provider>
    </ChakraProvider>
);
