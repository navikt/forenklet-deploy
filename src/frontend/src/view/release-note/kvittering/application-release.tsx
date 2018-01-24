import * as React from 'react';
import { Release } from '../../../models/release';
import { Undertittel } from 'nav-frontend-typografi';

interface ApplicationReleaseRowProps {
    release: Release;
}

function getVersion(version: string | null): string {
    return version == null || version === '' ? 'Ikke prodsatt enda' : version;
}

function ApplicationReleaseRow(props: ApplicationReleaseRowProps) {
    return (
        <tr>
            <td>{ props.release.application }</td>
            <td>{ props.release.toVersion }</td>
            <td>{ getVersion(props.release.fromVersion) }</td>
        </tr>
    );
}

interface ApplicationReleaseProps {
    releases: Release[];
}

export default function ApplicationRelease(props: ApplicationReleaseProps) {
    return (
        <section>
            <Undertittel className="blokk-xxs">Applikasjoner ({ props.releases.length }):</Undertittel>
            <table className="table release-table">
                <thead>
                    <tr>
                        <th className="application">Applikasjonsnavn</th>
                        <th className="releaseversion">Versjon som prodsettes</th>
                        <th className="currentversion">Versjon i P</th>
                    </tr>
                </thead>
                <tbody>
                    { props.releases.map((release) => <ApplicationReleaseRow release={release} key={`${release.application}-${release.fromVersion}`} />) }
                </tbody>
            </table>
        </section>
    );
}
