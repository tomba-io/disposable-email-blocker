import { defu } from 'defu';
import { DefaultOptions, Options, TombaStatusResponse } from './type';

// Disposable email blocker default values
const defaults: DefaultOptions = {
    disposable: {
        message:
            'Unfortunately, you cannot create an account with this email address.',
    },
    webmail: {
        message:
            'Unfortunately, you cannot create an account with this webmail email.',
        block: false
    },
    emailError: {
        className: 'b_e',
        style: `
        /* This is the style of our input error */
        .b_i_e {
            border-color: #ea868f;
            padding-right: calc(1.5em + 0.75rem);
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right calc(0.375em + 0.1875rem) center;
            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
          }
          .b_i_e:focus {
            border-color: #ea868f;
            box-shadow: 0 0 0 0.25rem rgba(220,53,69,.25);
          }
          /* This is the style of our error messages */
          .b_e {
            width: 100%;
            margin-top: 0.25rem;
            font-size: .875em;
            color: #ea868f;
          }
        `,
    },
};
/**
 * Blocker - Block Fake Disposable Email Addresses
 */
export class Blocker {
    public options: DefaultOptions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private activeElement: any;
    public email: string;
    public valid: boolean;
    public disposable: boolean;
    public webmail: boolean;
    private emailError: HTMLElement;

    /**
     * Blocker constructor
     */
    constructor(options?: Options) {
        // merge options
        this.options = defu((options as DefaultOptions) || {}, defaults);
        this.init();
        this.addStyle();
        this.emailError = document.createElement('div');
        this.emailError.className = this.options.emailError.className;
        this.disposable = false;
        this.valid = false;
    }

    /**
     * init : add Handlers
     */
    private init() {
        this.inputHandlers();
        this.submitHandlers();
        this.mouseHandlers();
    }

    /**
     * inputHandlers : sets up the input handlers by attaching an 'input' event listener to the document,
     */
    private inputHandlers() {
        document.addEventListener('input', this.onInput);
    }
    /**
     * inputHandlers : sets up the submit handlers by attaching an 'submit' event listener to the document,
     */
    private submitHandlers() {
        document.addEventListener('submit', this.onSubmit);
    }
    /**
     * mouseHandlers : This handler will be executed if tagName is `INPUT` and type is `email` and time the cursor.
     */
    private mouseHandlers() {
        document.addEventListener('mouseover', this.onMouse);
    }
    /**
     * addStyle : appending it to the <head> section
     */
    private addStyle(): void {
        const style = document.createElement('style');
        style.innerHTML = this.options.emailError.style;
        document.head.appendChild(style);
    }

    /**
     * onInput: event listener
     *
     * @param event
     */
    private onInput: EventListener = (event: InputEvent) => {
        if (event) {
            this.activeElement = document.activeElement;
            this.email = this.activeElement.value;
            if (
                this.activeElement.tagName === 'INPUT' &&
                this.activeElement.type === 'email'
            ) {
                this.activeElement.classList.add('b_i_e');
                this.activeElement.after(this.emailError);
                if (this.activeElement.validity.valueMissing) {
                    this.emailError.innerHTML =
                        'You need to enter an email address.';
                } else if (this.activeElement.validity.typeMismatch) {
                    this.emailError.innerHTML =
                        'The entered value needs to be an email address.';
                } else if (this.activeElement.validity.tooShort) {
                    this.emailError.innerHTML = `Email should be at least ${this.activeElement.minLength} characters; you entered ${this.email.length}.`;
                } else {
                    if (
                        this.EmailValidate(this.email) &&
                        this.activeElement.validity.valid
                    ) {
                        //  this.activeElement.validity.valid
                        this.valid = this.EmailValidate(this.email);
                        const url = `https://api.tomba.io/v1/domain-status?email=${this.email}`;
                        const options = {
                            method: 'GET',
                            headers: {
                                accept: 'application/json, text/plain, */*',
                            },
                        };
                        fetch(url, options)
                            .then((response) => {
                                // Handle the response
                                if (!response.ok) {
                                    throw new Error(
                                        'Api error, status = ' + response.status
                                    );
                                }
                                return response.json();
                            })
                            .then((data: TombaStatusResponse) => {
                                this.disposable = false;
                                this.emailError.innerHTML = '';
                                this.emailError.className = '';
                                if (data.disposable) {
                                    this.disposable = data.disposable;
                                    this.activeElement.classList.add(
                                        'b_i_e'
                                    );
                                    this.emailError.innerHTML =
                                        this.options.disposable.message;
                                    this.emailError.className = 'b_e';
                                } else if (this.options.webmail.block && data.webmail) {
                                    this.webmail = data.webmail;
                                    this.activeElement.classList.add(
                                        'b_i_e'
                                    );
                                    this.emailError.innerHTML =
                                        this.options.webmail.message;
                                    this.emailError.className = 'b_e';
                                } else {
                                    this.disposable = data.disposable;
                                    this.activeElement.classList.remove(
                                        'b_i_e'
                                    );
                                    this.emailError.innerHTML = '';
                                    this.emailError.className = '';
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    } else {
                        this.disposable = false;
                        this.activeElement.classList.add('b_i_e');
                        this.emailError.className = 'b_e';
                    }
                }
            }
        }
    };
    /**
     * onSubmit: event listener for submission
     *
     * @param event
     */
    private onSubmit: EventListener = (event: SubmitEvent) => {
        if (event) {
            if (this.disposable || !this.valid || (this.valid && this.options.webmail.block && this.webmail)) {
                event.preventDefault();
                if (this.activeElement) {
                    this.activeElement.focus();
                }
            }
        }
    };
    /**
     * onSelect: event listener for Selection
     *
     * @param event
     */
    private onMouse: EventListener = (event: SubmitEvent) => {
        if (event) {
            this.activeElement = document.activeElement;
            if (
                this.activeElement.tagName === 'INPUT' &&
                this.activeElement.type === 'email'
            ) {
                if (!this.valid) {
                    this.activeElement.classList.add('b_i_e');
                    this.activeElement.after(this.emailError);
                    this.emailError.innerHTML =
                        'You need to enter an email address.';
                    this.activeElement.focus();
                } else if (this.disposable) {
                    this.activeElement.classList.add('b_i_e');
                    this.activeElement.after(this.emailError);
                    this.emailError.innerHTML =
                        this.options.disposable.message;
                    this.activeElement.focus();
                } else if (this.webmail) {
                    this.activeElement.classList.add('b_i_e');
                    this.activeElement.after(this.emailError);
                    this.emailError.innerHTML =
                        this.options.webmail.message;
                    this.activeElement.focus();
                } else {
                    this.activeElement.classList.remove('b_i_e');
                    this.emailError.innerHTML = '';
                    this.activeElement.focus();
                }
            }
        }
    };

    /**
     * EmailValidate: Basic Email Validate
     *
     * @param email
     * @returns boolean
     */
    private EmailValidate(email: string): boolean {
        /* eslint-disable no-useless-escape */
        if (
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            ) === false
        ) {
            return false;
        }
        return true;
    }
}
