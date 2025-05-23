export interface SessionContexProps {
    isUserAuthenticated: boolean;
    toglleAutentication: () => void;
};

export interface FooterProps {
    name: string;
    date: Date;
}

export interface HeaderProps {
    name: string;
    tasks: string;
}

export interface TaskProp {
  text: string
  done: boolean
  date: string
}



 


