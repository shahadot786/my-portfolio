import { Request, Response, NextFunction } from 'express';
export declare const getTestimonials: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createTestimonial: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getEducation: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createEducation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getCertificates: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createCertificate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteItem: (Model: any) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateItem: (Model: any) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=misc.controller.d.ts.map