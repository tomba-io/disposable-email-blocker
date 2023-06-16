export interface TombaStatusResponse {
    domain: string;
    webmail: boolean;
    disposable: boolean;
}

export interface Options {
    apiUrl?: string;
    disposable?: DisposableOptions;
    webmail?: WebmailOptions;
    emailError?: ErrorOptions;
}
export interface DefaultOptions {
    apiUrl: string;
    disposable: DisposableOptions;
    webmail: WebmailOptions;
    emailError: ErrorOptions;
}

export interface WebmailOptions {
    message: string;
    block?: boolean;
}
export interface DisposableOptions {
    message: string;
}

export interface ErrorOptions {
    className?: string;
    style?: string;
}
