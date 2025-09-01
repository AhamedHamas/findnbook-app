export type Service = {
  name: string;
  price: string;
};

export type AddServiceInputs = {
  name: string;
  price: string;
};

export type ServiceInputProps = {
  value: Service;
  onChange: (service: Service) => void;
  onRemove?: () => void;
  showRemove?: boolean;
};
