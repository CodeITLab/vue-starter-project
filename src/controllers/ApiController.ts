import ApiService from "@/api/apiService";
import { TestModel } from "@/models/TestModel";

class ApiController {
  public async fetchData(): Promise<void> {
    try {
      const email = localStorage.getItem("email") || "";
      const response = await ApiService.get<TestModel[]>(
        "workouts/get-users-workouts?email=" + email
      );
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  }

  public async fetchUserByEmail(email: string): Promise<void> {
    try {
      const response = await ApiService.get<TestModel>(
        "user/get-user-by-email?email=" + email
      );
      console.log("Pozvao se user po mailu");
    } catch (error) {
      console.error("Error creating data", error);
      throw error;
    }
  }

  public async saveUserInfo(data: TestModel): Promise<void> {
    try {
      await ApiService.post("/user/save-user-data", data);
      await this.fetchData();
    } catch (error) {
      console.error("Error creating data", error);
      throw error;
    }
  }

  public async createData(data: TestModel): Promise<void> {
    try {
      await ApiService.post("/workouts/save-workout-data", data);
      await this.fetchData();
    } catch (error) {
      console.error("Error creating data", error);
      throw error;
    }
  }

  public async updateData(data: TestModel): Promise<void> {
    try {
      const id = 0;
      await ApiService.put(`workouts/update-user-workout?id=${id}`, data);
      await this.fetchData();
    } catch (error) {
      console.error("Error updating data", error);
      throw error;
    }
  }

  public async deleteData(): Promise<void> {
    try {
      const id = 0;
      await ApiService.delete(`/workouts/delete-user-workout?id=${id}`);
      await this.fetchData();
    } catch (error) {
      console.error("Error deleting data", error);
      throw error;
    }
  }
}

export default new ApiController();
