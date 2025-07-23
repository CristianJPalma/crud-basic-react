import { INSTRUCTOR_END_POINT } from "../contants/Endpoint";
import { IInstructor, IInstructorDelete, IInstructorList } from "../types/IInstructor";

export const CreateInstructor = async(register: IInstructor) => {
    try{
        const response = await fetch(INSTRUCTOR_END_POINT, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(register)
        });
        if(!response.ok){
            const errorText =await response.text();
            console.error("Status:", response.status);
            console.error("Status Text:", response.statusText);
            console.error("Body:", errorText);
            throw new Error("Error al crear el instructor");
        }
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error("Error:", error);
        return error;
    }

}

export const GetAllInstructor = async() => {
    try {
        const response = await fetch(INSTRUCTOR_END_POINT);
        if (!response.ok) throw new Error("Error al obtener los instructores");
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const EditInstructor = async(id: number, register: IInstructorList) => {
    try{
        const response =await fetch(INSTRUCTOR_END_POINT + id,{
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(register)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Status:", response.status);
            console.error("Status Text:", response.statusText);
            console.error("Body:", errorText);
            throw new Error("Error al editar el instructor");
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

export const DeleteInstructor = async(deleteResponse: IInstructorDelete) => {
    try{
        const response = await fetch(INSTRUCTOR_END_POINT,{
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(deleteResponse)
        });
        if(!response.ok){
            const errorText = await response.text();
            console.error("Status:", response.status);
            console.error("Status Text:", response.statusText);
            console.error("Body:", errorText);
            throw new Error("Error al eliminar el instructor");
        }
        let data = await response.json();
        console.log(data)
        return data;
    }
    catch (error) {
        console.log(error)
        return error;
    }
}