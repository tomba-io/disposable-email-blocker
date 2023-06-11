import { TombaStatusResponse } from './type';

/**
 * Blocker - Block Fake Disposable Email Addresses
 */
export class Blocker {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public activeElement: any;
    public email: string;
    public valid: boolean;
    public disposable: boolean;
    public errorMessage: string;
    public emailError: HTMLElement;
    public blockUser: boolean;

    /**
     * Blocker constructor
     */
    constructor() {
        this.init();
        this.addStyle();
        this.emailError = document.createElement('div');
        this.emailError.className = 'error';
        // this.emailError.ariaLive = "polite"
        this.errorMessage =
            "Unfortunately, You can't create an account with this email address.";
        this.disposable = false;
        this.valid = false;
    }

    /**
     * init : add Handlers
     */
    private init() {
        this.inputHandlers();
        this.submitHandlers();
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
     * addStyle : appending it to the <head> section
     */
    private addStyle(): void {
        const style = document.createElement('style');
        style.innerHTML = `
    /* This is our style for the invalid fields */
    .has-error {
      border-color: #ea868f;
      padding-right: calc(1.5em + 0.75rem);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right calc(0.375em + 0.1875rem) center;
      background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    }
    
    .has-error:focus {
      border-color: #ea868f;
      box-shadow: 0 0 0 0.25rem rgba(220,53,69,.25);
    }
    
    /* This is the style of our error messages */
    .error {
      width: 100%;
      margin-top: 0.25rem;
      font-size: .875em;
      color: #ea868f;
    }
    `;
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
                this.activeElement.after(this.emailError);
                if (this.activeElement.validity.valueMissing) {
                    this.emailError.innerHTML =
                        'You need to enter an e-mail address.';
                } else if (this.activeElement.validity.typeMismatch) {
                    this.emailError.innerHTML =
                        'Entered value needs to be an e-mail address.';
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
                                this.emailError.className = 'error';
                                if (data.disposable) {
                                    this.disposable = data.disposable;
                                    this.activeElement.className = 'has-error';
                                    this.emailError.innerHTML =
                                        this.errorMessage;
                                    this.emailError.className = 'error active';
                                } else {
                                    this.disposable = data.disposable;
                                    this.activeElement.className = '';
                                    this.emailError.innerHTML = '';
                                    this.emailError.className = 'error';
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    } else {
                        this.disposable = false;
                        this.activeElement.className = 'has-error';
                        this.emailError.className = 'error active';
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
            if (this.disposable || !this.valid) {
                event.preventDefault();
                if (this.activeElement) {
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
