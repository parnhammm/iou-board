import React from 'react';
import ReactDOM from 'react-dom';
import IOUBoard from './Components/IOUBoard';

//This is the entry point to our web app.
//We tell the browser to load up this javascript file and the first thing we do
//is render our main component (IOUBoard)
ReactDOM.render(
    <IOUBoard />,
    //The element to render our IOUBoard into
    document.getElementById('root')
);
