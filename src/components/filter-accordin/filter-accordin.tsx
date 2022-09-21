import { Accordion, AccordionDetails, AccordionSummary, styled, Typography } from "@mui/material"

interface IProps {
  children: JSX.Element
}

const FilterAccordin = ({ children }: IProps) => (<StyledAccordion disableGutters>
  <StyledAccordionSummary>
    <StyledAccordinText>Filtry</StyledAccordinText>
  </StyledAccordionSummary>
  <StyledAccordionDetails>
    {children}
  </StyledAccordionDetails>
</StyledAccordion>)

export default FilterAccordin

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