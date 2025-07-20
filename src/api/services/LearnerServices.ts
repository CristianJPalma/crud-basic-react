import { LEARNER_END_POINT } from "../contants/Endpoint";
import { ILearner, ILearnerDelete, ILearnerList } from "../types/ILearner";

export const CreateLearner = async(register: ILearner) => {

    try{
        const response = await fetch(LEARNER_END_POINT, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(register)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Status:", response.status);
            console.error("Status Text:", response.statusText);
            console.error("Body:", errorText);
            throw new Error("Error al crear el aprendiz");
        }
        let data = await response.json();
        console.log(data);
        return data
    }
    catch (error) {
        console.error("Error:", error);
        return error;
    }
}

export const GetAllLearner = async() => {
    try {
        const response = await fetch(LEARNER_END_POINT);
        if (!response.ok) throw new Error("Error al obtener los aprendices");
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const EditLearner = async(id: number, register: ILearnerList) => {
    try{
        const response = await fetch(LEARNER_END_POINT + id, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(register)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Status:", response.status);
            console.error("Status Text:", response.statusText);
            console.error("Body:", errorText);
            throw new Error("Error al editar el aprendiz");
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

export const DeleteLearner = async(deleteResponse: ILearnerDelete) => {
    try{
        const response = await fetch(LEARNER_END_POINT, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(deleteResponse)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Status:", response.status);
            console.error("Status Text:", response.statusText);
            console.error("Body:", errorText);
            throw new Error("Error al eliminar el aprendiz");
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