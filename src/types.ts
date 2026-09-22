export interface Campus {
  id: string;
  name: string;
  order: number;
}

export interface DeliveryChannel {
  id: string;
  location: string;
  style: string;
  description: string;
}

export interface HubPod {
  id: string;
  step: number;
  name: string;
  isExitPoint?: boolean;
  teach: string;
  show: string;
  doAction: string;
}

export type DecisionStatus = 'tbd' | 'set';

export interface OpenDecision {
  id: string;
  label: string;
  status: DecisionStatus;
  detail: string;
}
