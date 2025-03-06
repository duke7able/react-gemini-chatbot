export type FormApiPayload = {
    formData : any
  };
  
  export async function sendApiForm(
    APIStoreResponseDataEndpoint: string,
    APIAccessToken: string | null,
    formData: any,
    method: string
  ) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    if (APIAccessToken) {
      headers.append("Authorization", `Bearer ${APIAccessToken}`);
    }
  
    if (method === "GET") {
      const queryParams = new URLSearchParams(
            Object.entries(formData).map(([key, value]: [string, any]) => [key, String(value)])
        ).toString();
  
      const response = await fetch(
        `${APIStoreResponseDataEndpoint}?${queryParams}`,
        {
          method: "GET",
          headers: headers,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to send data via GET"
        );
      }
  
      return await response.json();
    }
  
    const response = await fetch(APIStoreResponseDataEndpoint, {
      method,
      headers,
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Failed to send data via POST/PUT"
      );
    }
  
    return await response.json();
  }
  