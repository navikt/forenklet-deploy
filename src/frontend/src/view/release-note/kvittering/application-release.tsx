import * as React from 'react';
import { ReleaseWithCommits } from '../../../models/release';
import { Undertittel, UndertekstBold } from 'nav-frontend-typografi';
import CommitsForRelease from '../../promote/commits-for-release';

interface ApplicationReleaseProps {
    release: ReleaseWithCommits;
}

export default function ApplicationRelease(props: ApplicationReleaseProps) {
    return (
        <section className="application blokk-l">
            <Undertittel className="blokk-xxs">{props.release.application}</Undertittel>
            <UndertekstBold className="blokk-xs">{props.release.fromVersion} til {props.release.toVersion}</UndertekstBold>
            <CommitsForRelease commits={props.release.commits} />
        </section>
    );
}
