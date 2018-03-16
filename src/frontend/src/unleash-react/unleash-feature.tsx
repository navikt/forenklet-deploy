import * as React from 'react';
import { Feature, getFeature } from './unleash-api';

interface UnleashFeatureProps {
    name: string;
    defaultEnabled?: boolean;
}

interface UnleashFeatureState {
    enabled: boolean;
}

export class FeatureIsEnabled extends React.Component<UnleashFeatureProps, UnleashFeatureState> {
    constructor(props: UnleashFeatureProps) {
        super(props);
        this.state = {
            enabled: this.getStoredValue()
        };
    }

    componentDidMount() {
        getFeature(this.props.name)
            .then((feature: Feature) => {
                this.setState({ enabled: feature.enabled });
                this.storeValue(feature.enabled);
            });
    }

    getStoredValue(): boolean {
        const storedValue = localStorage.getItem(this.props.name);
        if (storedValue) {
            return storedValue === 'on';
        }
        return this.props.defaultEnabled === true;
    }

    storeValue(value: boolean) {
        localStorage.setItem(this.props.name, value ? 'on' : 'off');
    }

    render() {
        if (this.state.enabled) {
            return this.props.children;
        }
        return null;
    }
}
