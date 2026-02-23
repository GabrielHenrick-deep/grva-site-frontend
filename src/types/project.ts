export interface Member {
  id: number;
  foto: string;
  name: string;
}

export interface Project {
  id: number;
  title: string;
  resumo: string;
  image_url: string;
  video: string;
  member?: Member[];
  artigo: { title: string; url: string }[];
}
