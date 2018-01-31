import * as React from 'react';
import { connect } from 'react-redux';
import { Sidetittel } from 'nav-frontend-typografi';
import Miljovelger from './miljovelger';

interface StateProps {
    valgtFromEnv: string;
    valgtToEnv: string;
}

interface DispatchProps {
    doHentInfoForPromotering: () => void;
    doEndreValgtMiljo: (fromEnv: string, toEnv: string) => void;
}

type PromoteringProps = DispatchProps & StateProps;

class Promotering extends React.Component<PromoteringProps> {
    constructor(props: PromoteringProps) {
        super(props);
        this.handleChangeMiljo = this.handleChangeMiljo.bind(this);
    }

    handleChangeMiljo(fromEnv: string, toEnv: string) {
        this.props.doEndreValgtMiljo(fromEnv, toEnv);
    }

    render() {
        return (
            <article>
                <Sidetittel className="blokk-s">Promotering og oversikt</Sidetittel>
                <Miljovelger onChange={this.handleChangeMiljo} fromEnv="q6" toEnv="p" />
            </article>
        );
    }
}

export default connect()(Promotering);
