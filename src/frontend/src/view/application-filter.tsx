import * as React from 'react';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { Input } from 'nav-frontend-skjema';
import { AsyncDispatch } from '../redux/redux-utils';
import { changefilter, selectFilter } from '../redux/application-filter-duck';

interface StateProps {
    filter: string;
}

interface DispatchProps {
    doFilter: (filter: string) => void;
}

type ApplicationFilterProps = StateProps & DispatchProps;

function ApplicationFilter({doFilter, filter}: ApplicationFilterProps) {
    return <Input label="Filter" onChange={(e) => doFilter(e.target.value)} value={filter}/>;
}

const mapStateToProps = (state: AppState): StateProps => ({
    filter: selectFilter(state)
});

const mapDispatchToProps = (dispatch: AsyncDispatch): DispatchProps => ({
    doFilter: (filter: string) => dispatch(changefilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationFilter);
