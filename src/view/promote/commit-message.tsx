import * as React from 'react';
import { matchPattern, getUrlForIssue } from './promote-utils';

interface CommitMessageProps {
    message: string;
}

export default function CommitMessage(props: CommitMessageProps) {
    const parts: any[] = props.message.split(matchPattern);
    for(let i=1; i<parts.length; i+=2) {
        parts[i] = (
            <a href={getUrlForIssue(parts[i])} key={parts[i]} target="_blank" rel="noopener noreferrer">
                { parts[i].toUpperCase() + ' ' }
            </a>
        );
    }

    return <span className="commit-message">{ parts }</span>;
}
