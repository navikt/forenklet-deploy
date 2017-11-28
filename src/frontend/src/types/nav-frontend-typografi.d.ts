declare module 'nav-frontend-typografi' {
    import * as React from 'react';

    export interface ElementProps {
        className?: string;
        style?: {};
        tag?: String;
        role?: String;
    }

    export class Sidetittel extends React.Component<ElementProps, {}> {}
    export class Undertittel extends React.Component<ElementProps, {}> {}
    export class Normaltekst extends React.Component<ElementProps, {}> {}
    export class EtikettLiten extends React.Component<ElementProps, {}> {}
    export class Innholdstittel extends React.Component<ElementProps, {}> {}
    export class UndertekstBold extends React.Component<ElementProps, {}> {}
    export class Element extends React.Component<ElementProps, {}> {}
}
