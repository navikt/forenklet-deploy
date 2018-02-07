import * as React from 'react';
import ReactTable from 'react-table';
import { Release } from '../../../models/release';
import { Undertittel } from 'nav-frontend-typografi';

function getVersion(version: string | null): string {
    return version == null || version === '' ? 'Ikke prodsatt enda' : version;
}

interface ApplicationReleaseProps {
    releases: Release[];
}

export default function ApplicationRelease(props: ApplicationReleaseProps) {
    const columns = [{
        Header: 'Applikasjonsnavn',
        id: 'name',
        accessor: (release: Release) => release.application
    }, {
        Header: 'Versjon som prodsettes',
        id: 'toVersion',
        accessor: (release: Release) => release.toVersion
    }, {
        Header: 'Versjon i prod',
        id: 'fromVersion',
        accessor: (release: Release) => getVersion(release.fromVersion)
    }];

    const defaultPageSize = props.releases.length < 20 ? props.releases.length : 20;
    const showPagination = props.releases.length > 20;

    return (
        <section>
            <Undertittel className="blokk-xxs">Applikasjoner ({ props.releases.length }):</Undertittel>
            <ReactTable
                columns={columns}
                data={props.releases}
                defaultSorted={[{ id: 'name' }]}
                defaultPageSize={defaultPageSize}
                showPagination={showPagination}
                previousText={'Forrige'}
                nextText={'Neste'}
                pageText={'Side'}
                ofText={'av'}
                rowsText={'rader'}
            />
        </section>
    );
}
