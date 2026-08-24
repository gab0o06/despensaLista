import { Timestamp } from "firebase/firestore";

export const getTime = (timestamp?: Timestamp | null) => {
  if (!timestamp) return "Calculando...";

  const now = new Date();
  const pastDate = timestamp.toDate();
  const diffInMs = now.getTime() - pastDate.getTime();

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 1) return "Hace unos segundos";
  if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Hace ${diffInHours} h`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `Hace ${diffInDays} d`;
};
