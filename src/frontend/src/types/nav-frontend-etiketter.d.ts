declare module 'nav-frontend-etiketter' {
    import * as React from 'react';

    export interface ElementProps {
        className?: string;
        // style?: {};
        // tag?: String;
        // role?: String;
    }

    export interface BaseElementProps {
        className?: string;
        type: 'advarsel' | 'fokus' | 'suksess' | 'info';
    }

    export class EtikettSuksess extends React.Component<ElementProps, {}> {}
    export class EtikettFokus extends React.Component<ElementProps, {}> {}
    export class EtikettAdvarsel extends React.Component<ElementProps, {}> {}
    export class EtikettInfo extends React.Component<ElementProps, {}> {}

    export default class EtikettBase extends React.Component<BaseElementProps> {}
}
