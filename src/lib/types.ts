export type VehicleType = {
  id: number;
  brand: string;
  type: string;
  category: string;
  color: string;
  number: string;
  owner_name: string;
  owner_email: string;
  owner_phone: string;
  created_at?: string;
  updated_at?: string;
};

export type ActivityType = {
  id: number;
  ticket_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type InvestigatorType = {
  id: number;
  name: string;
  nip: string;
  email: string;
  role: string;
  email_verified_at: string;
  is_2fa_enabled: number;
  google2fa_secret: string;
  created_at: string;
  updated_at: string;
};

export type PaymentType = {
  id: number;
  created_at: string;
  updated_at: string;
};

export type CameraType = {
  id: number;
  location: string;
  server_url: string;
  status: string;
  stream_key: string;
  created_at?: string;
  updated_at?: string;
};

export type ViolationType = {
  id: string;
  number: string;
  number_evidence: string;
  status: string;
  violation_evidence: string;
  camera_id?: number;
  camera?: CameraType;
  vehicle_data: VehicleType;
  violation_type?: ViolationTypeType;
  created_at: string;
  updated_at: string;
};

export type ViolationTypeType = {
  id: number;
  name: string;
  description: string;
  regulation: string;
};

export type NotificationType = {
  whatsapp: {
    is_sent: boolean;
    type: string;
    ticket_id: string;
    updated_at: string;
  };
  sms: {
    is_sent: boolean;
    type: string;
    ticket_id: string;
    updated_at: string;
  };
  email: {
    is_sent: boolean;
    type: string;
    ticket_id: string;
    updated_at: string;
  };
};

export type HearingScheduleType = {
  id: number;
  location: string;
  date: string;
};

export type AppealType = {
  id: number;
  ticket_id: string;
  argument: string;
  evidence: string;
  status: "pending" | "accepted" | "rejected";
  note?: string;
  created_at: string;
  updated_at: string;
};

export type TicketType = {
  id: string;
  ticket_id: number;
  name: string;
  status: string;
  deadline_confirmation: string;
  appeal?: AppealType;
  hearing_schedule?: HearingScheduleType;
  activities?: ActivityType[];
  investigator?: InvestigatorType;
  payment?: PaymentType;
  violation?: ViolationType;
  notifications?: NotificationType;
  created_at: string;
  updated_at: string;
};
