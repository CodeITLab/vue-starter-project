import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import {IWorkoutModel} from "@/models/IWorkoutModel";

class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    const config: AxiosRequestConfig = {
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.api = axios.create(config);
  }

  private handleError(error: AxiosError): never {
    let errorMessage = 'An error occurred while making a request.';

    if (error.response) {
      // Server side errors
      switch (error.response.status) {
        case 400:
          errorMessage = 'Bad Request: The server could not understand the request due to invalid syntax.';
          break;
        case 401:
          errorMessage = 'Unauthorized: Access is denied due to invalid credentials.';
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have the necessary permissions to access this resource.';
          break;
        case 404:
          errorMessage = 'Not Found: The server can not find the requested resource.';
          break;
        case 500:
          errorMessage = 'Internal Server Error: The server has encountered a situation it doesn\'t know how to handle.';
          break;
        case 502:
          errorMessage = 'Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.';
          break;
        case 503:
          errorMessage = 'Service Unavailable: The server is not ready to handle the request.';
          break;
        case 504:
          errorMessage = 'Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.';
          break;
        default:
          errorMessage = `Error ${error.response.status}: ${error.response.data}`;
      }
      console.error(`Error ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
      // No response received from server
      errorMessage = 'No response received from the server. Please check your network connection.';
      console.error('No response received:', error.request);
    } else {
      // Other errors
      errorMessage = `Error: ${error.message}`;
      console.error('Error:', error.message);
    }

    throw new Error(errorMessage);
  }

  // GET request
  public async get<T>(url: string, email?: { email: string } | {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.get(url, {
        params: {email}
      });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  // POST request
  public async post<T>(url: string, data: T): Promise<void> {
    try {
      await this.api.post(url, data);
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  // PUT request
  public async put<IWorkoutModel>(url: string, data: IWorkoutModel): Promise<void> {
    try {
      await this.api.put(url, data);
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  // DELETE request
  public async delete(url: string): Promise<void> {
    try {
      await this.api.delete(url);
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }
}

// Primer kreiranja instance servisa sa baznim URL-om
const apiService = new ApiService('http://localhost:8080/');

export default apiService;
