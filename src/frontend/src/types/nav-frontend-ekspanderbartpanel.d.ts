declare module 'nav-frontend-ekspanderbartpanel' {
    import * as React from 'react';

    export interface EkspanderbartpanelProps {
        apen: boolean;
        className?: string;
        onClick?: (event: any) => void;
        tittel: string;
        tittelProps?: string;
        children?: {};
    }

    export interface EkspanderbartpanelPureProps {
        apen: boolean;
        className?: string;
        onClick: (event: any) => void;
        tittel: string;
        tittelProps?: string;
        children?: {};
    }

    export class Ekspanderbartpanel extends React.Component<
        EkspanderbartpanelProps,
        {}
    > {}

    export class EkspanderbartpanelPure extends React.Component<
        EkspanderbartpanelPureProps,
        {}
    > {}

    export default Ekspanderbartpanel;
}
