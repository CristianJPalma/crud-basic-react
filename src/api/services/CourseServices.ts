import { COURSE_END_POINT } from "../contants/Endpoint";
import { ICourse, ICourseDelete, ICourseList } from "../types/ICourse";

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

export const GetAllCourses = async() => {
    try {
        const response = await fetch(COURSE_END_POINT);
        if (!response.ok) throw new Error("Error al obtener los cursos");
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const EditCourse = async(id: number, register: ICourseList) => {
    try{
        const response = await fetch(COURSE_END_POINT + id, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(register)
        });

        if (!response.ok) {
            const errorText = await response.text();
            // console.error("Status:", response.status);
            // console.error("Status Text:", response.statusText);
            // console.error("Body:", errorText);
            throw new Error("Error al editar el curso");
        }
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

 export const DeleteCourse = async(deleteResponse: ICourseDelete) => {
     try{
         const response = await fetch(COURSE_END_POINT, { 
             method: "DELETE",
             headers: {"Content-Type": "application/json"},
             body: JSON.stringify(deleteResponse)
         });
            if (!response.ok) {
                const errorText = await response.text();
                // console.error("Status:", response.status);
                // console.error("Status Text:", response.statusText);
                // console.error("Body:", errorText);
                throw new Error(`Error al eliminar el curso: ${response.status} - ${response.statusText}`);
            }

         let data = await response.json();
         console.log(data);
         return data;
     }
     catch (error) {
         console.log(error);
         return error;
     }

 }
