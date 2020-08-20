import serviceRequest from "../utils/axiosRequest";

export function getAllParkingPosition(parkingLotId) {
  return serviceRequest.get(`/parking_position/${parkingLotId}`);
}
