export type JotcRequest = {
    numbers: string;
    email: string;
    result: number;
  };
  
 export interface ParticipationRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
  }

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}