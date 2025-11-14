export enum FloorStatus {
  OPEN = "open",
  CLOSED = "closed",
}

export enum TableStatus {
  AVAILABLE = "available",
  BOOKED = "booked",
  UNAVAILABLE = "unavailable",
}

export enum ReservationStatus {
  RESERVED = "reserved",
  ARRIVED = "arrived",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  NO_SHOW = "no-show",
}

export enum UserRole {
  CUSTOMER = "customer",
  OWNER = "owner",
  STAFF = "staff",
}
