export interface Article {
  _id: string;
  slug: string;
  image: string;
  title: string;
  public: boolean;
  subtitle: string;
  categories: Array<Category>;
  description: string;
  createdAt: number;
}
export interface Category {
  _id: string;
  slug: string;
  name: string;
  // createdAt: number;
}
