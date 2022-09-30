import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
  Typography,
} from '@mui/material'

import { ExpandMoreIcon } from '../icons'

interface IProps {
  children: JSX.Element
}

const FilterAccordion = ({ children }: IProps) => (
  <StyledAccordion disableGutters>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <StyledAccordinText>Filtry</StyledAccordinText>
    </AccordionSummary>
    <StyledAccordionDetails>{children}</StyledAccordionDetails>
  </StyledAccordion>
)

export default FilterAccordion

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  background: 'none',
}))

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}))

const StyledAccordinText = styled(Typography)({
  fontWeight: 'bold',
  textAlign: 'center',
  width: '100%',
})
