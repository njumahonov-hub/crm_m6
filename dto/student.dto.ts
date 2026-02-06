export interface CreateStudentDto {
  full_name: string;
  phone_number: string;
  profession: string;
  parent_name: string;
  parent_number: string;
  image_url: string;
    added_by: number;
    group_by: number
}

export interface UpdateStudentDto {
  full_name?: string;
  phone_number?: string;
  profession?: string;
  parent_name?: string;
  parent_number?: string;
  image_url?: string;
  left_at?: Date
  joined_at?: Date
    added_by?: number;
    group_by?: number
}

