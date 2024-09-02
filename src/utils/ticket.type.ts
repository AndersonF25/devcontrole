export interface TicketProps {
  id: string;
  name: string;
  status: string;
  description?: string;
  userId: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  customerId?: string | null;
}
