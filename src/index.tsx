import React from 'react';
import './index.css';
import {store} from "./redux/redux-store";
import {rerenderEntireTree} from "./render";


rerenderEntireTree();

store.subscribe(rerenderEntireTree);

