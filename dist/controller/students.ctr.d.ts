import type { NextFunction, Request, Response } from "express";
export declare const getAllStudents: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const AddStudents: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const left_Students: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const UpdateStudents: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const DeleteStudents: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=students.ctr.d.ts.map