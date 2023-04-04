import { Dispatch, SetStateAction } from 'react';

export interface JotcRequest {
    id: string;
    email: string;
    created_at: string;
    jotc_input: string;
    jotc_result: string;
  }

export interface MyComponentProps {
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}