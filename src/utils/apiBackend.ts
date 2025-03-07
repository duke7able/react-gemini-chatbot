export type ApiResponsePayload = {
  userUUID: string;
  userMessage: string;
  modelMessage: string;
};

export async function sendApiResponse(
  APIStoreResponseDataEndpoint: string,
  APIAccessToken: string | null,
  apiPayload: ApiResponsePayload,
  method: string
) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (APIAccessToken) {
    headers.append("Authorization", `Bearer ${APIAccessToken}`);
  }
  if (method === "GET") {
    const queryParams = new URLSearchParams({
      userUUID: apiPayload.userUUID,
      userMessage: apiPayload.userMessage,
      modelMessage: apiPayload.modelMessage,
    }).toString();

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
    body: JSON.stringify(apiPayload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error?.message || "Failed to send data via POST/PUT"
    );
  }

  return await response.json();
}
