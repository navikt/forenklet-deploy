import { getEnvironmentByName } from './environment';

describe('environment.ts', () => {
    it('should handle undefined environments gracefully', () => {
        let env = getEnvironmentByName('foo');
        expect(env).toBeDefined()
    });

    it( 'should return environment for supported environments', () => {
        const supportedEnvs = ['p', 'q0', 'q1', 'q10', 'q7', 'q6', 't6', 't10'];
        supportedEnvs
            .map(env => getEnvironmentByName(env))
            .forEach(env => expect(supportedEnvs).toContain(env.name));
    })
});
