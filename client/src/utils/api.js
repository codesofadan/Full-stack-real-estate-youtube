import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

// Create an Axios instance
export const api = axios.create({
  baseURL: "http://localhost:8000/api", // Use http for local testing
});

// Function to get all properties
export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });
    return response.data; // Return the data directly
  } catch (error) {
    console.error("Error fetching properties:", error); // Log the error
    toast.error("Something went wrong while fetching properties");
    throw error; // Throw the error for further handling
  }
};

// Function to get a single property
export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });
    return response.data; // Return the data directly
  } catch (error) {
    console.error("Error fetching property:", error); // Log the error
    toast.error("Something went wrong while fetching the property");
    throw error; // Throw the error for further handling
  }
};

// Function to create a user
export const createUser = async (email, token) => {
  try {
    const response = await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the server response
  } catch (error) {
    console.error("Error creating user:", error); // Log the error
    toast.error("Something went wrong while creating user, Please try again");
    throw error; // Throw the error for further handling
  }
};

// Function to book a visit
export const bookVisit = async (date, propertyId, email, token) => {
  try {
    const response = await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the server response
  } catch (error) {
    console.error("Error booking visit:", error); // Log the error
    toast.error("Something went wrong while booking the visit, Please try again");
    throw error; // Throw the error for further handling
  }
};

// Function to remove a booking
export const removeBooking = async (id, email, token) => {
  try {
    const response = await api.post(
      `/user/removeBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the server response
  } catch (error) {
    console.error("Error removing booking:", error); // Log the error
    toast.error("Something went wrong while removing the booking, Please try again");
    throw error; // Throw the error for further handling
  }
};

// Function to add a property to favorites
export const toFav = async (id, email, token) => {
  try {
    const response = await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the server response
  } catch (error) {
    console.error("Error adding to favorites:", error); // Log the error
    throw error; // Throw the error for further handling
  }
};

// Function to get all favorite properties
export const getAllFav = async (email, token) => {
  if (!token) {
    toast.error("Authorization token is missing");
    throw new Error("Authorization token is missing");
  }
  try {
    const res = await api.post(
      `/user/allFav`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data["favResidenciesID"]; // Return the favorite residencies IDs
  } catch (error) {
    console.error("Error fetching favorites:", error); // Log the error
    toast.error("Something went wrong while fetching favorites");
    throw error; // Throw the error for further handling
  }
};

// Function to get all bookings
export const getAllBookings = async (email, token) => {
  if (!token) {
    toast.error("Authorization token is missing");
    throw new Error("Authorization token is missing");
  }
  try {
    const res = await api.post(
      `/user/allBookings`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data["bookedVisits"]; // Return the booked visits
  } catch (error) {
    console.error("Error fetching bookings:", error); // Log the error
    toast.error("Something went wrong while fetching bookings");
    throw error; // Throw the error for further handling
  }
};

// Function to create a residency
export const createResidency = async (data, token) => {
  console.log(data);
  try {
    const res = await api.post(`/residency/create`, data, { // Pass data directly
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // Return the server response
  } catch (error) {
    console.error("Error creating residency:", error); // Log the error
    throw error; // Throw the error for further handling
  }
};
