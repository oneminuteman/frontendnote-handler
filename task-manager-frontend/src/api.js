import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Django backend URL

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup/`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Expecting token in response
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the list of notes
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const addNote = async (noteText) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/notes/`,
      { text: noteText },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ✅ Function to delete a note
export const deleteNote = async (noteId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/notes/${noteId}/`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ✅ Function to edit a note
export const editNote = async (noteId, updatedText) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/notes/${noteId}/`,
      { text: updatedText },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

