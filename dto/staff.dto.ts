
export interface StaffCreateDto{
    full_name: string;
    phone_number: string;
    profession: string;
    image_url: string;
   
}


export interface StaffUpdateDto{
    full_name?: string;
    phone_number?: string;
    profession?: string;
    image_url?: string;
   
}

