export enum UserRole {
  CUSTOMER = "customer",
  OWNER = "owner",
  STAFF = "staff",
}

export enum FloorStatus {
  OPEN = "open",
  CLOSED = "closed",
}

export enum TableStatus {
  AVAILABLE = "available",
  OCCUPIED = "occupied",
  UNAVAILABLE = "unavailable",
}

export enum ReservationStatus {
  RESERVED = "reserved",
  ARRIVED = "arrived",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  NO_SHOW = "no-show",
}

export enum TableSessionStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum TableSessionType {
  WALK_IN = "walk_in",
  RESERVATION = "reservation",
}

export enum OrderStatus {
  PENDING = "pending",
  SERVED = "served",
  COMPLETED = "completed",
}

export enum BillStatus {
  UNPAID = "unpaid",
  PAID = "paid",
}

export enum PaymentMethod {
  CASH = "cash",
  BANKING = "banking",
}

export enum PaymentStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

export enum MenuStatus {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
}
