import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SampleForm from '../form';
import OutputTable from '../table';

const Main = props => (
    <Switch>
        <Route exact path="/" component={SampleForm} />
        <Route exact path="/table" component={OutputTable} />
    </Switch>
);

export default Main;