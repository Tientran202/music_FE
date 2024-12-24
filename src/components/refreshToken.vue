import axios from "axios";

// Khởi tạo axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

// Interceptor để xử lý lỗi 401
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401 && error.response.data.error === "access_token_expired") {
      // Gửi refresh_token để lấy access_token mới
      const refreshToken = localStorage.getItem("refresh_token"); // Lấy refresh_token từ localStorage
      try {
        const { data } = await axios.post("/auth/refresh-token", { refreshToken });
        // Lưu lại access_token mới
        localStorage.setItem("access_token", data.access_token);

        // Cập nhật header và thực hiện lại request cũ
        error.config.headers["Authorization"] = `Bearer ${data.access_token}`;
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        console.error("Refresh token failed: ", refreshError);
        // Đăng xuất người dùng nếu refresh_token không hợp lệ
        window.location.href = "/login";
      }
    }

    // Trả lỗi nếu không phải lỗi 401 hoặc refresh token thất bại
    return Promise.reject(error);
  }
);

export default axiosInstance;
