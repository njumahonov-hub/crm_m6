
export interface TeacherCreateDto{
    full_name: string;
    phone_number: string;
    profession: string;
    image_url: string;
    added_by: number;
   
}


export interface TeacherUpdateDto{
    full_name?: string;
    phone_number?: string;
    profession?: string;
    image_url?: string;
    added_by?: number;
   
}

