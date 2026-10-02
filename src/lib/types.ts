export interface RSVPFormData {
  name: string;
  email: string;
  attendance: 'hadir' | 'tidak_hadir';
  guestCount: number;
  wish: string;
}

export interface WishEntry {
  id: string;
  name: string;
  originalWish: string;
  formattedWish: string;
  isFormatted: boolean;
  timestamp: string;
  attendance: 'hadir' | 'tidak_hadir';
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface FormatWishRequest {
  name: string;
  wish: string;
}

export interface FormatWishResponse {
  formattedWish: string;
  success: boolean;
  error?: string;
}
