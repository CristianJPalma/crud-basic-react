export interface ILearner {
    learner: {
        id_learner: string;
        first_name: string,
        last_name: string,
        status: number
    },
    recaptchaToken: string
}
export interface ILearnerList {
    id_learner: string;
    first_name: string;
    last_name: string;
    status: number;
}

export interface ILearnerDelete {
  learner: { 
    id_learner: string; 
  };
  recaptchaToken: string;
}