import * as React from 'react';
import { Release } from '../../../deployment/deployment-selector';
import Commit from '../../../dev/commit';
import { Undertittel, UndertekstBold } from 'nav-frontend-typografi';
import CommitsForRelease from '../../promote/commits-for-release';

interface ApplicationReleaseProps {
    release: Release;
    commits: Commit[];
}

export default function ApplicationRelease(props: ApplicationReleaseProps) {
    return (
        <section className="application blokk-l">
            <Undertittel className="blokk-xxs">{props.release.application}</Undertittel>
            <UndertekstBold className="blokk-xs">{props.release.fromVersion} til {props.release.toVersion}</UndertekstBold>
            <CommitsForRelease commits={props.commits} />
        </section>
    );
}
