import { type $Enums } from "@prisma/client";

export function getAsyncJobStatusUserMessage(status: $Enums.AsyncJobStatus) {
  switch (status) {
    case "COMPLETED":
      return "Успешно завершено";
    case "FAILED":
      return "Произошла ошибка";
    case "PENDING":
      return "Ожидание";
    case "PROCESSING":
      return "В процессе";
    default:
      return "Неизвестный статус";
  }
}
