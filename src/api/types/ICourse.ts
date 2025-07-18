// Para recibir (listar)
export interface ICourseList {
  id_courses: string;
  course_name: string;
  status: number;
}

// Para enviar (crear)
export interface ICourse {
  course: {
    id_courses: string;
    course_name: string;
    status: number;
  };
  recaptchaToken: string;
}

export interface ICourseDelete {
  course: { 
    id_courses: string; 
  };
  recaptchaToken: string;
}