export interface IInstructor {
    instructor: {
        id_instructor: string;
        first_name: string,
        last_name: string,
        status: number
    },
    recaptchaToken: string
}
export interface IInstructorList {
    id_instructor: string;
    first_name: string;
    last_name: string;
    status: number;
}

export interface IInstructorDelete {
  instructor: { 
    id_instructor: string; 
  };
  recaptchaToken: string;
}