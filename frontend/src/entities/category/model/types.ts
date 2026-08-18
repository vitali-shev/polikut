export interface Category {
  id: number;
  icon: string;
  name: string;
}

export type CategoryCreateRequest = Omit<Category, "id">;

export type CategoryUpdateRequest = Category;
