import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

export type ServicePillProps = {
  label: string;
  icon: IconDefinition;
  onPress: () => void;
  selected: boolean;
};
