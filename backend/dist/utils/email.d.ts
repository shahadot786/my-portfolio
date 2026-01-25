interface EmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
}
export declare const sendEmail: (options: EmailOptions) => Promise<boolean>;
export declare const sendContactNotification: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) => Promise<boolean>;
export {};
//# sourceMappingURL=email.d.ts.map