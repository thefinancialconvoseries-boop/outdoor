import { Campus, DeliveryChannel, HubPod, OpenDecision } from '../types';

export const CAMPAIGN_NAME = 'The Financial Blueprint';
export const CAMPAIGN_TAGLINE = 'Your Money. Your Plan. Your Future';
export const CAMPAIGN_PARENT = 'A Financial Convo series initiative';

export const CAMPAIGN_AIM =
  'Educate students and introduce them to tools that help them build a sound financial structure — measured by the understanding gained and the tools adopted, not just sign-up counts.';

export const CAMPAIGN_FORMAT =
  'In-person, one week per campus, well-funded with partners and sponsors present throughout.';

export const CAMPUSES: Campus[] = [
  { id: 'ucc', name: 'UCC', order: 1 },
  { id: 'ola', name: 'OLA Training College', order: 2 },
  { id: 'bakaano', name: 'Bakaano Nursing', order: 3 },
  { id: 'cctu', name: 'CCTU', order: 4 },
];

export const SENSITIZATION_CORE_MESSAGE =
  "This week, we're bringing financial education straight to you: budgeting, saving, emergency funds, and how to actually grow your money right here on campus. Hub Week starts [date] at [locations]. Come learn, come try the tools, walk away with a plan.";

export const DELIVERY_CHANNELS: DeliveryChannel[] = [
  {
    id: 'lecture-theatres',
    location: 'Lecture theatres',
    style: 'Short address to the class',
    description: 'Before or after a session — the same framing, delivered directly to a captive class.',
  },
  {
    id: 'summer-huts',
    location: 'Summer huts',
    style: 'Informal peer-to-peer conversation',
    description: 'Ambassadors sit and talk money casually, weaving in the Hub Week details as they go.',
  },
  {
    id: 'study-areas',
    location: 'Study areas',
    style: 'One-pager left behind',
    description: 'A brief verbal mention plus a printed one-pager students can read at their own pace.',
  },
  {
    id: 'shuttle-terminals',
    location: 'Shuttle terminals',
    style: 'Flyer handout + quick verbal prompt',
    description: 'Caught while queuing — a flyer and a fast, friendly mention of Hub Week.',
  },
];

export const CONNECTIVE_TISSUE_STEPS: string[] = [
  'QR codes at every touchpoint point to a live landing page with full Hub Week details.',
  'A short registration form captures students interested in opening an account.',
  'Registrants get an SMS the moment Hub Week begins on their campus.',
  'Countdown messaging builds anticipation toward Day 1.',
  'Sensitization ambassadors carry over to staff the hubs the following week.',
];

export const HUB_PODS: HubPod[] = [
  {
    id: 'money-check',
    step: 1,
    name: 'Money Check',
    teach: 'Financial habits sorted into honest categories.',
    show: 'What each tier means — the Blueprint framing.',
    doAction: 'Diagnostic completed; a tier card is issued — the entry ticket to every other pod.',
  },
  {
    id: 'budget-builder',
    step: 2,
    name: 'Budget Builder',
    teach: 'Where allowance typically leaks, personalized to their tier.',
    show: 'Live Budget Builder / Allowance Splitter demo.',
    doAction: 'Student sets up their own working budget.',
  },
  {
    id: 'emergency-fund',
    step: 3,
    name: 'Emergency Fund',
    teach: 'Why 3–6 months of expenses is the target.',
    show: 'Savings Goal Planner demo.',
    doAction: 'Enrol in the GHS 50 Challenge — sponsor seed money is a top-up, not the hook.',
  },
  {
    id: 'savings-account',
    step: 4,
    name: 'Savings Account',
    teach: 'Regular vs. high-yield accounts, reinforcing the study-area lesson.',
    show: 'Bank partner walks through real numbers.',
    doAction: 'Account opened on the spot.',
  },
  {
    id: 'brand-merch',
    step: 5,
    name: 'Brand / Merch',
    isExitPoint: true,
    teach: 'The full visit, tied together.',
    show: 'Blueprint completion certificate issued.',
    doAction: 'Merch handed out as a reward for finishing — not a freebie on arrival.',
  },
];

export const HUB_STRUCTURE =
  '3–4 vantage points per campus. Every hub is identical, and all partners are present at every point, every day — students complete the full journey at whichever hub is nearest. No routing required.';

export const OPEN_DECISIONS: OpenDecision[] = [
  {
    id: 'staffing',
    label: 'Staffing numbers per partner',
    status: 'tbd',
    detail: 'To be determined by each partner organization.',
  },
  {
    id: 'layout',
    label: 'Hub layout / branding',
    status: 'tbd',
    detail: 'Finalized once partner organizations are confirmed and on board.',
  },
  {
    id: 'talking-points',
    label: 'Ambassador talking points',
    status: 'set',
    detail:
      'A brief on good financial management and the need for tools like a tracker, an emergency fund, and a high-earning savings account, together with a budget framework.',
  },
  {
    id: 'pacing',
    label: 'Per-student time in a hub',
    status: 'set',
    detail:
      'Not fixed — paced by how well and how quickly each student understands what is being explained to them.',
  },
];

export const SENSITIZATION_DAYS_MIN = 3;
export const SENSITIZATION_DAYS_MAX = 5;
export const HUB_WEEK_DAYS = 5;
export const CAMPUS_BLOCK_DAYS_MIN = SENSITIZATION_DAYS_MIN + HUB_WEEK_DAYS;
export const CAMPUS_BLOCK_DAYS_MAX = SENSITIZATION_DAYS_MAX + HUB_WEEK_DAYS;
