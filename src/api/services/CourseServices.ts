import { COURSE_END_POINT } from "../contants/Endpoint";
import { ICourse } from "../types/ICourse";

export const CreateCourse = async(register: ICourse) => {
    try{
        const response = await fetch(COURSE_END_POINT, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(register),
        });
        
        if(!response.ok) throw new Error("Error al crear el curso");
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        return error;
    }
};