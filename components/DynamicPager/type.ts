import { type } from 'os';
import { SvgProps } from 'react-native-svg';

export enum CardType {
  INFOGRAPHIC = 'INFOGRAPHIC',
  AGREEMENT = 'AGREEMENT',
  FINAL = 'FINAL',
  ActionDialog = 'ActionDialog',
}

export type InfographicContent = {
  title: string;
  description: string | undefined;
  image: string | React.FC<SvgProps>;
};

export type AgreementContent = {
  title: string;
  points: string[] | string;
  agreement: string[];
};

export type FinalContent = {
  title: string;
  subTitle: string;
  image: string | React.FC<SvgProps>;
};

export type Data = (
  | {
      type: CardType.INFOGRAPHIC;
      withCounter?: boolean;
      content: InfographicContent | InfographicContent[];
    }
  | {
      type: CardType.AGREEMENT;
      content: AgreementContent;
    }
  | {
      type: CardType.FINAL;
      content: FinalContent;
    }
) & {
  id: number | string;
};
