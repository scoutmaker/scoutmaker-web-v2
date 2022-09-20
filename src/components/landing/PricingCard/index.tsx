
import { CardContent, List, ListItem, ListItemIcon } from '@mui/material';
import { Fragment } from 'react';

import { ButtonContainer, CustomButtom, CustomCard, CustomDivider, CustomListItemText, FalseIcon, Heading, TrueIcon } from './components';

type Props = {
  price: string;
  priceFrom?: boolean;
  features: { title: string; value: boolean }[];
  buttonText?: string;
  onButtonClick?: () => void;
};

export const PricingCard = ({
  price,
  priceFrom,
  features,
  buttonText,
  onButtonClick,
}: Props) => (
  <CustomCard>
    <CardContent>
      <Heading variant="h4" gutterBottom >
        {priceFrom ? 'od' : ''} {price}
      </Heading>
      <CustomDivider />
      <List>
        {features.map((feature) => (
          <Fragment key={feature.title}>
            <ListItem>
              <ListItemIcon>
                {feature.value ? (
                  <TrueIcon />
                ) : (
                  <FalseIcon />
                )}
              </ListItemIcon>
              <CustomListItemText
                primary={feature.title}
              />
            </ListItem>
            <CustomDivider />
          </Fragment>
        ))}
      </List>
      {!!buttonText && (
        <ButtonContainer>
          <CustomButtom
            color="secondary"
            variant="contained"
            onClick={onButtonClick}
          >
            {buttonText}
          </CustomButtom>
        </ButtonContainer>
      )}
    </CardContent>
  </CustomCard>
);
