export enum Operation {
  Success,
  AlreadyExists,
  Error,
  ObjectDoesNotExists,
  AlreadyOccuringTransaction,
  AlreadyOccuringReservation,
  StartAtGreaterThanEndAt,
  DateTimeParseError,
  NotOK,
  BadRequest,
  InternalServerError
}