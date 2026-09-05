//THIS FILE GOES AND GET EVERY DEPARTMENT FROM THE BACKEND

import type { Department } from "@/experience/careers/types/department";

//Promise - means it will hand back list of departments eventually.
export async function getAllDepartments(): Promise<Department[]> {
    //GO GET CAREERS - HAVE IT MATCH CONTROLLER ON BACKEND
    const response = await fetch("/api/careers");
    //SEND BACK RAW DATA
    return response.json();
}