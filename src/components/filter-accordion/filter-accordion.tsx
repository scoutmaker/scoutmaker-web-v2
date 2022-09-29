import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  styled,
  Typography,
} from '@mui/material'

import { ExpandMoreIcon } from '../icons'

interface IProps {
  children: JSX.Element
  isChanged: boolean
}

const FilterAccordion = ({ children, isChanged }: IProps) => (
  <StyledAccordion disableGutters>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <StyledAccordinText>
        Filtry {isChanged && <ChangedChip />}
      </StyledAccordinText>
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

const ChangedChip = () => (
  <Chip
    size="small"
    label="Zmienione"
    color="info"
    sx={{ fontWeight: 'bold', marginLeft: 0.5 }}
  />
)
