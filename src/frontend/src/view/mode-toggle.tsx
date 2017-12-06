import * as React from 'react';
import * as cls from 'classnames';
import DashboardMode from './dashboard-mode';
import { ToggleGruppe, ToggleKnapp } from 'nav-frontend-toggle';
import AppState from '../redux/app-state';
import { selectDashboardMode } from './view-selector';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { changeMode } from './view-duck';
import { ChangeEvent } from 'react';

interface OwnProps {
    className?: string;
}

interface StateProps {
    mode: DashboardMode;
}

interface DispatchProps {
    changeModeTo: (mode: DashboardMode) => void;
}

type ModeToggleProps = OwnProps & StateProps & DispatchProps;

function ModeToggle({
                        className,
                        changeModeTo,
                        mode
                    }: ModeToggleProps) {

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        changeModeTo(parseInt(e.target.value, 10));
    }

    return (
        <div className={cls('mode-toggle', className)}>
            <ToggleGruppe name="mode-toggle" onChange={onChange}>
                <ToggleKnapp
                    checked={mode === DashboardMode.USER_STORY}
                    value={DashboardMode.USER_STORY.toString()}
                >Brukerhistorier</ToggleKnapp>
                <ToggleKnapp
                    checked={mode === DashboardMode.APPLICATION}
                    value={DashboardMode.APPLICATION.toString()}
                >Applikasjoner</ToggleKnapp>
            </ToggleGruppe>
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    mode: selectDashboardMode(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    changeModeTo: (mode: DashboardMode) => dispatch(changeMode(mode))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeToggle);
