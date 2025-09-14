import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errStatus = error.response?.status || 500;
    if (errStatus === 401) {
      localStorage.removeItem("token");
    } else if (errStatus === 422) {
      const errors = error.response.data.errors || {};
      const forms = document.querySelectorAll('.needs-validations');
      Array.from(forms).forEach((form) => {
        const invalidElements = form.querySelectorAll('.is-invalid');
        invalidElements.forEach(el => el.classList.remove('is-invalid'));

        Object.keys(errors).forEach((key) => {
          const field = form.querySelector(`[name="${key}"]`);
          if (field) {
            field.classList.add('is-invalid');
          }
        });

      });
    }

    return Promise.reject(error);
  }
);


export default api;
