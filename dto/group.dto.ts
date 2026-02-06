

export interface GroupCreateDto{
    title: string;
    days: string;
    time: string;
    image_url: string;
   added_by: number;
   teacher_id: number
   
}


export interface GroupUpdateDto{
   title?: string;
    days?: string;
    time?: string;
    image_url?: string;
   added_by?: number;
   teacher_id?: number
}

