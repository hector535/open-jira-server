import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: number;
}

export interface Status {
  status_id: number;
  name: string;
  created_at: Date;
}

export interface Task {
  task_id: number;
  description: string;
  user_id: number;
  status_id: number;
  created_at: Date;
  status: Status;
  user: User;
}

export interface User {
  user_id: number;
  email: string;
  password: string;
  created_at: Date;
}
