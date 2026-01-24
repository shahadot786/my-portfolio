import { Request, Response, NextFunction } from 'express';
export declare const getArticles: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getArticleById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getArticleBySlug: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=article.controller.d.ts.map