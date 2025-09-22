const getAuthToken = () => localStorage.getItem("AuthToken");

const request = async (url, method = "GET", body = null, headers = {}) => {
  const token = localStorage.getItem("AuthToken");

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${url}`,
      config
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
};

export default {
  get: (url, headers = {}) => request(url, "GET", null, headers),
  post: (url, body, headers = {}) => request(url, "POST", body, headers),
  put: (url, body, headers = {}) => request(url, "PUT", body, headers),
  delete: (url, headers = {}) => request(url, "DELETE", null, headers),
};
