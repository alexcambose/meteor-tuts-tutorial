import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import Router from './Router';
import { ApolloProvider } from 'react-apollo';
import { initialize } from 'meteor/cultofcoders:apollo';
import client from '/imports/ui/client.js';

const App = props =>
<ApolloProvider client={client}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
</ApolloProvider>;

ReactDOM.render(
    <App />,
    document.getElementById("app")
);