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
    <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
      <StyledAccordionText>Filtry</StyledAccordionText>
    </AccordionSummary>
    <StyledAccordionDetails>{children}</StyledAccordionDetails>
  </StyledAccordion>
)

export default FilterAccordion

const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}))

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  background: theme.palette.primary.main,
}))

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  background: theme.palette.primary.contrastText,
}))

const StyledAccordionText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center',
  width: '100%',
  color: theme.palette.primary.contrastText,
}))
