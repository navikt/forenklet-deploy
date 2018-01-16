import { getIssuesFromMessage } from './promote-utils';

describe('promote-utils', () => {
    it('should return empty list for message with no issues', () => {
        const issues = getIssuesFromMessage('message with no issues');
        expect(issues).toHaveLength(0);
    });

    it('should return issue in start of message', () => {
        const issues = getIssuesFromMessage('FO-81 jira issue in the start of message');
        expect(issues).toHaveLength(1);
        expect(issues[0].name).toBe('FO-81');
    });

    it('should return issue in the middle of message', () => {
        const issues = getIssuesFromMessage('jira issue FO-82 is in the middle of the message');
        expect(issues).toHaveLength(1);
        expect(issues[0].name).toBe('FO-82');
    });

    it('should find all issues in the message', () => {
        const issues = getIssuesFromMessage('FO-01 has multiplke issues like FO-02 and FO-03');
        expect(issues).toHaveLength(3);
    });

    it('should allow lowercase for issues', () => {
        const issues = getIssuesFromMessage('fo-01 is in lowercase');
        expect(issues).toHaveLength(1);
        expect(issues[0].name).toBe('FO-01');
    });

    it('should find issues in brackets', () => {
        const issues = getIssuesFromMessage('[FO-01][FO-02] solved multiple issues');
        expect(issues).toHaveLength(2);
        expect(issues[0].name).toBe('FO-01');
        expect(issues[1].name).toBe('FO-02');
    });

    it('should find long issue-tags', () => {
        const issues = getIssuesFromMessage('AAP2018-26 SYFOUTV-12345 [AAP2018-27] et langt issuenavn');
        expect(issues).toHaveLength(3);
        expect(issues[0].name).toBe('AAP2018-26');
        expect(issues[1].name).toBe('SYFOUTV-12345');
        expect(issues[2].name).toBe('AAP2018-27');
    });
});
