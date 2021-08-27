import axios from "axios";
import { getCurrentToken } from "../auth";

export const BASE = "http://powerful-crag-58891.herokuapp.com";

export async function getRoutines() {
  try {
    const { data } = await axios.get(`${BASE}/api/routines`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getRoutineById(id) {
  try {
    const { data } = await axios.get(`${BASE}/api/routines/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getActivities() {
  try {
    const { data } = await axios.get(`${BASE}/api/activities`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function destroyRoutine(id) {
  try {
    const { data } = await axios.delete(`${BASE}/api/routines/${id}`, {
      headers: { Authorization: `Bearer ` + getCurrentToken() },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
