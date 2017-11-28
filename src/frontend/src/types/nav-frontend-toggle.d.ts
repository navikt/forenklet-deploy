declare module 'nav-frontend-toggle' {
    import * as React from 'react';
    import {ChangeEventHandler} from "react";

    export interface ElementProps {
        className?: string;
        name: string;
        onChange: ChangeEventHandler<HTMLInputElement>;
        // style?: {};
        // tag?: String;
        // role?: String;
    }

    export interface ElementProps2 {
        className?: string;
        checked?: boolean;
        value: string;
        // style?: {};
        // tag?: String;
        // role?: String;
    }


    export class ToggleGruppe extends React.Component<ElementProps, {}> {}
    export class ToggleKnapp extends React.Component<ElementProps2, {}> {}
}
