export interface GridInterface {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface FaqInterface {
  question: string;
  answer: string;
}

export interface Youtube {
  title: string;
  author: string;
  thumbnail: string;
}

export interface Err {
  message: string;
}
