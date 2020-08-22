import serviceRequest from "../utils/axiosRequest";

export function getAllParkingPosition(parkingLotId) {
  return serviceRequest.get(`/parking_position/${parkingLotId}`);
}

export function getUserInfo(userId) {
  return serviceRequest.get(`/user/${userId}`);
}

export function createOrder(order) {
  return serviceRequest.post(`/orders/`, order);
}

export function reserveParkingPosition(parkingPositionId) {
  return serviceRequest.put(
    `/parking_position/${parkingPositionId}`,
    parkingPositionId
  );
}
