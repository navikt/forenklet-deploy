import Environment from "./environment";

const environmentClasses = [
    "t",
    "q",
    "p"
];

const promotableEnvironments = [
    "t6",
    "q6"
];

function index(s: Environment): number {
    return environmentClasses.indexOf(s.name.charAt(0));
}

export function comparator(a: Environment, b: Environment) {
    return index(a) - index(b);
}

export function canPromote(environment: Environment): boolean {
    return promotableEnvironments.indexOf(environment.name) >= 0;
}