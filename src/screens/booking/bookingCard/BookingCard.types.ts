import {BookingResponse} from '../../../api/booking/booking.types';

export type BookingCardProps = {
  booking: BookingResponse;
  isOngoing?: boolean;
  onCancel?: () => void;
};
