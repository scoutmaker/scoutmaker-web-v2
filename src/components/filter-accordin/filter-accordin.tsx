import { Accordion, AccordionDetails, AccordionSummary, Chip, styled, Typography } from "@mui/material"

interface IProps {
  children: JSX.Element
  isChanged: boolean
}

const FilterAccordion = ({ children, isChanged }: IProps) => (<StyledAccordion disableGutters>
  <StyledAccordionSummary>
    <StyledAccordinText>Filtry {isChanged && <ChangedChip />}</StyledAccordinText>
  </StyledAccordionSummary>
  <StyledAccordionDetails>
    {children}
  </StyledAccordionDetails>
</StyledAccordion>)

export default FilterAccordion

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  background: 'none'
}))

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  background: theme.palette.primary.main,
}))

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  background: 'none',
  paddingTop: theme.spacing(2)
}))

const StyledAccordinText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center',
  width: "100%",
  color: theme.palette.primary.contrastText
}))

const ChangedChip = () => (
  <Chip
    size="small"
    label='Zmienione'
    color='info'
    sx={{ fontWeight: 'bold', marginLeft: 0.5 }}
  />
)